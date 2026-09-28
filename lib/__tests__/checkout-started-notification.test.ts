import { beforeEach, describe, expect, it, vi } from 'vitest';

const stripe = vi.hoisted(() => ({
  paymentIntents: { create: vi.fn(), retrieve: vi.fn(), update: vi.fn() },
  customers: { create: vi.fn() },
}));
const afterCallbacks = vi.hoisted(() => [] as Array<() => unknown>);
vi.mock('stripe', () => ({
  default: class {
    paymentIntents = stripe.paymentIntents;
    customers = stripe.customers;
  },
}));
vi.mock('next/server', () => ({
  after: (callback: () => unknown) => afterCallbacks.push(callback),
}));
vi.mock('next/headers', () => ({ cookies: vi.fn() }));
vi.mock('@/lib/db', () => ({
  isDatabaseConfigured: () => false,
  ensureSchema: vi.fn(),
  query: vi.fn(),
}));
vi.mock('@/lib/customer-auth', () => ({
  CUSTOMER_SESSION_COOKIE: 'customer',
  verifyCustomerSessionToken: vi.fn(),
}));
vi.mock('@/lib/mail', () => ({
  isMailConfigured: vi.fn(() => true),
  getMailTransport: vi.fn(),
  MAIL_FROM: 'shop@example.com',
  renderEmailTemplate: vi.fn(
    ({ heading, bodyHtml }: { heading: string; bodyHtml: string }) =>
      `<h1>${heading}</h1>${bodyHtml}`,
  ),
}));
vi.mock('@/lib/logger', () => ({ logEvent: vi.fn() }));

import { POST } from '@/app/api/create-payment-intent/route';
import { sanitizeAttribution } from '@/lib/attribution';
import { logEvent } from '@/lib/logger';
import { getMailTransport } from '@/lib/mail';

const sendMail = vi.fn();
const cartId = 'checkout-started-test-1234';
const intent = {
  id: 'pi_started123',
  client_secret: 'pi_started123_secret',
  amount: 1499,
  status: 'requires_payment_method',
  metadata: {
    cartId,
    kennzeichen: 'OL AB 123',
    kennzeichenart: 'Auto',
    schriftfarbe: 'Schwarz',
    anzahl: '2',
    rabattcode: '',
    parkplatzkennzeichen: '0',
    fahrradtraegerkennzeichen: '0',
  },
};

function request(extra: Record<string, unknown>) {
  return new Request('https://shop.example.com/api/create-payment-intent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plate: 'OL AB 123',
      plateType: 'standard',
      color: 'black',
      quantity: 2,
      parkingPlate: false,
      bikeRackPlate: false,
      cartId,
      ...extra,
    }),
  });
}

async function flushAfter() {
  await Promise.all(afterCallbacks.splice(0).map((callback) => callback()));
}

beforeEach(() => {
  vi.stubEnv('stripe_api', 'pk_test_x');
  vi.stubEnv('stripe_live', 'sk_test_x');
  afterCallbacks.length = 0;
  sendMail.mockReset().mockResolvedValue({});
  vi.mocked(getMailTransport).mockReturnValue({
    sendMail,
  } as unknown as ReturnType<typeof getMailTransport>);
  stripe.customers.create.mockResolvedValue({ id: 'cus_1' });
  stripe.paymentIntents.create.mockResolvedValue(intent);
  stripe.paymentIntents.retrieve.mockResolvedValue(intent);
});

describe('Checkout started notification', () => {
  it('emails plate, timestamp and UTM parameters when a new checkout opens', async () => {
    const response = await POST(
      request({
        attribution: {
          utm_source: 'google',
          utm_campaign: '<b>herbst</b>',
          landing_page: '/kennzeichen-bestellen',
          evil: 'dropped',
        },
      }),
    );
    expect(response.status).toBe(200);
    await flushAfter();

    expect(sendMail).toHaveBeenCalledOnce();
    const mail = sendMail.mock.calls[0][0];
    expect(mail.to).toBe('kennzeichenbestellung@function-concept.de');
    expect(mail.subject).toBe('Checkout gestartet – OL AB 123');
    expect(mail.html).toContain('OL AB 123');
    expect(mail.html).toMatch(/Zeitpunkt[\s\S]*\d{2}\.\d{2}\.\d{4}/);
    expect(mail.html).toContain('google');
    expect(mail.html).toContain('&lt;b&gt;herbst&lt;/b&gt;');
    expect(mail.html).not.toContain('<b>herbst</b>');
    expect(mail.html).toContain('/kennzeichen-bestellen');
    expect(mail.html).not.toContain('dropped');
  });

  it('does not email again when the same checkout is updated', async () => {
    const response = await POST(
      request({ paymentIntentId: intent.id, promoCode: '' }),
    );
    expect(response.status).toBe(200);
    await flushAfter();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('keeps the checkout working when the email fails', async () => {
    sendMail.mockRejectedValue(new Error('SMTP down'));
    const response = await POST(request({}));
    expect(response.status).toBe(200);
    await expect(flushAfter()).resolves.not.toThrow();
    expect(logEvent).toHaveBeenCalledWith(
      'warn',
      'Checkout-Hinweis konnte nicht gesendet werden',
      expect.objectContaining({ error: 'SMTP down' }),
    );
  });
});

describe('sanitizeAttribution', () => {
  it('keeps known string keys only and truncates long values', () => {
    expect(
      sanitizeAttribution({
        utm_source: ' fb ',
        utm_medium: 42,
        other: 'x',
        utm_term: 'a'.repeat(500),
      }),
    ).toEqual({ utm_source: 'fb', utm_term: 'a'.repeat(200) });
    expect(sanitizeAttribution('nope')).toEqual({});
    expect(sanitizeAttribution(null)).toEqual({});
  });
});
