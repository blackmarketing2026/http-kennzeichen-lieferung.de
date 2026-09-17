import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';

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

export default async function AdminLogsPage() {
  if (!isDatabaseConfigured()) {
    return <div className="admin-empty-state"><h1>API-Logs</h1><p>Es ist keine Datenbank konfiguriert.</p></div>;
  }

  await ensureSchema();
  const logs = await query<LogRow>('SELECT * FROM manufacturer_api_logs ORDER BY created_at DESC LIMIT 300');

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
    </div>
  );
}
