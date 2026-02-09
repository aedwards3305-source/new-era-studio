import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'nes-admin-session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes (except the login page and auth API)
  if (pathname === '/admin/login' || pathname === '/api/admin/auth') {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    // Redirect to login for page requests, return 401 for API requests
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.ADMIN_PASSWORD || 'dev-password-change-me'
    );
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    // Invalid or expired token
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
