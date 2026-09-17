import { cookies } from 'next/headers';
import { ensureSchema, isDatabaseConfigured } from '@/lib/db';
import { CUSTOMER_SESSION_COOKIE, verifyCustomerSessionToken } from '@/lib/customer-auth';
import { getCustomerOrder } from '@/lib/customers';
import { ensureInvoiceForOrder, renderInvoicePdf, type InvoiceOrder } from '@/lib/invoice';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isDatabaseConfigured()) return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });

  const token = (await cookies()).get(CUSTOMER_SESSION_COOKIE)?.value;
  const customerId = verifyCustomerSessionToken(token);
  if (!customerId) return Response.json({ error: 'Nicht angemeldet.' }, { status: 401 });

  await ensureSchema();
  const { id } = await params;
  const order = (await getCustomerOrder(customerId, id)) as InvoiceOrder | null;
  if (!order) return Response.json({ error: 'Bestellung nicht gefunden.' }, { status: 404 });

  const invoice = await ensureInvoiceForOrder(order.id);
  const pdf = await renderInvoicePdf(order, invoice);

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Rechnung-${invoice.invoice_number}.pdf"`,
    },
  });
}
