import { cookies } from 'next/headers';
import { CUSTOMER_SESSION_COOKIE, verifyCustomerSessionToken } from '@/lib/customer-auth';
import { listOrdersForCustomer, type CustomerOrderRow } from '@/lib/customers';
import { ensureSchema, isDatabaseConfigured, describeDatabaseError } from '@/lib/db';
import { formatPrice, PRODUCTS, type PlateType } from '@/config/products';

export const dynamic = 'force-dynamic';

const STATUS_LABELS: Record<string, string> = {
  draft: 'Entwurf',
  payment_pending: 'Zahlung ausstehend',
  paid: 'Bezahlt',
  submitting_to_manufacturer: 'Wird bearbeitet…',
  submitted_to_manufacturer: 'In Produktion',
  manufacturer_submission_uncertain: 'Wird geprüft',
  manufacturer_submission_failed: 'Wird geprüft',
  shipped: 'Versendet',
  returned: 'Zurückgesendet',
  cancelled_by_manufacturer: 'Storniert',
};

export default async function KontoOrdersPage() {
  const token = (await cookies()).get(CUSTOMER_SESSION_COOKIE)?.value;
  const customerId = verifyCustomerSessionToken(token);
  if (!customerId) {
    return <div className="konto-empty-state"><h1>Meine Bestellungen</h1><p>Bitte melde dich erneut an.</p></div>;
  }

  if (!isDatabaseConfigured()) {
    return <div className="konto-empty-state"><h1>Meine Bestellungen</h1><p>Es ist keine Datenbank konfiguriert.</p></div>;
  }

  let orders: { rows: CustomerOrderRow[] };
  try {
    await ensureSchema();
    orders = await listOrdersForCustomer(customerId);
  } catch (error) {
    return (
      <div className="konto-empty-state">
        <h1>Meine Bestellungen</h1>
        <p>Deine Bestellungen konnten gerade nicht geladen werden: <code>{describeDatabaseError(error)}</code></p>
      </div>
    );
  }

  return (
    <div className="konto-orders-page">
      <h1>Meine Bestellungen</h1>
      {orders.rows.length === 0 ? (
        <div className="konto-empty-state">Du hast noch keine Bestellungen mit diesem Konto verknüpft.</div>
      ) : (
        <table className="konto-table">
          <thead>
            <tr>
              <th>Datum</th>
              <th>Kennzeichen</th>
              <th>Menge</th>
              <th>Summe</th>
              <th>Status</th>
              <th>Tracking</th>
              <th>Rechnung</th>
            </tr>
          </thead>
          <tbody>
            {orders.rows.map((order) => (
              <tr key={order.id}>
                <td>{new Date(order.created_at).toLocaleString('de-DE')}</td>
                <td>
                  {order.plate} <span className="konto-muted">({PRODUCTS[order.plate_type as PlateType]?.label ?? order.plate_type} · {order.plate_color === 'carbon' ? 'Carbon' : 'Schwarz'})</span>
                </td>
                <td>{order.quantity}</td>
                <td>{formatPrice(order.total_cents / 100)}</td>
                <td><span className={`konto-status konto-status-${order.status}`}>{STATUS_LABELS[order.status] ?? order.status}</span></td>
                <td>{order.tracking_code ?? '–'}</td>
                <td>
                  {order.has_invoice ? (
                    <a className="konto-invoice-link" href={`/api/konto/orders/${order.id}/invoice`}>Herunterladen</a>
                  ) : (
                    <span className="konto-muted">–</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
