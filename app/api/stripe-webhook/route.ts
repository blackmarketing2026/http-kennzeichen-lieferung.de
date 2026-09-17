import Stripe from 'stripe';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { submitOrderToManufacturer } from '@/lib/manufacturer-order';
import { logEvent } from '@/lib/logger';

export const runtime = 'nodejs';

function getStripe() {
  const secretKey = process.env.stripe_live?.trim();
  if (!secretKey?.startsWith('sk_')) return null;
  return new Stripe(secretKey);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  const stripe = getStripe();
  if (!stripe || !webhookSecret) {
    return Response.json({ error: 'Webhook nicht konfiguriert.' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  const rawBody = await request.text();
  if (!signature) return Response.json({ error: 'Signatur fehlt.' }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    logEvent('warn', 'Stripe-Webhook: ungültige Signatur', { error: error instanceof Error ? error.message : 'unbekannt' });
    return Response.json({ error: 'Ungültige Signatur.' }, { status: 400 });
  }

  if (!isDatabaseConfigured()) {
    logEvent('error', 'Stripe-Webhook: keine Datenbank konfiguriert, Ereignis kann nicht verarbeitet werden', { eventId: event.id });
    return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  }
  await ensureSchema();

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const orderResult = await query<{ id: string; status: string }>(
      `UPDATE orders SET
         status = CASE WHEN status = 'payment_pending' THEN 'paid' ELSE status END,
         customer_email = COALESCE($2, customer_email),
         delivery_address = COALESCE($3::jsonb, delivery_address),
         invoice_address = COALESCE($3::jsonb, invoice_address),
         updated_at = now()
       WHERE stripe_payment_intent_id = $1
       RETURNING id, status`,
      [
        paymentIntent.id,
        paymentIntent.receipt_email,
        paymentIntent.shipping ? JSON.stringify(paymentIntent.shipping) : null,
      ],
    );

    const order = orderResult.rows[0];
    if (!order) {
      logEvent('warn', 'Stripe-Webhook: keine passende Bestellung gefunden', { paymentIntentId: paymentIntent.id });
      return Response.json({ received: true });
    }

    const result = await submitOrderToManufacturer(order.id);
    logEvent('info', 'Stripe-Webhook verarbeitet', { orderId: order.id, paymentIntentId: paymentIntent.id, result: result.status });
  }

  return Response.json({ received: true });
}
