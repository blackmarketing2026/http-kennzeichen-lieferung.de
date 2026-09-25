import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/mail', () => ({
  isMailConfigured: vi.fn(() => true),
  getMailTransport: vi.fn(),
  MAIL_FROM: 'shop@example.com',
  renderEmailTemplate: vi.fn(({ heading, bodyHtml }: { heading: string; bodyHtml: string }) => `<h1>${heading}</h1>${bodyHtml}`),
}));
vi.mock('@/lib/logger', () => ({ logEvent: vi.fn() }));

import { getMailTransport } from '@/lib/mail';
import { sendShopOrderNotificationEmail, type OrderEmailOrder } from '@/lib/order-emails';

const sendMail = vi.fn();
const order: OrderEmailOrder = {
  id: 'order-1',
  plate: 'OL JB 401',
  plate_type: 'standard',
  plate_color: 'black',
  quantity: 2,
  total_cents: 500,
  customer_email: 'kunde@example.com',
};

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue({});
  vi.mocked(getMailTransport).mockReturnValue({ sendMail } as unknown as ReturnType<typeof getMailTransport>);
});

describe('Shop order notification', () => {
  it('sends "Neue Bestellung" with the plate number and the Stripe invoice PDF to the bookkeeping address', async () => {
    const pdf = Buffer.from('%PDF-1.4');
    await sendShopOrderNotificationEmail(order, 'ABC-0001', pdf, 'https://shop.example.com');

    expect(sendMail).toHaveBeenCalledOnce();
    const mail = sendMail.mock.calls[0][0];
    expect(mail.to).toBe('kennzeichenbestellung@function-concept.de');
    expect(mail.subject).toBe('Neue Bestellung – OL JB 401');
    expect(mail.html).toContain('Neue Bestellung');
    expect(mail.html).toContain('OL JB 401');
    expect(mail.attachments).toEqual([{ filename: 'Rechnung-ABC-0001.pdf', content: pdf, contentType: 'application/pdf' }]);
  });
});
