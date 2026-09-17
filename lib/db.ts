import { Pool } from 'pg';

let pool: Pool | null = null;

function getConnectionString() {
  return (process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '').trim();
}

export function isDatabaseConfigured() {
  return Boolean(getConnectionString());
}

function getPool() {
  if (pool) return pool;
  const connectionString = getConnectionString();
  if (!connectionString) {
    throw new Error('Keine Datenbank konfiguriert (DATABASE_URL bzw. POSTGRES_URL fehlt).');
  }
  pool = new Pool({
    connectionString,
    ssl: connectionString.includes('sslmode=disable') ? false : { rejectUnauthorized: false },
  });
  return pool;
}

export async function query<T extends Record<string, unknown> = Record<string, unknown>>(
  text: string,
  params: unknown[] = [],
) {
  const client = getPool();
  return client.query<T>(text, params);
}

let schemaReady: Promise<void> | null = null;

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  plate text NOT NULL,
  plate_type text NOT NULL,
  plate_color text NOT NULL,
  quantity integer NOT NULL,
  unit_price_cents integer NOT NULL,
  shipping_cents integer NOT NULL,
  total_cents integer NOT NULL,
  customer_email text,
  delivery_address jsonb,
  invoice_address jsonb,
  stripe_payment_intent_id text UNIQUE,
  manufacturer_external_id text UNIQUE,
  manufacturer_order_id bigint,
  manufacturer_delivery_ids jsonb,
  manufacturer_cost_net_value text,
  manufacturer_submitted_at timestamptz,
  tracking_code text,
  shipped_at timestamptz,
  returned_delivery_id bigint,
  last_error text,
  last_trace_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS manufacturer_api_logs (
  id bigserial PRIMARY KEY,
  order_id uuid REFERENCES orders(id) ON DELETE SET NULL,
  direction text NOT NULL,
  endpoint text NOT NULL,
  http_status integer,
  trace_id text,
  message text,
  detail jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS manufacturer_webhook_events (
  id bigserial PRIMARY KEY,
  dedupe_key text UNIQUE NOT NULL,
  event_type text,
  signature_valid boolean NOT NULL,
  raw jsonb,
  processed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_settings (
  key text PRIMARY KEY,
  value text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
`;

export async function ensureSchema() {
  schemaReady ??= (async () => {
    await query(SCHEMA_SQL);
  })();
  return schemaReady;
}
