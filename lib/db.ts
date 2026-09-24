import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

function getConnectionConfig() {
  const url = process.env.DATABASE_URL?.trim();
  if (url) return { uri: url };

  const host = process.env.MYSQL_HOST?.trim();
  const user = process.env.MYSQL_USER?.trim();
  const password = process.env.MYSQL_PASSWORD?.trim();
  const database = process.env.MYSQL_DATABASE?.trim();
  const port = Number(process.env.MYSQL_PORT ?? '3306');
  if (!host || !user || !password || !database) return null;
  return { host, user, password, database, port };
}

export function isDatabaseConfigured() {
  return Boolean(getConnectionConfig());
}

function getPool() {
  if (pool) return pool;
  const config = getConnectionConfig();
  if (!config) {
    throw new Error('Keine Datenbank konfiguriert (DATABASE_URL bzw. MYSQL_HOST/_USER/_PASSWORD/_DATABASE fehlen).');
  }
  pool = mysql.createPool({ ...config, waitForConnections: true, connectionLimit: 5, connectTimeout: 8000 });
  return pool;
}

export type QueryResult<T> = { rows: T[]; affectedRows: number; insertId: number };

export async function query<T extends Record<string, unknown> = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  const client = getPool();
  const [result] = await client.query(sql, params);
  if (Array.isArray(result)) {
    return { rows: result as T[], affectedRows: result.length, insertId: 0 };
  }
  const header = result as mysql.ResultSetHeader;
  return { rows: [], affectedRows: header.affectedRows, insertId: header.insertId };
}

/** Runs `fn` against a single dedicated connection (not a fresh one per query), needed for
 * connection-scoped state like LAST_INSERT_ID() across consecutive statements. */
export async function withConnection<T>(fn: (conn: mysql.PoolConnection) => Promise<T>): Promise<T> {
  const client = getPool();
  const conn = await client.getConnection();
  try {
    return await fn(conn);
  } finally {
    conn.release();
  }
}

let schemaReady: Promise<void> | null = null;

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS orders (
    id CHAR(36) PRIMARY KEY,
    cart_id VARCHAR(191) UNIQUE NOT NULL,
    status VARCHAR(64) NOT NULL DEFAULT 'draft',
    plate VARCHAR(32) NOT NULL,
    plate_type VARCHAR(32) NOT NULL,
    plate_color VARCHAR(32) NOT NULL,
    quantity INT NOT NULL,
    parking_plate TINYINT(1) NOT NULL DEFAULT 0,
    bike_rack_plate TINYINT(1) NOT NULL DEFAULT 0,
    unit_price_cents INT NOT NULL,
    shipping_cents INT NOT NULL,
    discount_cents INT NOT NULL DEFAULT 0,
    promo_code VARCHAR(64) NULL,
    total_cents INT NOT NULL,
    customer_email VARCHAR(255),
    delivery_address JSON,
    invoice_address JSON,
    stripe_payment_intent_id VARCHAR(191) UNIQUE,
    stripe_invoice_id VARCHAR(191) UNIQUE,
    stripe_invoice_claimed_at DATETIME NULL,
    invoice_sent_at DATETIME NULL,
    manufacturer_external_id VARCHAR(191) UNIQUE,
    manufacturer_order_id BIGINT,
    manufacturer_delivery_ids JSON,
    manufacturer_cost_net_value VARCHAR(64),
    manufacturer_submitted_at DATETIME NULL,
    tracking_code VARCHAR(191),
    shipped_at DATETIME NULL,
    returned_delivery_id BIGINT,
    last_error TEXT,
    last_trace_id VARCHAR(191),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS manufacturer_api_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id CHAR(36) NULL,
    direction VARCHAR(32) NOT NULL,
    endpoint VARCHAR(191) NOT NULL,
    http_status INT,
    trace_id VARCHAR(191),
    message TEXT,
    detail JSON,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
  ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS manufacturer_webhook_events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    dedupe_key VARCHAR(191) UNIQUE NOT NULL,
    event_type VARCHAR(64),
    signature_valid TINYINT(1) NOT NULL,
    raw JSON,
    processed_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS admin_settings (
    setting_key VARCHAR(191) PRIMARY KEY,
    value VARCHAR(191) NOT NULL,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS kennzeichen_api_test_orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    external_id VARCHAR(191) UNIQUE NOT NULL,
    manufacturer_order_id BIGINT,
    manufacturer_delivery_ids JSON,
    product_variant_id INT NOT NULL,
    plate VARCHAR(16) NOT NULL,
    manufacturer_cost_net_value VARCHAR(64),
    executed_by VARCHAR(191) NOT NULL DEFAULT 'admin',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS customers (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS customer_login_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    customer_id CHAR(36) NOT NULL,
    token_hash CHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    used_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_login_tokens_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
  ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS invoice_counters (
    year INT PRIMARY KEY,
    counter INT NOT NULL DEFAULT 0
  ) ENGINE=InnoDB`,
  `CREATE TABLE IF NOT EXISTS invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id CHAR(36) NOT NULL UNIQUE,
    invoice_number VARCHAR(64) NOT NULL UNIQUE,
    issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_invoices_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
  ) ENGINE=InnoDB`,
];

/** Additive changes to tables that already shipped without these columns. Each statement is
 * applied independently and "already exists" failures (1060/1061/1826/1005) are swallowed so
 * this stays idempotent across repeated deploys and across MySQL/MariaDB error codes. */
const SCHEMA_MIGRATIONS = [
  `ALTER TABLE orders ADD COLUMN customer_id CHAR(36) NULL`,
  `ALTER TABLE orders ADD INDEX idx_orders_customer (customer_id)`,
  `ALTER TABLE orders ADD CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL`,
  `ALTER TABLE orders ADD COLUMN confirmation_sent_at DATETIME NULL`,
  `ALTER TABLE orders ADD COLUMN invoice_sent_at DATETIME NULL`,
  `ALTER TABLE orders ADD COLUMN stripe_invoice_id VARCHAR(191) NULL`,
  `ALTER TABLE orders ADD UNIQUE INDEX idx_orders_stripe_invoice_id (stripe_invoice_id)`,
  `ALTER TABLE orders ADD COLUMN stripe_invoice_claimed_at DATETIME NULL`,
  `ALTER TABLE orders ADD COLUMN shipping_email_sent_at DATETIME NULL`,
  `ALTER TABLE orders ADD COLUMN discount_cents INT NOT NULL DEFAULT 0`,
  `ALTER TABLE orders ADD COLUMN promo_code VARCHAR(64) NULL`,
  `ALTER TABLE orders ADD COLUMN parking_plate TINYINT(1) NOT NULL DEFAULT 0`,
  `ALTER TABLE orders ADD COLUMN bike_rack_plate TINYINT(1) NOT NULL DEFAULT 0`,
];

const IGNORABLE_MIGRATION_ERROR_CODES = new Set([
  'ER_DUP_FIELDNAME', // column already exists
  'ER_DUP_KEYNAME', // index already exists
  'ER_FK_DUP_NAME', // foreign key already exists
  'ER_CANT_CREATE_TABLE', // some MariaDB versions report FK re-creation this way
]);

export function describeDatabaseError(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code: unknown }).code);
  }
  return error instanceof Error ? error.constructor.name : 'unknown';
}

export async function ensureSchema() {
  schemaReady ??= (async () => {
    for (const statement of SCHEMA_STATEMENTS) {
      await query(statement);
    }
    for (const statement of SCHEMA_MIGRATIONS) {
      try {
        await query(statement);
      } catch (error) {
        const code = error && typeof error === 'object' && 'code' in error ? String((error as { code: unknown }).code) : '';
        if (!IGNORABLE_MIGRATION_ERROR_CODES.has(code)) throw error;
      }
    }
  })();
  return schemaReady;
}
