import { ensureSchema, isDatabaseConfigured } from '@/lib/db';
import { CUSTOMER_SESSION_COOKIE, createCustomerSessionToken, isCustomerAuthConfigured } from '@/lib/customer-auth';
import { consumeLoginToken } from '@/lib/customers';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!isCustomerAuthConfigured() || !isDatabaseConfigured() || !token) {
    return Response.redirect(new URL('/konto/login?error=1', url.origin));
  }

  await ensureSchema();
  const customerId = await consumeLoginToken(token);
  if (!customerId) {
    return Response.redirect(new URL('/konto/login?error=1', url.origin));
  }

  const sessionToken = createCustomerSessionToken(customerId);
  const response = Response.redirect(new URL('/konto', url.origin));
  response.headers.append(
    'Set-Cookie',
    `${CUSTOMER_SESSION_COOKIE}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`,
  );
  return response;
}
