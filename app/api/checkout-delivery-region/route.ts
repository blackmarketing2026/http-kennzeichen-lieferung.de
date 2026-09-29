import { ensureCheckoutSchema, isDatabaseConfigured, query } from '@/lib/db';
import { validGermanState, validHolidayRegion } from '@/lib/delivery-promise';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return Response.json({ error: 'Checkout nicht verfügbar.' }, { status: 503 });
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 }); }
  if (!body || typeof body !== 'object') return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  const data = body as Record<string, unknown>;
  if (typeof data.cartId !== 'string' || !/^[0-9a-f-]{36}$/i.test(data.cartId) ||
      typeof data.paymentIntentId !== 'string' || !/^pi_[a-zA-Z0-9]+$/.test(data.paymentIntentId) ||
      typeof data.deliveryState !== 'string' || !validGermanState(data.deliveryState) ||
      typeof data.region !== 'string' || !validHolidayRegion(data.deliveryState, data.region)) {
    return Response.json({ error: 'Ungültige Lieferregion.' }, { status: 400 });
  }
  await ensureCheckoutSchema();
  const updated = await query(
    `UPDATE orders SET delivery_state = ?, delivery_holiday_region = ?
     WHERE cart_id = ? AND stripe_payment_intent_id = ? AND status = 'payment_pending'`,
    [data.deliveryState, data.region, data.cartId, data.paymentIntentId],
  );
  if (!updated.affectedRows) return Response.json({ error: 'Bestellung nicht gefunden.' }, { status: 404 });
  return Response.json({ ok: true });
}
