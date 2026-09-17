import { CUSTOMER_SESSION_COOKIE } from '@/lib/customer-auth';

export const runtime = 'nodejs';

export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.append('Set-Cookie', `${CUSTOMER_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  return response;
}
