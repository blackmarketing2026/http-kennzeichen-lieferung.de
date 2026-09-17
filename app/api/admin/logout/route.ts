import { ADMIN_SESSION_COOKIE } from '@/lib/admin-auth';

export const runtime = 'nodejs';

export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.append('Set-Cookie', `${ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  return response;
}
