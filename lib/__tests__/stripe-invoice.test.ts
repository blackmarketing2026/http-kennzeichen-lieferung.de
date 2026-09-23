import { beforeEach, describe, expect, it, vi } from 'vitest';
import type Stripe from 'stripe';

const { query } = vi.hoisted(() => ({ query: vi.fn() }));
vi.mock('@/lib/db', () => ({ query }));

import { ensurePaidStripeInvoice, type StripeInvoiceOrder } from '@/lib/stripe-invoice';

const order: StripeInvoiceOrder = {
  id: 'order-123',
  plate: 'B AB 1234',
  plate_type: 'standard',
  plate_color: 'black',
  quantity: 2,
  total_cents: 500,
  promo_code: 'TEST5',
  customer_email: 'kunde@example.com',
  stripe_invoice_id: null,
};

const payment = {
  id: 'pi_123',
  status: 'succeeded',
  currency: 'eur',
  amount_received: 500,
  customer: 'cus_123',
  receipt_email: 'kunde@example.com',
  shipping: null,
} as Stripe.PaymentIntent;

function mockStripe() {
  const draft = {
    id: 'in_123', customer: 'cus_123', metadata: { orderId: order.id },
    status: 'draft', lines: { data: [] }, total: 0,
  };
  const open = { ...draft, status: 'open', total: 500 };
  const paid = {
    ...open, status: 'paid', amount_paid: 500, number: 'RE-TEST-123',
    invoice_pdf: 'https://pay.stripe.com/invoice/acct/test/pdf',
  };
  const stripe = {
    customers: { update: vi.fn() },
    taxRates: { list: vi.fn().mockResolvedValue({ data: [{ id: 'txr_19', active: true, inclusive: true, percentage: 19, country: 'DE' }] }) },
    invoices: {
      create: vi.fn().mockResolvedValue(draft),
      retrieve: vi.fn().mockResolvedValue(paid),
      finalizeInvoice: vi.fn().mockResolvedValue(open),
      attachPayment: vi.fn().mockResolvedValue(paid),
    },
    invoiceItems: { create: vi.fn() },
  };
  return stripe;
}

describe('Stripe invoice for paid checkout', () => {
  beforeEach(() => query.mockReset());

  it('invoices exactly the paid 5 € test amount and credits the existing payment', async () => {
    const stripe = mockStripe();
    const invoice = await ensurePaidStripeInvoice(stripe as unknown as Stripe, order, payment);

    expect(invoice.status).toBe('paid');
    expect(stripe.invoices.create).toHaveBeenCalledWith(
      expect.objectContaining({ customer: 'cus_123', auto_advance: false, pending_invoice_items_behavior: 'exclude' }),
      expect.anything(),
    );
    expect(stripe.invoiceItems.create).toHaveBeenCalledWith(
      expect.objectContaining({ invoice: 'in_123', amount: 500, tax_behavior: 'inclusive', tax_rates: ['txr_19'] }),
      expect.anything(),
    );
    expect(stripe.invoices.attachPayment).toHaveBeenCalledWith('in_123', { payment_intent: 'pi_123' }, expect.anything());
    expect(query).toHaveBeenCalledWith(expect.stringContaining('stripe_invoice_id'), ['in_123', order.id]);
  });

  it('reuses an already paid invoice on a webhook retry', async () => {
    const stripe = mockStripe();
    const invoice = await ensurePaidStripeInvoice(stripe as unknown as Stripe, { ...order, stripe_invoice_id: 'in_123' }, payment);

    expect(invoice.status).toBe('paid');
    expect(stripe.invoices.create).not.toHaveBeenCalled();
    expect(stripe.invoiceItems.create).not.toHaveBeenCalled();
    expect(stripe.invoices.attachPayment).not.toHaveBeenCalled();
  });

  it('rejects a payment whose captured amount differs from the order', async () => {
    const stripe = mockStripe();
    await expect(ensurePaidStripeInvoice(stripe as unknown as Stripe, order, { ...payment, amount_received: 499 })).rejects.toThrow('Bestellbetrag');
    expect(stripe.invoices.create).not.toHaveBeenCalled();
  });
});
