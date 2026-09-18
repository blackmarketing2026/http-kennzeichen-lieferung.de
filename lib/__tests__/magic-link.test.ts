import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/mail', () => ({
  isMailConfigured: vi.fn(),
  getMailTransport: vi.fn(),
  MAIL_FROM: 'shop@example.com',
  renderEmailTemplate: vi.fn(() => '<p>Magic Link</p>'),
}));
vi.mock('@/lib/logger', () => ({ logEvent: vi.fn() }));
vi.mock('@/lib/db', () => ({ ensureSchema: vi.fn(), isDatabaseConfigured: vi.fn(() => true) }));
vi.mock('@/lib/customer-auth', () => ({ isCustomerAuthConfigured: vi.fn(() => true) }));
vi.mock('@/lib/customers', () => ({
  findOrCreateCustomerByEmail: vi.fn(async () => 'customer-1'),
  createLoginToken: vi.fn(async () => 'one-time-token'),
}));

import { isMailConfigured, getMailTransport } from '@/lib/mail';
import { sendLoginLinkEmail } from '@/lib/customer-email';
import { POST } from '@/app/api/konto/login/route';
import { findOrCreateCustomerByEmail } from '@/lib/customers';

const sendMail = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(isMailConfigured).mockReturnValue(true);
  vi.mocked(getMailTransport).mockReturnValue({ sendMail } as unknown as ReturnType<typeof getMailTransport>);
  sendMail.mockReset().mockResolvedValue({ accepted: ['kunde@example.com'] });
});

function loginRequest(body: unknown) {
  return new Request('https://shop.example.com/api/konto/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('Magic Link delivery', () => {
  it('sends the one-time link to the normalized email address before reporting success', async () => {
    const response = await POST(loginRequest({ email: ' Kunde@Example.com ' }));
    expect(response.status).toBe(200);
    expect(findOrCreateCustomerByEmail).toHaveBeenCalledWith('kunde@example.com');
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'kunde@example.com',
      text: expect.stringContaining('https://shop.example.com/api/konto/verify?token=one-time-token'),
    }));
  });

  it('reports a retryable error when SMTP fails instead of showing email sent', async () => {
    sendMail.mockRejectedValue(new Error('SMTP unavailable'));
    const response = await POST(loginRequest({ email: 'kunde@example.com' }));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: expect.stringContaining('nicht versendet') });
  });

  it('does not silently succeed when mail is not configured', async () => {
    vi.mocked(isMailConfigured).mockReturnValue(false);
    await expect(sendLoginLinkEmail('kunde@example.com', 'https://shop.example.com/login', 'https://shop.example.com')).rejects.toThrow();
    expect(sendMail).not.toHaveBeenCalled();
  });

  it.each([null, { email: 42 }, { email: 'invalid' }])('rejects malformed input %j without issuing a token', async (body) => {
    expect((await POST(loginRequest(body))).status).toBe(400);
    expect(findOrCreateCustomerByEmail).not.toHaveBeenCalled();
    expect(sendMail).not.toHaveBeenCalled();
  });
});
