import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const stripe = vi.hoisted(() => ({ retrieve: vi.fn(), update: vi.fn() }));
vi.mock('stripe', () => ({
  default: class {
    paymentIntents = stripe;
  },
}));
vi.mock('@/lib/db', () => ({
  isDatabaseConfigured: () => false,
  ensureSchema: vi.fn(),
  query: vi.fn(),
}));
vi.mock('next/headers', () => ({ cookies: vi.fn() }));
vi.mock('@/lib/customer-auth', () => ({
  CUSTOMER_SESSION_COOKIE: 'customer',
  verifyCustomerSessionToken: vi.fn(),
}));

import { POST as pricingPOST } from '@/app/api/checkout-pricing/route';
import { POST as paymentIntentPOST } from '@/app/api/create-payment-intent/route';
import type { CheckoutPricing } from '@/lib/checkout-pricing';

type PricingResponse = { pricing: CheckoutPricing };

const cartId = 'free-shipping-test-1234';
const current = {
  id: 'pi_test123',
  client_secret: 'pi_test123_secret_test',
  amount: 2450,
  status: 'requires_payment_method',
  metadata: { cartId, kennzeichen: 'OL AB 123', kennzeichenart: 'Auto', schriftfarbe: 'Schwarz', anzahl: '2', rabattcode: '' },
};

function pricingRequest(body: Record<string, unknown>) {
  return new Request('http://localhost/api/checkout-pricing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('free shipping activation', () => {
  afterEach(() => { vi.unstubAllEnvs(); });

  beforeEach(() => {
    vi.stubEnv('stripe_api', 'pk_test_mock');
    vi.stubEnv('stripe_live', 'sk_test_mock');
    stripe.retrieve.mockReset().mockResolvedValue(current);
    stripe.update.mockReset().mockImplementation(async (_id, update) => ({ ...current, ...update }));
  });

  it('removes shipping for two black standard plates', async () => {
    const response = await pricingPOST(pricingRequest({ plateType: 'standard', color: 'black', quantity: 2, promoCode: 'neuekennzeichen' }));
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      pricing: { shippingCents: 0, totalCents: 1960, promoCode: 'NEUEKENNZEICHEN' },
    });
  });

  it('does not stack the discount when activated repeatedly', async () => {
    const body = { plateType: 'standard', color: 'black', quantity: 2, promoCode: 'neuekennzeichen' };
    const first = await (await pricingPOST(pricingRequest(body))).json() as PricingResponse;
    const second = await (await pricingPOST(pricingRequest(body))).json() as PricingResponse;
    expect(second.pricing).toEqual(first.pricing);
  });

  it.each([
    ['standard', 'carbon', 2],
    ['standard', 'black', 1],
    ['motorcycle', 'black', 1],
  ] as const)('recalculates free shipping for %s/%s x%d', async (plateType, color, quantity) => {
    const response = await pricingPOST(pricingRequest({ plateType, color, quantity, promoCode: 'neuekennzeichen' }));
    expect(response.status).toBe(200);
    expect(((await response.json()) as PricingResponse).pricing).toMatchObject({ shippingCents: 0, promoCode: 'NEUEKENNZEICHEN' });
  });

  it('rejects unknown codes and invalid selections', async () => {
    expect((await pricingPOST(pricingRequest({ plateType: 'standard', color: 'black', quantity: 2, promoCode: 'gratis' }))).status).toBe(400);
    expect((await pricingPOST(pricingRequest({ plateType: 'toString', color: 'black', quantity: 2, promoCode: 'neuekennzeichen' }))).status).toBe(400);
    expect((await pricingPOST(pricingRequest({ plateType: 'standard', color: 'black', quantity: 5, promoCode: 'neuekennzeichen' }))).status).toBe(400);
  });

  it('charges the same amount in Stripe as shown in the configurator', async () => {
    const shown = ((await (await pricingPOST(pricingRequest({ plateType: 'standard', color: 'black', quantity: 2, promoCode: 'neuekennzeichen' }))).json()) as PricingResponse).pricing;
    const response = await paymentIntentPOST(new Request('http://localhost/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plate: 'OL AB 123', plateType: 'standard', color: 'black', quantity: 2, cartId, paymentIntentId: current.id, promoCode: 'NEUEKENNZEICHEN' }),
    }));
    expect(response.status).toBe(200);
    expect(stripe.update).toHaveBeenCalledWith(current.id, expect.objectContaining({
      amount: shown.totalCents,
      metadata: expect.objectContaining({ rabattcode: 'NEUEKENNZEICHEN', shipping_cents: '0' }),
    }));
    expect(((await response.json()) as PricingResponse).pricing).toMatchObject({ totalCents: 1960, shippingCents: 0 });
  });
});
