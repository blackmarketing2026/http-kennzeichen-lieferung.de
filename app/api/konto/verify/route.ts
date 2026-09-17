import { NextResponse } from 'next/server';
import { ensureSchema, isDatabaseConfigured } from '@/lib/db';
import { CUSTOMER_SESSION_COOKIE, createCustomerSessionToken, isCustomerAuthConfigured } from '@/lib/customer-auth';
import { consumeLoginToken } from '@/lib/customers';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!isCustomerAuthConfigured() || !isDatabaseConfigured() || !token) {
    return NextResponse.redirect(new URL('/konto/login?error=1', url.origin));
  }

  await ensureSchema();
  const customerId = await consumeLoginToken(token);
  if (!customerId) {
    return NextResponse.redirect(new URL('/konto/login?error=1', url.origin));
  }

  const sessionToken = createCustomerSessionToken(customerId);
  const response = NextResponse.redirect(new URL('/konto', url.origin));
  response.cookies.set(CUSTOMER_SESSION_COOKIE, sessionToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 2592000,
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
