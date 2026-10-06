import Stripe from 'stripe';
import { ensureCheckoutSchema, isDatabaseConfigured, query } from '@/lib/db';
import { logEvent } from '@/lib/logger';
import { sendAbandonedCheckoutReminderEmail } from '@/lib/order-emails';
import type { PlateColor, PlateType } from '@/config/products';

export const runtime = 'nodejs';

type ReminderOrder = {
  id: string;
  plate: string;
  plate_type: PlateType;
  plate_color: PlateColor;
  quantity: number;
  parking_plate: number;
  bike_rack_plate: number;
  season_start_month: number | null;
  season_end_month: number | null;
  promo_code: string | null;
  stripe_payment_intent_id: string;
  reminder_email: string;
  reminder_first_name: string;
  reminder_city: string;
};

function checkoutUrl(order: ReminderOrder, origin: string) {
  const baseQuantity = order.quantity - Number(order.parking_plate) - Number(order.bike_rack_plate);
  if (baseQuantity !== 1 && baseQuantity !== 2) return null;
  const url = new URL('/checkout', origin);
  url.searchParams.set('plate', order.plate);
  url.searchParams.set('type', order.plate_type);
  url.searchParams.set('color', order.plate_color);
  url.searchParams.set('quantity', String(order.parking_plate ? 3 : baseQuantity));
  if (order.bike_rack_plate) url.searchParams.set('bikeRackPlate', '1');
  if (order.plate_type === 'season') {
    if (order.season_start_month) url.searchParams.set('seasonStartMonth', String(order.season_start_month));
    if (order.season_end_month) url.searchParams.set('seasonEndMonth', String(order.season_end_month));
  }
  if (order.promo_code) url.searchParams.set('promo', order.promo_code);
  return url.toString();
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) return Response.json({ error: 'Cron nicht konfiguriert.' }, { status: 503 });
  const authorization = request.headers.get('authorization');
  const basic = `Basic ${Buffer.from(`checkout-reminder:${secret}`).toString('base64')}`;
  if (authorization !== `Bearer ${secret}` && authorization !== basic) {
    return Response.json({ error: 'Nicht autorisiert.' }, {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Checkout reminders"' },
    });
  }
  const stripeKey = process.env.stripe_live?.trim();
  if (!stripeKey?.startsWith('sk_') || !isDatabaseConfigured()) {
    return Response.json({ error: 'Checkout nicht konfiguriert.' }, { status: 503 });
  }
  await ensureCheckoutSchema();
  await query(
    `UPDATE orders SET reminder_email = NULL, reminder_first_name = NULL,
       reminder_city = NULL, reminder_consent_at = NULL, reminder_due_at = NULL
     WHERE reminder_due_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 30 DAY)
       AND reminder_sent_at IS NULL`,
  );
  const stripe = new Stripe(stripeKey);
  const candidates = await query<{ id: string }>(
    `SELECT id FROM orders
     WHERE status = 'payment_pending' AND paid_at_utc IS NULL
       AND reminder_consent_at IS NOT NULL AND reminder_due_at <= UTC_TIMESTAMP()
       AND reminder_sent_at IS NULL AND reminder_email IS NOT NULL
       AND (reminder_claimed_at IS NULL OR reminder_claimed_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 10 MINUTE))
     ORDER BY reminder_due_at LIMIT 20`,
  );

  let sent = 0;
  for (const { id } of candidates.rows) {
    const claim = await query(
      `UPDATE orders SET reminder_claimed_at = UTC_TIMESTAMP()
       WHERE id = ? AND status = 'payment_pending' AND paid_at_utc IS NULL
         AND reminder_consent_at IS NOT NULL AND reminder_due_at <= UTC_TIMESTAMP()
         AND reminder_sent_at IS NULL AND reminder_email IS NOT NULL
         AND (reminder_claimed_at IS NULL OR reminder_claimed_at < DATE_SUB(UTC_TIMESTAMP(), INTERVAL 10 MINUTE))`,
      [id],
    );
    if (!claim.affectedRows) continue;

    try {
      const order = (await query<ReminderOrder>(
        `SELECT id, plate, plate_type, plate_color, quantity, parking_plate, bike_rack_plate,
                season_start_month, season_end_month, promo_code, stripe_payment_intent_id,
                reminder_email, reminder_first_name, reminder_city
         FROM orders WHERE id = ? AND status = 'payment_pending' AND paid_at_utc IS NULL
           AND reminder_consent_at IS NOT NULL AND reminder_sent_at IS NULL
           AND reminder_email IS NOT NULL`,
        [id],
      )).rows[0];
      if (!order) continue;

      const intent = await stripe.paymentIntents.retrieve(order.stripe_payment_intent_id);
      if (intent.status === 'succeeded' || intent.status === 'canceled') {
        await query(
          `UPDATE orders SET reminder_email = NULL, reminder_first_name = NULL,
             reminder_city = NULL, reminder_consent_at = NULL, reminder_due_at = NULL
           WHERE id = ?`,
          [id],
        );
        continue;
      }
      if (intent.status !== 'requires_payment_method') continue;

      const stillConsented = (await query<{ reminder_email: string }>(
        `SELECT reminder_email FROM orders WHERE id = ? AND status = 'payment_pending'
           AND paid_at_utc IS NULL AND reminder_consent_at IS NOT NULL
           AND reminder_due_at <= UTC_TIMESTAMP() AND reminder_sent_at IS NULL`,
        [id],
      )).rows[0];
      if (stillConsented?.reminder_email !== order.reminder_email) continue;

      const resumeUrl = checkoutUrl(order, new URL(request.url).origin);
      if (!resumeUrl) continue;
      await sendAbandonedCheckoutReminderEmail({
        email: order.reminder_email,
        firstName: order.reminder_first_name,
        city: order.reminder_city,
        plate: order.plate,
        resumeUrl,
      }, new URL(request.url).origin);
      await query(
        `UPDATE orders SET reminder_sent_at = UTC_TIMESTAMP(), reminder_email = NULL,
           reminder_first_name = NULL, reminder_city = NULL, reminder_consent_at = NULL,
           reminder_due_at = NULL WHERE id = ?`,
        [id],
      );
      sent++;
    } catch (error) {
      logEvent('error', 'Checkout-Erinnerung konnte nicht gesendet werden', {
        orderId: id,
        error: error instanceof Error ? error.message : 'unbekannt',
      });
    } finally {
      await query('UPDATE orders SET reminder_claimed_at = NULL WHERE id = ?', [id]);
    }
  }
  return Response.json({ checked: candidates.rows.length, sent });
}
