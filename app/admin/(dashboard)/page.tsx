import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { isManufacturerApiCredentialsConfigured, isManufacturerApiEnabled } from '@/lib/kennzeichen-api';
import { ApiToggle } from '@/components/admin/api-toggle';
import { RetryButton } from '@/components/admin/retry-button';
import { TestOrderForm } from '@/components/admin/test-order-form';

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, string> = {
  draft: 'Entwurf',
  payment_pending: 'Zahlung ausstehend',
  paid: 'Bezahlt',
  submitting_to_manufacturer: 'Wird übertragen…',
  submitted_to_manufacturer: 'An Hersteller übertragen',
  manufacturer_submission_uncertain: 'Übertragung unklar',
  manufacturer_submission_failed: 'Übertragung fehlgeschlagen',
  shipped: 'Versendet',
  returned: 'Zurückgesendet',
  cancelled_by_manufacturer: 'Vom Hersteller storniert',
};

type OrderListRow = {
  id: string;
  cart_id: string;
  status: string;
  plate: string;
  plate_type: string;
  plate_color: string;
  quantity: number;
  total_cents: number;
  customer_email: string | null;
  manufacturer_order_id: number | null;
  tracking_code: string | null;
  last_error: string | null;
  created_at: string;
};

export default async function AdminOrdersPage() {
  if (!isDatabaseConfigured()) {
    return <div className="admin-empty-state"><h1>Bestellungen</h1><p>Es ist keine Datenbank konfiguriert (DATABASE_URL / POSTGRES_URL fehlt).</p></div>;
  }

  await ensureSchema();
  const [orders, enabled] = await Promise.all([
    query<OrderListRow>('SELECT * FROM orders ORDER BY created_at DESC LIMIT 200'),
    isManufacturerApiEnabled(),
  ]);
  const credentialsConfigured = isManufacturerApiCredentialsConfigured();

  return (
    <div className="admin-orders-page">
      <h1>Bestellungen</h1>
      <ApiToggle initialEnabled={enabled} credentialsConfigured={credentialsConfigured} />
      <TestOrderForm />
      <table className="admin-table">
        <thead>
          <tr>
            <th>Eingegangen</th>
            <th>Kennzeichen</th>
            <th>Menge</th>
            <th>Summe</th>
            <th>E-Mail</th>
            <th>Status</th>
            <th>Hersteller-ID</th>
            <th>Tracking</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {orders.rows.map((order) => (
            <tr key={order.id}>
              <td>{new Date(order.created_at).toLocaleString('de-DE')}</td>
              <td>{order.plate} <span className="admin-muted">({order.plate_type} · {order.plate_color})</span></td>
              <td>{order.quantity}</td>
              <td>{(order.total_cents / 100).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</td>
              <td>{order.customer_email ?? '–'}</td>
              <td>
                <span className={`admin-status admin-status-${order.status}`}>{STATUS_LABELS[order.status] ?? order.status}</span>
                {order.last_error && <div className="admin-error-note">{order.last_error}</div>}
              </td>
              <td>{order.manufacturer_order_id ?? '–'}</td>
              <td>{order.tracking_code ?? '–'}</td>
              <td>
                {(order.status === 'manufacturer_submission_failed' || order.status === 'manufacturer_submission_uncertain') && (
                  <RetryButton orderId={order.id} />
                )}
              </td>
            </tr>
          ))}
          {orders.rows.length === 0 && (
            <tr><td colSpan={9} className="admin-empty-row">Noch keine Bestellungen eingegangen.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
