import Stripe from 'stripe';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { ORDER_NOTIFICATION_EMAIL, sendShopOrderNotificationEmail, type OrderEmailOrder } from '@/lib/order-emails';
import { fetchStripeInvoicePdf } from '@/lib/stripe-invoice';

export const runtime = 'nodejs';

/** Admin-only: re-sends the shop's "Neue Bestellung" notification for the latest invoiced order
 * (with its real Stripe invoice PDF), to verify SMTP delivery to the bookkeeping inbox. */
export async function GET(request: Request) {
  if (!verifyAdminSessionToken((await cookies()).get(ADMIN_SESSION_COOKIE)?.value)) {
    return Response.json({ error: 'Nicht angemeldet.' }, { status: 401 });
  }
  const secretKey = process.env.stripe_live?.trim();
  if (!isDatabaseConfigured() || !secretKey?.startsWith('sk_')) {
    return Response.json({ error: 'Datenbank oder Stripe ist nicht konfiguriert.' }, { status: 503 });
  }

  await ensureSchema();
  const rows = await query<OrderEmailOrder & { stripe_invoice_id: string }>(
    'SELECT * FROM orders WHERE stripe_invoice_id IS NOT NULL ORDER BY created_at DESC LIMIT 1',
  );
  const order = rows.rows[0];
  if (!order) return Response.json({ error: 'Keine Bestellung mit Stripe-Rechnung gefunden.' }, { status: 404 });

  try {
    const invoice = await new Stripe(secretKey).invoices.retrieve(order.stripe_invoice_id);
    const pdf = await fetchStripeInvoicePdf(invoice.invoice_pdf!);
    await sendShopOrderNotificationEmail(order, invoice.number!, pdf, new URL(request.url).origin);
    return Response.json({ ok: true, to: ORDER_NOTIFICATION_EMAIL, plate: order.plate, invoice: invoice.number });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : 'Unbekannter Fehler' }, { status: 502 });
  }
}
