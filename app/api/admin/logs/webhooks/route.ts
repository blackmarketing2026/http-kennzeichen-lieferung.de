import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';

export const runtime = 'nodejs';

type WebhookEventRow = {
  id: number;
  dedupe_key: string;
  event_type: string | null;
  signature_valid: 0 | 1;
  raw: unknown;
  processed_at: string | null;
  created_at: string;
};

/** Returns webhook events newer than `after` (by id), ascending — used by the live log view to
 * poll for and append only what's actually new, instead of re-fetching the whole table. */
export async function GET(request: Request) {
  if (!isDatabaseConfigured()) return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  await ensureSchema();

  const after = Number(new URL(request.url).searchParams.get('after') ?? '0');
  const result = await query<WebhookEventRow>(
    'SELECT * FROM manufacturer_webhook_events WHERE id > ? ORDER BY id ASC LIMIT 100',
    [Number.isFinite(after) ? after : 0],
  );

  return Response.json({ rows: result.rows });
}
