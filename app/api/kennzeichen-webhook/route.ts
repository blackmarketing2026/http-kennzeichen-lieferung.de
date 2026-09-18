import { createHmac, timingSafeEqual } from 'crypto';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { logEvent } from '@/lib/logger';
import { sendShippingEmail, type OrderEmailOrder } from '@/lib/order-emails';

export const runtime = 'nodejs';

function verifySignature(rawBody: string, signature: string | null, secret: string) {
  if (!signature) return false;
  const expected = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Confirmed real shape from the manufacturer (seen in manufacturer_webhook_events.raw):
 * { "eventType": "DELIVERY_SHIPMENT", "delivery": { "id", "trackingCode" },
 *   "order": { "id", "externalId" }, "eventTime": "..." }
 * The type/event/top-level-externalId/trackingCode/tracking.code fields are kept as fallbacks
 * in case other event types (e.g. PING) use a different shape. */
type ManufacturerWebhookPayload = {
  eventType?: string;
  type?: string;
  event?: string;
  orderId?: number;
  order?: { id?: number; externalId?: string };
  deliveryId?: number;
  delivery?: { id?: number; trackingCode?: string };
  externalId?: string;
  trackingCode?: string;
  tracking?: { code?: string };
  returnedDeliveryId?: number;
};

export async function POST(request: Request) {
  const webhookSecret = process.env.KENNZEICHEN_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) return Response.json({ error: 'Webhook nicht konfiguriert.' }, { status: 503 });

  const rawBody = await request.text();
  const signature = request.headers.get('X-Signature');
  const webhookId = request.headers.get('X-Webhook-Id');
  const signatureValid = verifySignature(rawBody, signature, webhookSecret);

  if (!signatureValid) {
    logEvent('warn', 'Kennzeichen-Webhook: ungültige Signatur', { webhookId });
    return Response.json({ error: 'Ungültige Signatur.' }, { status: 401 });
  }

  let payload: ManufacturerWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'Ungültiges JSON.' }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    logEvent('error', 'Kennzeichen-Webhook: keine Datenbank konfiguriert', { webhookId });
    return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  }
  await ensureSchema();

  const eventType = payload.eventType ?? payload.type ?? payload.event ?? 'UNKNOWN';
  // Always fold in a content fingerprint, not just X-Webhook-Id alone: if the manufacturer sends
  // a constant/non-per-event value in that header (e.g. an endpoint id rather than a delivery
  // id), keying purely on it would make every distinct event after the first look like a
  // duplicate and get silently dropped — which is exactly what happened here.
  const bodyFingerprint = createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
  const dedupeKey = webhookId ? `${webhookId}:${bodyFingerprint}` : bodyFingerprint;

  const inserted = await query(
    `INSERT IGNORE INTO manufacturer_webhook_events (dedupe_key, event_type, signature_valid, raw)
     VALUES (?, ?, ?, ?)`,
    [dedupeKey, eventType, signatureValid, JSON.stringify(payload)],
  );

  if (inserted.affectedRows === 0) {
    logEvent('warn', 'Kennzeichen-Webhook: als Duplikat erkannt und ignoriert', { webhookId, eventType, dedupeKey });
    // Bereits verarbeitet (mehrfache Zustellung).
    return Response.json({ received: true }, { status: 202 });
  }

  try {
    const manufacturerOrderId = payload.order?.id ?? payload.orderId ?? null;
    const deliveryId = payload.delivery?.id ?? payload.deliveryId ?? null;
    const trackingCode = payload.delivery?.trackingCode ?? payload.trackingCode ?? payload.tracking?.code ?? null;
    const externalId = payload.order?.externalId ?? payload.externalId ?? null;

    if (eventType === 'PING') {
      // Nur Erreichbarkeit bestätigen.
    } else if (eventType === 'DELIVERY_SHIPMENT' && (manufacturerOrderId || externalId)) {
      await query(
        `UPDATE orders SET status = 'shipped', tracking_code = COALESCE(?, tracking_code), shipped_at = NOW(), updated_at = NOW()
         WHERE (manufacturer_order_id = ? OR cart_id = ?) AND status <> 'shipped'`,
        [trackingCode, manufacturerOrderId, externalId],
      );

      if (trackingCode) {
        const matched = await query<{ id: string }>(
          `SELECT id FROM orders WHERE manufacturer_order_id = ? OR cart_id = ?`,
          [manufacturerOrderId, externalId],
        );
        const orderId = matched.rows[0]?.id;
        if (orderId) await sendShippingNotification(orderId, trackingCode, new URL(request.url).origin);
      }
    } else if (eventType === 'DELIVERY_RETURN' && deliveryId) {
      await query(
        `UPDATE orders SET status = 'returned', returned_delivery_id = ?, updated_at = NOW()
         WHERE JSON_CONTAINS(manufacturer_delivery_ids, ?)`,
        [deliveryId, String(deliveryId)],
      );
    } else if (eventType === 'DELIVERY_CANCELLATION' && (manufacturerOrderId || externalId)) {
      await query(
        `UPDATE orders SET status = 'cancelled_by_manufacturer', updated_at = NOW()
         WHERE manufacturer_order_id = ? OR cart_id = ?`,
        [manufacturerOrderId, externalId],
      );
    } else if (eventType !== 'PING') {
      logEvent('warn', 'Kennzeichen-Webhook: unbekannter oder nicht anwendbarer Event-Typ, keine Aktion ausgeführt', {
        webhookId,
        eventType,
        manufacturerOrderId,
        externalId,
      });
    }

    await query(`UPDATE manufacturer_webhook_events SET processed_at = NOW() WHERE dedupe_key = ?`, [dedupeKey]);
  } catch (error) {
    logEvent('error', 'Kennzeichen-Webhook: Verarbeitung fehlgeschlagen', { webhookId, error: error instanceof Error ? error.message : 'unbekannt' });
  }

  return Response.json({ received: true }, { status: 202 });
}

/** Gated by shipping_email_sent_at so a re-delivered shipment webhook never re-sends the mail. */
async function sendShippingNotification(orderId: string, trackingCode: string, origin: string) {
  const claim = await query(`UPDATE orders SET shipping_email_sent_at = NOW() WHERE id = ? AND shipping_email_sent_at IS NULL`, [orderId]);
  if (claim.affectedRows === 0) return;

  const rows = await query<OrderEmailOrder>('SELECT * FROM orders WHERE id = ?', [orderId]);
  const order = rows.rows[0];
  if (order) await sendShippingEmail(order, trackingCode, origin);
}
