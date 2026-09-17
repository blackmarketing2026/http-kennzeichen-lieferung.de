import { ADMIN_SESSION_COOKIE, checkAdminPassword, createAdminSessionToken, isAdminAuthConfigured } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return Response.json({ error: 'Admin-Zugang ist serverseitig nicht konfiguriert (ADMIN_PASSWORD / ADMIN_SESSION_SECRET fehlen).' }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  if (!body.password || !checkAdminPassword(body.password)) {
    return Response.json({ error: 'Falsches Passwort.' }, { status: 401 });
  }

  const token = createAdminSessionToken();
  const response = Response.json({ ok: true });
  response.headers.append(
    'Set-Cookie',
    `${ADMIN_SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
  );
  return response;
}
