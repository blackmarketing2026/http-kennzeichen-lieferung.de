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
    unit_price_cents INT NOT NULL,
    shipping_cents INT NOT NULL,
    total_cents INT NOT NULL,
    customer_email VARCHAR(255),
    delivery_address JSON,
    invoice_address JSON,
    stripe_payment_intent_id VARCHAR(191) UNIQUE,
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
];

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
  })();
  return schemaReady;
}
