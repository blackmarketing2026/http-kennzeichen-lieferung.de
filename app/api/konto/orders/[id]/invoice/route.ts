import { cookies } from 'next/headers';
import Stripe from 'stripe';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { CUSTOMER_SESSION_COOKIE, verifyCustomerSessionToken } from '@/lib/customer-auth';
import { getCustomerOrder } from '@/lib/customers';
import { renderInvoicePdf, type InvoiceOrder, type InvoiceRecord } from '@/lib/invoice';
import { fetchStripeInvoicePdf } from '@/lib/stripe-invoice';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isDatabaseConfigured()) return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });

  const token = (await cookies()).get(CUSTOMER_SESSION_COOKIE)?.value;
  const customerId = verifyCustomerSessionToken(token);
  if (!customerId) return Response.json({ error: 'Nicht angemeldet.' }, { status: 401 });

  await ensureSchema();
  const { id } = await params;
  const order = (await getCustomerOrder(customerId, id)) as (InvoiceOrder & { stripe_invoice_id: string | null }) | null;
  if (!order) return Response.json({ error: 'Bestellung nicht gefunden.' }, { status: 404 });

  let pdf: Buffer;
  let invoiceNumber: string;
  if (order.stripe_invoice_id) {
    const secretKey = process.env.stripe_live?.trim();
    if (!secretKey?.startsWith('sk_')) return Response.json({ error: 'Stripe nicht konfiguriert.' }, { status: 503 });
    const invoice = await new Stripe(secretKey).invoices.retrieve(order.stripe_invoice_id);
    if (invoice.status !== 'paid' || !invoice.invoice_pdf || !invoice.number) {
      return Response.json({ error: 'Rechnung noch nicht verfügbar.' }, { status: 404 });
    }
    pdf = await fetchStripeInvoicePdf(invoice.invoice_pdf);
    invoiceNumber = invoice.number;
  } else {
    const result = await query<InvoiceRecord>('SELECT invoice_number, issued_at FROM invoices WHERE order_id = ?', [order.id]);
    const invoice = result.rows[0];
    if (!invoice) return Response.json({ error: 'Rechnung noch nicht verfügbar.' }, { status: 404 });
    pdf = await renderInvoicePdf(order, invoice);
    invoiceNumber = invoice.invoice_number;
  }

  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Rechnung-${invoiceNumber}.pdf"`,
    },
  });
}
