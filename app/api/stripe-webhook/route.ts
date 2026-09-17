import Stripe from 'stripe';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { submitOrderToManufacturer } from '@/lib/manufacturer-order';
import { logEvent } from '@/lib/logger';
import { ensureInvoiceForOrder, renderInvoicePdf, type InvoiceOrder } from '@/lib/invoice';
import { sendInvoiceEmail, sendOrderConfirmationEmail, type OrderEmailOrder } from '@/lib/order-emails';

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

    const shippingJson = paymentIntent.shipping ? JSON.stringify(paymentIntent.shipping) : null;
    await query(
      `UPDATE orders SET
         status = CASE WHEN status = 'payment_pending' THEN 'paid' ELSE status END,
         customer_email = COALESCE(?, customer_email),
         delivery_address = COALESCE(?, delivery_address),
         invoice_address = COALESCE(?, invoice_address),
         updated_at = NOW()
       WHERE stripe_payment_intent_id = ?`,
      [paymentIntent.receipt_email, shippingJson, shippingJson, paymentIntent.id],
    );

    const orderResult = await query<{ id: string; status: string }>(
      `SELECT id, status FROM orders WHERE stripe_payment_intent_id = ?`,
      [paymentIntent.id],
    );

    const order = orderResult.rows[0];
    if (!order) {
      logEvent('warn', 'Stripe-Webhook: keine passende Bestellung gefunden', { paymentIntentId: paymentIntent.id });
      return Response.json({ received: true });
    }

    if (order.status === 'paid') {
      await sendOrderConfirmationAndInvoice(order.id, new URL(request.url).origin);
    }

    const result = await submitOrderToManufacturer(order.id);
    logEvent('info', 'Stripe-Webhook verarbeitet', { orderId: order.id, paymentIntentId: paymentIntent.id, result: result.status });
  }

  return Response.json({ received: true });
}

/** Sends the order-confirmation email and, right after, the invoice email — both gated by a
 * *_sent_at column so retried Stripe webhook deliveries never send either one twice. */
async function sendOrderConfirmationAndInvoice(orderId: string, origin: string) {
  const confirmationClaim = await query(
    `UPDATE orders SET confirmation_sent_at = NOW() WHERE id = ? AND confirmation_sent_at IS NULL`,
    [orderId],
  );
  if (confirmationClaim.affectedRows > 0) {
    const rows = await query<OrderEmailOrder>('SELECT * FROM orders WHERE id = ?', [orderId]);
    const order = rows.rows[0];
    if (order) await sendOrderConfirmationEmail(order, origin);
  }

  const invoiceClaim = await query(`UPDATE orders SET invoice_sent_at = NOW() WHERE id = ? AND invoice_sent_at IS NULL`, [orderId]);
  if (invoiceClaim.affectedRows > 0) {
    try {
      const rows = await query<InvoiceOrder & OrderEmailOrder>('SELECT * FROM orders WHERE id = ?', [orderId]);
      const order = rows.rows[0];
      if (order) {
        const invoice = await ensureInvoiceForOrder(orderId);
        const pdf = await renderInvoicePdf(order, invoice);
        await sendInvoiceEmail(order, invoice.invoice_number, pdf, origin);
      }
    } catch (error) {
      logEvent('error', 'Rechnung konnte nicht erstellt/versendet werden', { orderId, error: error instanceof Error ? error.message : 'unbekannt' });
    }
  }
}
