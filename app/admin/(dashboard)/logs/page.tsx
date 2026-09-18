import { describeDatabaseError, ensureSchema, isDatabaseConfigured, query } from '@/lib/db';

export const dynamic = 'force-dynamic';

type LogRow = {
  id: string;
  order_id: string | null;
  direction: string;
  endpoint: string;
  http_status: number | null;
  trace_id: string | null;
  message: string | null;
  detail: unknown;
  created_at: string;
};

type WebhookEventRow = {
  id: string;
  dedupe_key: string;
  event_type: string | null;
  signature_valid: 0 | 1;
  raw: unknown;
  processed_at: string | null;
  created_at: string;
};

export default async function AdminLogsPage() {
  if (!isDatabaseConfigured()) {
    return <div className="admin-empty-state"><h1>API-Logs</h1><p>Es ist keine Datenbank konfiguriert.</p></div>;
  }

  let logs: { rows: LogRow[] };
  let webhookEvents: { rows: WebhookEventRow[] };
  try {
    await ensureSchema();
    [logs, webhookEvents] = await Promise.all([
      query<LogRow>('SELECT * FROM manufacturer_api_logs ORDER BY created_at DESC LIMIT 300'),
      query<WebhookEventRow>('SELECT * FROM manufacturer_webhook_events ORDER BY created_at DESC LIMIT 100'),
    ]);
  } catch (error) {
    return (
      <div className="admin-empty-state">
        <h1>API-Logs</h1>
        <p>Datenbankverbindung fehlgeschlagen: <code>{describeDatabaseError(error)}</code></p>
      </div>
    );
  }

  return (
    <div className="admin-logs-page">
      <h1>API-Logs</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Zeitpunkt</th>
            <th>Richtung</th>
            <th>Endpunkt</th>
            <th>HTTP</th>
            <th>Trace-ID</th>
            <th>Nachricht</th>
          </tr>
        </thead>
        <tbody>
          {logs.rows.map((log) => (
            <tr key={log.id} className={log.direction === 'error' ? 'admin-log-error' : undefined}>
              <td>{new Date(log.created_at).toLocaleString('de-DE')}</td>
              <td>{log.direction}</td>
              <td>{log.endpoint}</td>
              <td>{log.http_status ?? '–'}</td>
              <td>{log.trace_id ?? '–'}</td>
              <td>{log.message ?? '–'}</td>
            </tr>
          ))}
          {logs.rows.length === 0 && (
            <tr><td colSpan={6} className="admin-empty-row">Noch keine Log-Einträge.</td></tr>
          )}
        </tbody>
      </table>

      <h1 style={{ marginTop: 40 }}>Eingehende Hersteller-Webhooks</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Zeitpunkt</th>
            <th>Event-Typ</th>
            <th>Signatur gültig</th>
            <th>Verarbeitet</th>
            <th>Rohdaten (Payload)</th>
          </tr>
        </thead>
        <tbody>
          {webhookEvents.rows.map((event) => (
            <tr key={event.id} className={!event.signature_valid ? 'admin-log-error' : undefined}>
              <td>{new Date(event.created_at).toLocaleString('de-DE')}</td>
              <td>{event.event_type ?? '–'}</td>
              <td>{event.signature_valid ? 'Ja' : 'Nein'}</td>
              <td>{event.processed_at ? new Date(event.processed_at).toLocaleString('de-DE') : '–'}</td>
              <td><pre style={{ whiteSpace: 'pre-wrap', margin: 0, fontSize: 11 }}>{JSON.stringify(event.raw, null, 2)}</pre></td>
            </tr>
          ))}
          {webhookEvents.rows.length === 0 && (
            <tr><td colSpan={5} className="admin-empty-row">Noch keine eingehenden Webhooks.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
