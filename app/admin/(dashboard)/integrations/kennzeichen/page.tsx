import { describeDatabaseError, ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { isManufacturerApiCredentialsConfigured, isManufacturerApiEnabled } from '@/lib/kennzeichen-api';
import { KennzeichenTestForm } from '@/components/admin/kennzeichen-test-form';

export const dynamic = 'force-dynamic';

type TestOrderRow = {
  id: number;
  external_id: string;
  manufacturer_order_id: number | null;
  manufacturer_delivery_ids: number[] | null;
  product_variant_id: number;
  plate: string;
  manufacturer_cost_net_value: string | null;
  created_at: string;
};

export default async function KennzeichenApiTestPage() {
  const credentialsConfigured = isManufacturerApiCredentialsConfigured();

  if (!isDatabaseConfigured()) {
    return (
      <div className="admin-empty-state">
        <h1>Kennzeichen API-Test</h1>
        <p>Es ist keine Datenbank konfiguriert.</p>
      </div>
    );
  }

  let history: { rows: TestOrderRow[] };
  let enabled: boolean;
  try {
    await ensureSchema();
    [history, enabled] = await Promise.all([
      query<TestOrderRow>('SELECT * FROM kennzeichen_api_test_orders ORDER BY created_at DESC LIMIT 50'),
      isManufacturerApiEnabled(),
    ]);
  } catch (error) {
    return (
      <div className="admin-empty-state">
        <h1>Kennzeichen API-Test</h1>
        <p>Datenbankverbindung fehlgeschlagen: <code>{describeDatabaseError(error)}</code></p>
      </div>
    );
  }

  return (
    <div className="admin-kennzeichen-test-page">
      <h1>Kennzeichen API-Test</h1>

      {!credentialsConfigured && (
        <p className="admin-login-error">
          API-Zugangsdaten sind serverseitig nicht konfiguriert (KENNZEICHEN_API_HOST/_CLIENT_ID/_VERSION/_USERNAME/_PASSWORD prüfen).
        </p>
      )}
      {credentialsConfigured && !enabled && (
        <p className="admin-muted">
          Hinweis: Die Kennzeichen-API ist im Admin-Bereich unter &bdquo;Bestellungen&ldquo; aktuell deaktiviert. Solange sie
          deaktiviert ist, schlägt die verbindliche Testbestellung mit &bdquo;API deaktiviert&ldquo; fehl, ohne dass ein
          Netzwerkaufruf stattfindet.
        </p>
      )}

      <KennzeichenTestForm credentialsConfigured={credentialsConfigured} />

      <h2>Bisherige Testbestellungen</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Zeitpunkt</th>
            <th>Externe ID</th>
            <th>Hersteller-Bestell-ID</th>
            <th>Delivery-ID(s)</th>
            <th>Varianten-ID</th>
            <th>Kennzeichen</th>
            <th>Nettokosten</th>
          </tr>
        </thead>
        <tbody>
          {history.rows.map((row) => (
            <tr key={row.id}>
              <td>{new Date(row.created_at).toLocaleString('de-DE')}</td>
              <td>{row.external_id}</td>
              <td>{row.manufacturer_order_id ?? '–'}</td>
              <td>{row.manufacturer_delivery_ids?.join(', ') ?? '–'}</td>
              <td>{row.product_variant_id}</td>
              <td>{row.plate}</td>
              <td>{row.manufacturer_cost_net_value ?? '–'}</td>
            </tr>
          ))}
          {history.rows.length === 0 && (
            <tr><td colSpan={7} className="admin-empty-row">Noch keine Testbestellungen.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
