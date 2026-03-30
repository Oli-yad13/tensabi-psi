import { NextRequest, NextResponse } from 'next/server';

const COOKIE = 'admin_session';

function isSecureCookie() {
  const override = process.env.ADMIN_COOKIE_SECURE;
  if (override === 'true') return true;
  if (override === 'false') return false;
  return process.env.NODE_ENV === 'production';
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = String(formData.get('username') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '').trim();

  const validUser = String(process.env.ADMIN_USERNAME ?? '').trim().toLowerCase();
  const validPass = String(process.env.ADMIN_PASSWORD ?? '').trim();
  const secret = process.env.ADMIN_SECRET;

  if (!secret || username !== validUser || password !== validPass) {
    return NextResponse.redirect(new URL('/admin/login?error=1', request.url), { status: 303 });
  }

  const response = NextResponse.redirect(new URL('/admin', request.url), { status: 303 });
  response.cookies.set(COOKIE, secret, {
    httpOnly: true,
    secure: isSecureCookie(),
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });

  return response;
}
