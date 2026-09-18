import { ensureSchema, isDatabaseConfigured } from '@/lib/db';
import { isCustomerAuthConfigured } from '@/lib/customer-auth';
import { createLoginToken, findOrCreateCustomerByEmail } from '@/lib/customers';
import { sendLoginLinkEmail } from '@/lib/customer-email';
import { logEvent } from '@/lib/logger';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isCustomerAuthConfigured()) {
    return Response.json({ error: 'Kundenkonto-Login ist serverseitig nicht konfiguriert (CUSTOMER_SESSION_SECRET fehlt).' }, { status: 503 });
  }
  if (!isDatabaseConfigured()) {
    return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const email = body && typeof body === 'object' && 'email' in body && typeof body.email === 'string'
    ? body.email.trim().toLowerCase()
    : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, { status: 400 });
  }

  try {
    await ensureSchema();
    const customerId = await findOrCreateCustomerByEmail(email);
    const rawToken = await createLoginToken(customerId);

    const origin = new URL(request.url).origin;
    const loginUrl = `${origin}/api/konto/verify?token=${rawToken}`;
    await sendLoginLinkEmail(email, loginUrl, origin);
  } catch (error) {
    logEvent('error', 'Magic-Link-Anmeldung fehlgeschlagen', { error: error instanceof Error ? error.message : 'unbekannt' });
    return Response.json({ error: 'Der Magic Link konnte nicht versendet werden. Bitte versuche es später erneut.' }, { status: 503 });
  }

  return Response.json({ ok: true });
}
