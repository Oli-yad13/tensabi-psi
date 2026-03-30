import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'am', 'om'] as const;
const ADMIN_COOKIE = 'admin_session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminAuthRoute =
    pathname === '/admin/login' ||
    pathname.startsWith('/admin/login/') ||
    pathname === '/admin/logout';

  // ── Admin auth guard ──────────────────────────────────────────────────
  if (pathname.startsWith('/admin') && !isAdminAuthRoute) {
    const session = request.cookies.get(ADMIN_COOKIE)?.value;
    const secret  = process.env.ADMIN_SECRET;

    if (!secret || session !== secret) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ── Locale cookie ─────────────────────────────────────────────────────
  const response = NextResponse.next();
  const locale = request.cookies.get('NEXT_LOCALE')?.value;
  if (!locale || !LOCALES.includes(locale as (typeof LOCALES)[number])) {
    response.cookies.set('NEXT_LOCALE', 'en', { path: '/' });
  }
  return response;
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
