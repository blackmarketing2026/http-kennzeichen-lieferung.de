import Stripe from 'stripe';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { submitOrderToManufacturer } from '@/lib/manufacturer-order';
import { logEvent } from '@/lib/logger';
import { sendInvoiceEmail, sendOrderConfirmationEmail, sendShopOrderNotificationEmail, type OrderEmailOrder } from '@/lib/order-emails';
import { ensurePaidStripeInvoice, fetchStripeInvoicePdf, type StripeInvoiceOrder } from '@/lib/stripe-invoice';

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

    let invoiceError: unknown = null;
    if (order.status === 'paid') {
      try {
        await sendOrderConfirmationAndInvoice(stripe, paymentIntent, order.id, new URL(request.url).origin);
      } catch (error) {
        invoiceError = error;
        logEvent('error', 'Stripe-Rechnung konnte nicht erstellt/versendet werden', { orderId: order.id, error: error instanceof Error ? error.message : 'unbekannt' });
      }
    }

    const result = await submitOrderToManufacturer(order.id);
    logEvent('info', 'Stripe-Webhook verarbeitet', { orderId: order.id, paymentIntentId: paymentIntent.id, result: result.status });
    if (invoiceError) throw invoiceError;
  }

  return Response.json({ received: true });
}

/** Sends the order-confirmation email and, right after, the invoice email — both gated by a
 * *_sent_at column so retried Stripe webhook deliveries never send either one twice. */
async function sendOrderConfirmationAndInvoice(stripe: Stripe, paymentIntent: Stripe.PaymentIntent, orderId: string, origin: string) {
  const confirmationClaim = await query(
    `UPDATE orders SET confirmation_sent_at = NOW() WHERE id = ? AND confirmation_sent_at IS NULL`,
    [orderId],
  );
  if (confirmationClaim.affectedRows > 0) {
    const rows = await query<OrderEmailOrder>('SELECT * FROM orders WHERE id = ?', [orderId]);
    const order = rows.rows[0];
    if (order) await sendOrderConfirmationEmail(order, origin);
  }

  const rows = await query<StripeInvoiceOrder & OrderEmailOrder & { invoice_sent_at: string | null }>(
    'SELECT * FROM orders WHERE id = ?',
    [orderId],
  );
  const order = rows.rows[0];
  if (!order || order.invoice_sent_at) return;

  const invoice = await ensurePaidStripeInvoice(stripe, order, paymentIntent);
  const pdf = await fetchStripeInvoicePdf(invoice.invoice_pdf!);
  const invoiceClaim = await query(
    `UPDATE orders SET stripe_invoice_claimed_at = NOW()
     WHERE id = ? AND invoice_sent_at IS NULL
       AND (stripe_invoice_claimed_at IS NULL OR stripe_invoice_claimed_at < DATE_SUB(NOW(), INTERVAL 10 MINUTE))`,
    [orderId],
  );
  if (invoiceClaim.affectedRows === 0) return;

  try {
    await sendInvoiceEmail(order, invoice.number!, pdf, origin);
    await query(
      'UPDATE orders SET invoice_sent_at = NOW(), stripe_invoice_claimed_at = NULL WHERE id = ?',
      [orderId],
    );
  } catch (error) {
    await query(
      'UPDATE orders SET stripe_invoice_claimed_at = NULL WHERE id = ? AND invoice_sent_at IS NULL',
      [orderId],
    );
    throw error;
  }

  // Sent only by the delivery that won the invoice claim, so retries never duplicate it. A failure
  // here must not throw: Stripe would retry, but the customer invoice is already marked as sent.
  try {
    await sendShopOrderNotificationEmail(order, invoice.number!, pdf, origin);
  } catch (error) {
    logEvent('error', 'Shop-Benachrichtigung zur neuen Bestellung fehlgeschlagen', { orderId, error: error instanceof Error ? error.message : 'unbekannt' });
  }
}
