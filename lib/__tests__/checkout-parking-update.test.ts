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

import { POST } from '@/app/api/create-payment-intent/route';

const cartId = 'parking-checkout-test-1234';
const current = {
  id: 'pi_test123',
  client_secret: 'pi_test123_secret_test',
  amount: 2990,
  status: 'requires_payment_method',
  metadata: {
    cartId,
    kennzeichen: 'OL AB 123',
    kennzeichenart: 'Auto',
    schriftfarbe: 'Schwarz',
    anzahl: '2',
    rabattcode: '',
  },
};

function request(quantity: number, promoCode = '') {
  return new Request('http://localhost/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plate: 'OL AB 123',
      plateType: 'standard',
      color: 'black',
      quantity,
      cartId,
      paymentIntentId: current.id,
      promoCode,
    }),
  });
}

describe('parking extra payment updates', () => {
  afterEach(() => vi.unstubAllEnvs());

  beforeEach(() => {
    vi.stubEnv('stripe_api', 'pk_test_mock');
    vi.stubEnv('stripe_live', 'sk_test_mock');
    stripe.retrieve.mockReset().mockResolvedValue(current);
    stripe.update
      .mockReset()
      .mockImplementation(async (_id, update) => ({ ...current, ...update }));
  });

  it('updates the existing intent amount and production quantity when adding a plate', async () => {
    const response = await POST(request(3));
    expect(response.status).toBe(200);
    expect(stripe.update).toHaveBeenCalledWith(
      current.id,
      expect.objectContaining({
        amount: 3490,
        metadata: expect.objectContaining({
          anzahl: '3',
          parkplatzkennzeichen: '1',
        }),
      }),
    );
    expect(await response.json()).toMatchObject({
      paymentIntentId: current.id,
      pricing: { totalCents: 3490, parkingExtraPriceCents: 500 },
    });
  });

  it('removes the extra and restores the original amount', async () => {
    stripe.retrieve.mockResolvedValue({
      ...current,
      amount: 3490,
      metadata: { ...current.metadata, anzahl: '3', parkplatzkennzeichen: '1' },
    });
    expect((await POST(request(2))).status).toBe(200);
    expect(stripe.update).toHaveBeenCalledWith(
      current.id,
      expect.objectContaining({
        amount: 2990,
        metadata: expect.objectContaining({
          anzahl: '2',
          parkplatzkennzeichen: '0',
        }),
      }),
    );
  });

  it('updates quantity even if a fixed-total promotion leaves the payable amount unchanged', async () => {
    stripe.retrieve.mockResolvedValue({
      ...current,
      amount: 500,
      metadata: { ...current.metadata, rabattcode: 'TEST5' },
    });
    expect((await POST(request(3, 'TEST5'))).status).toBe(200);
    expect(stripe.update).toHaveBeenCalledWith(
      current.id,
      expect.objectContaining({
        amount: 500,
        metadata: expect.objectContaining({ anzahl: '3' }),
      }),
    );
  });

  it('rejects a different cart and does not change its payment', async () => {
    stripe.retrieve.mockResolvedValue({
      ...current,
      metadata: { ...current.metadata, cartId: 'another-cart' },
    });
    expect((await POST(request(3))).status).toBe(400);
    expect(stripe.update).not.toHaveBeenCalled();
  });

  it('rejects changes after payment processing has begun', async () => {
    stripe.retrieve.mockResolvedValue({ ...current, status: 'processing' });
    expect((await POST(request(3))).status).toBe(409);
    expect(stripe.update).not.toHaveBeenCalled();
  });

  it('rejects arbitrary quantities before accessing Stripe', async () => {
    expect((await POST(request(4))).status).toBe(400);
    expect(stripe.retrieve).not.toHaveBeenCalled();
  });
});
