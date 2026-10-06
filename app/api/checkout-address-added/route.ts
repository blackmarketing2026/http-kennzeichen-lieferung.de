import { after } from 'next/server';
import { ensureCheckoutSchema, isDatabaseConfigured, query } from '@/lib/db';
import { logEvent } from '@/lib/logger';
import { sendCheckoutAddressAddedEmail } from '@/lib/order-emails';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object') {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }
  const data = body as Record<string, unknown>;
  const address = data.address;
  if (
    typeof data.cartId !== 'string' || !/^[a-zA-Z0-9-]{16,80}$/.test(data.cartId) ||
    typeof data.paymentIntentId !== 'string' || !/^pi_[a-zA-Z0-9]+$/.test(data.paymentIntentId) ||
    typeof data.reminderConsent !== 'boolean' ||
    (data.reminderConsent &&
      (typeof data.email !== 'string' || data.email.length > 255 || !/^\S+@\S+\.\S+$/.test(data.email))) ||
    !address || typeof address !== 'object' ||
    !['name', 'line1', 'city', 'postalCode', 'country'].every((key) => {
      const value = (address as Record<string, unknown>)[key];
      return typeof value === 'string' && value.trim().length > 0 && value.length <= 255;
    })
  ) {
    return Response.json({ error: 'Ungültige Lieferadresse.' }, { status: 400 });
  }
  if (!isDatabaseConfigured()) {
    return Response.json({ error: 'Checkout nicht verfügbar.' }, { status: 503 });
  }

  await ensureCheckoutSchema();
  const addressData = address as Record<string, string>;
  const firstName = addressData.name.trim().split(/\s+/)[0].slice(0, 100);
  const reminderEmail = data.reminderConsent ? (data.email as string).trim().toLowerCase() : null;
  await query(
    `UPDATE orders SET reminder_email = ?, reminder_first_name = ?, reminder_city = ?,
       reminder_consent_at = CASE WHEN ? THEN COALESCE(reminder_consent_at, UTC_TIMESTAMP()) ELSE NULL END,
       reminder_due_at = CASE WHEN ? THEN COALESCE(reminder_due_at, DATE_ADD(UTC_TIMESTAMP(), INTERVAL 5 MINUTE)) ELSE NULL END,
       reminder_claimed_at = CASE WHEN ? THEN reminder_claimed_at ELSE NULL END
     WHERE cart_id = ? AND stripe_payment_intent_id = ? AND status = 'payment_pending'
       AND reminder_sent_at IS NULL`,
    [reminderEmail, data.reminderConsent ? firstName : null,
      data.reminderConsent ? addressData.city.trim() : null,
      data.reminderConsent, data.reminderConsent, data.reminderConsent,
      data.cartId, data.paymentIntentId],
  );
  const claimed = await query(
    `UPDATE orders SET address_notification_sent_at = UTC_TIMESTAMP()
     WHERE cart_id = ? AND stripe_payment_intent_id = ?
       AND status = 'payment_pending' AND address_notification_sent_at IS NULL`,
    [data.cartId, data.paymentIntentId],
  );
  if (!claimed.affectedRows) return Response.json({ ok: true });

  const order = (await query<{ plate: string }>(
    'SELECT plate FROM orders WHERE cart_id = ? AND stripe_payment_intent_id = ?',
    [data.cartId, data.paymentIntentId],
  )).rows[0];
  if (!order) return Response.json({ ok: true });

  after(async () => {
    try {
      await sendCheckoutAddressAddedEmail(
        { plate: order.plate, cartId: data.cartId as string, paymentIntentId: data.paymentIntentId as string },
        new URL(request.url).origin,
      );
    } catch (error) {
      logEvent('warn', 'Adress-Checkout-Hinweis konnte nicht gesendet werden', {
        cartId: data.cartId,
        error: error instanceof Error ? error.message : 'unbekannt',
      });
      await query(
        `UPDATE orders SET address_notification_sent_at = NULL
         WHERE cart_id = ? AND stripe_payment_intent_id = ? AND status = 'payment_pending'`,
        [data.cartId, data.paymentIntentId],
      );
    }
  });
  return Response.json({ ok: true });
}
