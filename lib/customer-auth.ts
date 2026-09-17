import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';

export const CUSTOMER_SESSION_COOKIE = 'customer_session';
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 Tage
export const LOGIN_TOKEN_TTL_MS = 15 * 60 * 1000; // 15 Minuten

function getSecret() {
  const secret = process.env.CUSTOMER_SESSION_SECRET?.trim();
  if (!secret) throw new Error('CUSTOMER_SESSION_SECRET ist nicht konfiguriert.');
  return secret;
}

function sign(value: string) {
  return createHmac('sha256', getSecret()).update(value).digest('hex');
}

export function isCustomerAuthConfigured() {
  return Boolean(process.env.CUSTOMER_SESSION_SECRET?.trim());
}

export function createCustomerSessionToken(customerId: string) {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${customerId}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyCustomerSessionToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [customerId, expiresRaw, signature] = parts;
  const payload = `${customerId}.${expiresRaw}`;
  let expectedSignature: string;
  try {
    expectedSignature = sign(payload);
  } catch {
    return null;
  }
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires <= Date.now()) return null;
  return customerId;
}

/** Raw token goes in the email link; only its hash is stored, like a password reset token. */
export function generateLoginToken() {
  const raw = randomBytes(32).toString('hex');
  return { raw, hash: hashLoginToken(raw) };
}

export function hashLoginToken(raw: string) {
  return createHash('sha256').update(raw).digest('hex');
}
