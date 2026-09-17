import { query } from '@/lib/db';

const SECRET_KEYS = /^(authorization|password|passwort|pass|secret|token|api_password|apipassword|x-signature|signature)$/i;

export function maskSecrets(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(maskSecrets);
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, val]) => [
        key,
        SECRET_KEYS.test(key) ? '***' : maskSecrets(val),
      ]),
    );
  }
  return value;
}

export function logEvent(level: 'info' | 'warn' | 'error', message: string, fields: Record<string, unknown> = {}) {
  const entry = { level, message, ...maskSecrets(fields) as Record<string, unknown>, timestamp: new Date().toISOString() };
  // eslint-disable-next-line no-console
  console[level === 'info' ? 'log' : level](JSON.stringify(entry));
}

export async function logManufacturerEvent(entry: {
  orderId?: string | null;
  direction: 'request' | 'response' | 'webhook' | 'error';
  endpoint: string;
  httpStatus?: number | null;
  traceId?: string | null;
  message?: string | null;
  detail?: unknown;
}) {
  logEvent(entry.direction === 'error' ? 'error' : 'info', entry.message ?? entry.endpoint, entry);
  try {
    await query(
      `INSERT INTO manufacturer_api_logs (order_id, direction, endpoint, http_status, trace_id, message, detail)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.orderId ?? null,
        entry.direction,
        entry.endpoint,
        entry.httpStatus ?? null,
        entry.traceId ?? null,
        entry.message ?? null,
        JSON.stringify(maskSecrets(entry.detail ?? {})),
      ],
    );
  } catch (error) {
    console.error('Log konnte nicht gespeichert werden:', error instanceof Error ? error.message : error);
  }
}
