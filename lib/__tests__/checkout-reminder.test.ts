import { beforeEach, describe, expect, it, vi } from 'vitest';

const stripe = vi.hoisted(() => ({ retrieve: vi.fn() }));
vi.mock('stripe', () => ({
  default: class {
    paymentIntents = { retrieve: stripe.retrieve };
  },
}));
vi.mock('@/lib/db', () => ({
  isDatabaseConfigured: () => true,
  ensureCheckoutSchema: vi.fn(),
  query: vi.fn(),
}));
vi.mock('@/lib/mail', () => ({
  isMailConfigured: () => true,
  getMailTransport: vi.fn(),
  MAIL_FROM: 'shop@example.com',
  renderEmailTemplate: ({ heading, bodyHtml, ctaLabel, ctaUrl }: {
    heading: string; bodyHtml: string; ctaLabel?: string; ctaUrl?: string;
  }) => `<h1>${heading}</h1>${bodyHtml}<a href="${ctaUrl}">${ctaLabel}</a>`,
}));
vi.mock('@/lib/logger', () => ({ logEvent: vi.fn() }));

import { GET } from '@/app/api/cron/checkout-reminders/route';
import { query } from '@/lib/db';
import { getMailTransport } from '@/lib/mail';

const sendMail = vi.fn();
const order = {
  id: 'order-1', plate: 'OL AB 123', plate_type: 'standard', plate_color: 'black',
  quantity: 2, parking_plate: 0, bike_rack_plate: 0,
  season_start_month: null, season_end_month: null, promo_code: null,
  stripe_payment_intent_id: 'pi_started123', reminder_email: 'kunde@example.com',
  reminder_first_name: 'Anna', reminder_city: 'Berlin',
};

function request(authorization = 'Bearer test-secret') {
  return new Request('https://shop.example.com/api/cron/checkout-reminders', {
    headers: { authorization },
  });
}

beforeEach(() => {
  vi.stubEnv('CRON_SECRET', 'test-secret');
  vi.stubEnv('stripe_live', 'sk_test_x');
  sendMail.mockReset().mockResolvedValue({});
  vi.mocked(getMailTransport).mockReturnValue({ sendMail } as unknown as ReturnType<typeof getMailTransport>);
  stripe.retrieve.mockReset().mockResolvedValue({ status: 'requires_payment_method' });
  vi.mocked(query).mockReset().mockImplementation(async (sql) => {
    if (sql.startsWith('SELECT id FROM orders')) return { rows: [{ id: order.id }], affectedRows: 1, insertId: 0 };
    if (sql.startsWith('SELECT id, plate')) return { rows: [order], affectedRows: 1, insertId: 0 };
    if (sql.startsWith('SELECT reminder_email')) return { rows: [{ reminder_email: order.reminder_email }], affectedRows: 1, insertId: 0 };
    return { rows: [], affectedRows: 1, insertId: 0 };
  });
});

describe('abandoned checkout reminder', () => {
  it('sends the personalized mail only for a due, unpaid, claimed order', async () => {
    const response = await GET(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ checked: 1, sent: 1 });
    expect(sendMail).toHaveBeenCalledOnce();
    const mail = sendMail.mock.calls[0][0];
    expect(mail.to).toBe('kunde@example.com');
    expect(mail.subject).toBe('OL AB 123 – in 10 Minuten gedruckt 🚗');
    expect(mail.html).toContain('Hallo Anna');
    expect(mail.html).toContain('Berlin');
    expect(mail.html).toContain('/checkout?plate=OL+AB+123');
    expect(query).toHaveBeenCalledWith(expect.stringContaining('reminder_sent_at = UTC_TIMESTAMP()'), [order.id]);
  });

  it('skips a checkout that Stripe says is already paid', async () => {
    stripe.retrieve.mockResolvedValue({ status: 'succeeded' });
    const response = await GET(request());
    expect(await response.json()).toEqual({ checked: 1, sent: 0 });
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects unauthenticated calls', async () => {
    expect((await GET(request('Bearer wrong'))).status).toBe(401);
    expect(query).not.toHaveBeenCalled();
  });
});
