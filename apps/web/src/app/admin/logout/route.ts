import { NextResponse } from 'next/server';

const COOKIE = 'admin_session';

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL('/admin/login', request.url), { status: 303 });
  response.cookies.delete(COOKIE);
  return response;
}
