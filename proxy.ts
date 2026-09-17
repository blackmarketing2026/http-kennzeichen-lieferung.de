import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth';
import { CUSTOMER_SESSION_COOKIE, verifyCustomerSessionToken } from '@/lib/customer-auth';

const CUSTOMER_PUBLIC_PATHS = new Set(['/konto/login', '/api/konto/login', '/api/konto/verify']);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/konto') || pathname.startsWith('/api/konto')) {
    if (CUSTOMER_PUBLIC_PATHS.has(pathname)) return NextResponse.next();
    const token = request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value;
    if (!verifyCustomerSessionToken(token)) {
      return NextResponse.redirect(new URL('/konto/login', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/admin/login' || pathname === '/api/admin/login') return NextResponse.next();

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/konto/:path*', '/api/konto/:path*'],
};
