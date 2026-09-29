import Link from 'next/link';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';

export const dynamic = 'force-dynamic';

type Claim = {
  id: string; order_id: string; applicant_email: string; replacement_purchased_on: string;
  message: string | null; receipt_filename: string; status: string; created_at: string;
  plate: string; delivery_deadline_date: string | null;
};

export default async function GuaranteeClaimsPage() {
  if (!isDatabaseConfigured()) return <main><h1>Liefergarantie-Anträge</h1><p>Keine Datenbank konfiguriert.</p></main>;
  await ensureSchema();
  const claims = await query<Claim>(`SELECT c.id, c.order_id, c.applicant_email, c.replacement_purchased_on,
    c.message, c.receipt_filename, c.status, c.created_at, o.plate, o.delivery_deadline_date
    FROM delivery_guarantee_claims c JOIN orders o ON o.id = c.order_id ORDER BY c.created_at DESC LIMIT 200`);
  return <div className="admin-orders-page"><h1>Liefergarantie-Anträge</h1>
    {claims.rows.length === 0 ? <p>Noch keine Anträge eingegangen.</p> : <div className="guarantee-admin-list">{claims.rows.map((claim) =>
      <article key={claim.id}>
        <h2>{claim.plate} · {claim.status}</h2>
        <p>Bestellung: {claim.order_id}<br />E-Mail: {claim.applicant_email}<br />Ersatzkauf: {String(claim.replacement_purchased_on).slice(0, 10)}<br />Zugesagt bis: {claim.delivery_deadline_date ? String(claim.delivery_deadline_date).slice(0, 10) : 'Kein Datum hinterlegt'}<br />Eingang: {new Date(claim.created_at).toLocaleString('de-DE')}</p>
        {claim.message && <p>Nachricht: {claim.message}</p>}
        <Link href={`/api/admin/liefergarantie/${claim.id}/beleg`}>Beleg herunterladen ({claim.receipt_filename})</Link>
      </article>)}
    </div>}
  </div>;
}
