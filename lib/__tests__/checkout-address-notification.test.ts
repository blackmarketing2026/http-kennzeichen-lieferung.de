import { beforeEach, describe, expect, it, vi } from 'vitest';

const afterCallbacks = vi.hoisted(() => [] as Array<() => unknown>);
vi.mock('next/server', () => ({
  after: (callback: () => unknown) => afterCallbacks.push(callback),
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
  renderEmailTemplate: ({ heading, bodyHtml }: { heading: string; bodyHtml: string }) =>
    `<h1>${heading}</h1>${bodyHtml}`,
}));
vi.mock('@/lib/logger', () => ({ logEvent: vi.fn() }));

import { POST } from '@/app/api/checkout-address-added/route';
import { query } from '@/lib/db';
import { getMailTransport } from '@/lib/mail';

const sendMail = vi.fn();
const cartId = '4317fc45-f2af-4603-8008-51620ae34424';
const paymentIntentId = 'pi_3UNRdJLhTyQobetctJpW2yOt';

function request(address: unknown = {
  name: 'Musterfrau', line1: 'Hauptstraße 1', city: 'Berlin',
  postalCode: '10115', country: 'DE',
}) {
  return new Request('https://shop.example.com/api/checkout-address-added', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', origin: 'https://shop.example.com', host: 'shop.example.com' },
    body: JSON.stringify({ cartId, paymentIntentId, address }),
  });
}

beforeEach(() => {
  afterCallbacks.length = 0;
  sendMail.mockReset().mockResolvedValue({});
  vi.mocked(getMailTransport).mockReturnValue({ sendMail } as unknown as ReturnType<typeof getMailTransport>);
  vi.mocked(query).mockReset().mockImplementation(async (sql) => {
    if (sql.startsWith('UPDATE orders SET address_notification_sent_at')) {
      return { rows: [], affectedRows: 1, insertId: 0 };
    }
    return { rows: [{ plate: 'OL AB 123' }], affectedRows: 1, insertId: 0 };
  });
});

describe('checkout address notification', () => {
  it('emails the shop once with the original subject after the address step', async () => {
    const response = await POST(request());
    expect(response.status).toBe(200);
    await Promise.all(afterCallbacks.splice(0).map((callback) => callback()));

    expect(sendMail).toHaveBeenCalledOnce();
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'kennzeichenbestellung@function-concept.de',
      subject: 'Checkout gestartet – OL AB 123',
      html: expect.stringContaining('Update: Lieferadresse hinzugefügt, aber noch nicht bezahlt'),
    }));
  });

  it('does not send again when the address step was already reported or payment is complete', async () => {
    vi.mocked(query).mockResolvedValue({ rows: [], affectedRows: 0, insertId: 0 });
    expect((await POST(request())).status).toBe(200);
    expect(afterCallbacks).toHaveLength(0);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('rejects an incomplete address before claiming the notification', async () => {
    expect((await POST(request({ name: 'Musterfrau' }))).status).toBe(400);
    expect(query).not.toHaveBeenCalled();
  });
});
