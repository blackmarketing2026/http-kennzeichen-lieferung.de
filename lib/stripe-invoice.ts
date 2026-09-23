import Stripe from 'stripe';
import { PRODUCTS, VAT_RATE, type PlateColor, type PlateType } from '@/config/products';
import { query } from '@/lib/db';

export type StripeInvoiceOrder = {
  id: string;
  plate: string;
  plate_type: PlateType;
  plate_color: PlateColor;
  quantity: number;
  total_cents: number;
  promo_code: string | null;
  customer_email: string | null;
  stripe_invoice_id: string | null;
};

function customerIdFromPayment(paymentIntent: Stripe.PaymentIntent) {
  const customer = paymentIntent.customer;
  return typeof customer === 'string' ? customer : customer?.id ?? null;
}

async function includedVatRate(stripe: Stripe) {
  const configuredId = process.env.STRIPE_INCLUSIVE_VAT_RATE_ID?.trim();
  if (configuredId) return configuredId;

  const rates = await stripe.taxRates.list({ active: true, limit: 100 });
  const existing = rates.data.find((rate) => rate.inclusive && rate.percentage === VAT_RATE * 100 && rate.country === 'DE');
  if (existing) return existing.id;

  const created = await stripe.taxRates.create({
    display_name: 'USt.',
    description: 'Deutsche Umsatzsteuer 19 % (im Preis enthalten)',
    percentage: VAT_RATE * 100,
    inclusive: true,
    country: 'DE',
  }, { idempotencyKey: 'kennzeichen-vat-19-inclusive-de-v1' });
  return created.id;
}

/** Creates a Stripe invoice for the already-successful PaymentIntent. No new payment is charged. */
export async function ensurePaidStripeInvoice(stripe: Stripe, order: StripeInvoiceOrder, paymentIntent: Stripe.PaymentIntent) {
  if (paymentIntent.status !== 'succeeded' || paymentIntent.currency !== 'eur' || paymentIntent.amount_received !== order.total_cents) {
    throw new Error('Stripe-Zahlung und Bestellbetrag stimmen nicht überein.');
  }
  const email = order.customer_email || paymentIntent.receipt_email;
  if (!email) throw new Error('Bestell-E-Mail fehlt.');
  let customerId = customerIdFromPayment(paymentIntent);
  if (!customerId) {
    // Transitional PaymentIntents created before Stripe Customers were added to checkout.
    const customer = await stripe.customers.create({ email, metadata: { orderId: order.id } }, { idempotencyKey: `kennzeichen-customer-legacy-${order.id}` });
    const updated = await stripe.paymentIntents.update(paymentIntent.id, { customer: customer.id });
    customerId = customerIdFromPayment(updated);
  }
  if (!customerId) throw new Error('Stripe-Kunde fehlt.');

  const shipping = paymentIntent.shipping;
  await stripe.customers.update(customerId, {
    email,
    ...(shipping?.name ? { name: shipping.name } : {}),
    ...(shipping?.phone ? { phone: shipping.phone } : {}),
    ...(shipping?.address ? { address: {
      line1: shipping.address.line1 ?? undefined,
      line2: shipping.address.line2 ?? undefined,
      city: shipping.address.city ?? undefined,
      postal_code: shipping.address.postal_code ?? undefined,
      state: shipping.address.state ?? undefined,
      country: shipping.address.country ?? undefined,
    } } : {}),
  });

  let invoice = order.stripe_invoice_id ? await stripe.invoices.retrieve(order.stripe_invoice_id) : null;
  if (!invoice) {
    invoice = await stripe.invoices.create({
      customer: customerId,
      currency: 'eur',
      auto_advance: false,
      collection_method: 'charge_automatically',
      pending_invoice_items_behavior: 'exclude',
      description: `Kennzeichenbestellung ${order.id} – bereits bezahlt`,
      metadata: { orderId: order.id, paymentIntentId: paymentIntent.id },
    }, { idempotencyKey: `kennzeichen-invoice-${order.id}` });
    await query('UPDATE orders SET stripe_invoice_id = ? WHERE id = ? AND stripe_invoice_id IS NULL', [invoice.id, order.id]);
  }

  if (invoice.metadata?.orderId !== order.id || invoice.customer !== customerId) {
    throw new Error('Stripe-Rechnung gehört nicht zu dieser Bestellung.');
  }

  if (invoice.status === 'draft') {
    if (invoice.lines.data.length === 0) {
      const taxRateId = await includedVatRate(stripe);
      const product = PRODUCTS[order.plate_type];
      const discount = order.promo_code ? `, Rabattcode ${order.promo_code}` : '';
      await stripe.invoiceItems.create({
        customer: customerId,
        invoice: invoice.id,
        currency: 'eur',
        amount: order.total_cents,
        description: `${order.quantity} × ${product.label}-Kennzeichen ${order.plate} inkl. DHL-Versand${discount}`,
        tax_behavior: 'inclusive',
        tax_rates: [taxRateId],
      }, { idempotencyKey: `kennzeichen-invoice-item-${order.id}` });
    }
    invoice = await stripe.invoices.finalizeInvoice(invoice.id, { auto_advance: false }, { idempotencyKey: `kennzeichen-invoice-finalize-${order.id}` });
  }

  if (invoice.total !== order.total_cents) throw new Error('Stripe-Rechnungsbetrag weicht vom bezahlten Betrag ab.');
  if (invoice.status === 'open') {
    invoice = await stripe.invoices.attachPayment(invoice.id, { payment_intent: paymentIntent.id }, { idempotencyKey: `kennzeichen-invoice-payment-${order.id}` });
  }
  if (invoice.status !== 'paid' || invoice.amount_paid !== order.total_cents) {
    invoice = await stripe.invoices.retrieve(invoice.id);
  }
  if (invoice.status !== 'paid' || invoice.amount_paid !== order.total_cents || !invoice.number || !invoice.invoice_pdf) {
    throw new Error('Stripe-Rechnung ist noch nicht vollständig bezahlt oder als PDF verfügbar.');
  }
  return invoice;
}

export async function fetchStripeInvoicePdf(invoiceUrl: string): Promise<Buffer> {
  const url = new URL(invoiceUrl);
  if (url.protocol !== 'https:' || url.hostname !== 'pay.stripe.com') throw new Error('Ungültige Stripe-Rechnungs-URL.');
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`Stripe-Rechnungs-PDF konnte nicht geladen werden (${response.status}).`);
  const contentLength = Number(response.headers.get('content-length') ?? '0');
  if (contentLength > 5_000_000) throw new Error('Stripe-Rechnungs-PDF ist zu groß.');
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length > 5_000_000 || bytes.subarray(0, 4).toString('ascii') !== '%PDF') {
    throw new Error('Stripe hat kein gültiges Rechnungs-PDF geliefert.');
  }
  return bytes;
}
