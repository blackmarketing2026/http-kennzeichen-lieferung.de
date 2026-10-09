import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/mail', () => ({
  isMailConfigured: vi.fn(() => true),
  getMailTransport: vi.fn(),
  MAIL_FROM: 'shop@example.com',
  renderEmailTemplate: vi.fn(({ bodyHtml }: { bodyHtml: string }) => bodyHtml),
}));
vi.mock('@/lib/logger', () => ({ logEvent: vi.fn() }));

import { getMailTransport } from '@/lib/mail';
import { sendOrderConfirmationEmail, type OrderEmailOrder } from '@/lib/order-emails';
import { EVB_PARTNER_URL } from '@/lib/config';

const sendMail = vi.fn();
const order: OrderEmailOrder = {
  id: 'order-1', plate: 'B AB 123', plate_type: 'standard', plate_color: 'black',
  quantity: 3, total_cents: 2190, customer_email: 'kunde@example.com',
  offer_profile: 'herbst', bike_rack_plate: 1,
};
const checklistUrl = 'https://shop.example.com/downloads/checkliste-zulassung.pdf';

beforeEach(() => {
  sendMail.mockReset().mockResolvedValue({});
  vi.mocked(getMailTransport).mockReturnValue({ sendMail } as unknown as ReturnType<typeof getMailTransport>);
});
afterEach(() => vi.unstubAllGlobals());

describe('Herbst checklist in order confirmation', () => {
  it.each(['black', 'carbon'] as const)('attaches the PDF to a %s three-plate set', async (plate_color) => {
    const pdf = Buffer.from('%PDF-1.4 checklist');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, arrayBuffer: async () => Uint8Array.from(pdf).buffer });
    vi.stubGlobal('fetch', fetchMock);

    await sendOrderConfirmationEmail({ ...order, plate_color }, 'https://shop.example.com');

    expect(fetchMock).toHaveBeenCalledWith(checklistUrl, expect.any(Object));
    expect(sendMail).toHaveBeenCalledOnce();
    expect(sendMail.mock.calls[0][0]).toMatchObject({
      html: expect.stringContaining(checklistUrl),
      attachments: [{ filename: 'Kfz-Zulassung-Dokumente-Checkliste.pdf', content: pdf, contentType: 'application/pdf' }],
    });
  });

  it.each([
    { offer_profile: 'standard' },
    { bike_rack_plate: 0, quantity: 2 },
    { plate_type: 'electric' as const },
  ])('does not attach the PDF for other orders', async (changes) => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await sendOrderConfirmationEmail({ ...order, ...changes }, 'https://shop.example.com');

    expect(fetchMock).not.toHaveBeenCalled();
    expect(sendMail.mock.calls[0][0].attachments).toBeUndefined();
    expect(sendMail.mock.calls[0][0].html).not.toContain(checklistUrl);
  });

  it('keeps the download link in the email if attachment loading fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('download failed')));

    await sendOrderConfirmationEmail(order, 'https://shop.example.com');

    expect(sendMail.mock.calls[0][0].html).toContain(checklistUrl);
    expect(sendMail.mock.calls[0][0].attachments).toBeUndefined();
  });

  it('includes the marked eVB partner link only for Herbst orders', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('download failed')));
    await sendOrderConfirmationEmail(order, 'https://shop.example.com');
    expect(sendMail.mock.calls[0][0].html).toContain('Anzeige');
    expect(sendMail.mock.calls[0][0].html).toContain(EVB_PARTNER_URL);
    expect(sendMail.mock.calls[0][0].html).toContain('rel="sponsored noopener noreferrer"');
    sendMail.mockClear();
    await sendOrderConfirmationEmail({ ...order, offer_profile: 'standard' }, 'https://shop.example.com');
    expect(sendMail.mock.calls[0][0].html).not.toContain(EVB_PARTNER_URL);
  });
});
