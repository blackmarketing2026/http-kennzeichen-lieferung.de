import { randomUUID } from 'crypto';
import { query } from '@/lib/db';
import { generateLoginToken, hashLoginToken, LOGIN_TOKEN_TTL_MS } from '@/lib/customer-auth';

export async function findOrCreateCustomerByEmail(email: string): Promise<string> {
  const normalized = email.trim().toLowerCase();
  const existing = await query<{ id: string }>('SELECT id FROM customers WHERE email = ?', [normalized]);
  if (existing.rows[0]) return existing.rows[0].id;

  const id = randomUUID();
  try {
    await query('INSERT INTO customers (id, email) VALUES (?, ?)', [id, normalized]);
    return id;
  } catch (error) {
    // Race: another request created the same customer between our SELECT and INSERT.
    const code = error && typeof error === 'object' && 'code' in error ? String((error as { code: unknown }).code) : '';
    if (code === 'ER_DUP_ENTRY') {
      const retry = await query<{ id: string }>('SELECT id FROM customers WHERE email = ?', [normalized]);
      if (retry.rows[0]) return retry.rows[0].id;
    }
    throw error;
  }
}

/** Creates a login token for the customer and returns the raw token to embed in the email link. */
export async function createLoginToken(customerId: string): Promise<string> {
  const { raw, hash } = generateLoginToken();
  const expiresAt = new Date(Date.now() + LOGIN_TOKEN_TTL_MS);
  await query('INSERT INTO customer_login_tokens (customer_id, token_hash, expires_at) VALUES (?, ?, ?)', [
    customerId,
    hash,
    expiresAt,
  ]);
  return raw;
}

/** Verifies and consumes a login token; returns the customer id, or null if invalid/expired/used.
 * Compares against a JS-side timestamp rather than SQL's NOW() — the app server (UTC) and the
 * MySQL host can run in different timezones, and expires_at was written from JS, so mixing in
 * the DB server's own clock here made every token look expired the moment it was created. */
export async function consumeLoginToken(rawToken: string): Promise<string | null> {
  const hash = hashLoginToken(rawToken);
  const now = new Date();
  const result = await query(
    `UPDATE customer_login_tokens SET used_at = ?
     WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?`,
    [now, hash, now],
  );
  if (result.affectedRows === 0) return null;

  const rows = await query<{ customer_id: string }>('SELECT customer_id FROM customer_login_tokens WHERE token_hash = ?', [hash]);
  return rows.rows[0]?.customer_id ?? null;
}

export type CustomerOrderRow = {
  id: string;
  status: string;
  plate: string;
  plate_type: string;
  plate_color: string;
  quantity: number;
  total_cents: number;
  tracking_code: string | null;
  created_at: string;
  has_invoice: 0 | 1;
};

export async function listOrdersForCustomer(customerId: string) {
  return query<CustomerOrderRow>(
    `SELECT o.id, o.status, o.plate, o.plate_type, o.plate_color, o.quantity, o.total_cents, o.tracking_code, o.created_at,
            (i.id IS NOT NULL) AS has_invoice
     FROM orders o
     LEFT JOIN invoices i ON i.order_id = o.id
     WHERE o.customer_id = ?
     ORDER BY o.created_at DESC`,
    [customerId],
  );
}

export async function getCustomerOrder(customerId: string, orderId: string) {
  const result = await query('SELECT * FROM orders WHERE id = ? AND customer_id = ?', [orderId, customerId]);
  return result.rows[0] ?? null;
}
