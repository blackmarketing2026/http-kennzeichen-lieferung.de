import { ensureSchema, isDatabaseConfigured } from '@/lib/db';
import { isCustomerAuthConfigured } from '@/lib/customer-auth';
import { createLoginToken, findOrCreateCustomerByEmail } from '@/lib/customers';
import { sendLoginLinkEmail } from '@/lib/customer-email';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isCustomerAuthConfigured()) {
    return Response.json({ error: 'Kundenkonto-Login ist serverseitig nicht konfiguriert (CUSTOMER_SESSION_SECRET fehlt).' }, { status: 503 });
  }
  if (!isDatabaseConfigured()) {
    return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, { status: 400 });
  }

  await ensureSchema();
  const customerId = await findOrCreateCustomerByEmail(email);
  const rawToken = await createLoginToken(customerId);

  const origin = new URL(request.url).origin;
  const loginUrl = `${origin}/api/konto/verify?token=${rawToken}`;
  await sendLoginLinkEmail(email, loginUrl, origin);

  return Response.json({ ok: true });
}
