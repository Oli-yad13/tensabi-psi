'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE = 'admin_session';

export async function login(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;
  const secret    = process.env.ADMIN_SECRET;

  if (!secret || username !== validUser || password !== validPass) {
    redirect('/admin/login?error=1');
  }

  const jar = await cookies();
  jar.set(COOKIE, secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  redirect('/admin');
}

export async function logout() {
  const jar = await cookies();
  jar.delete(COOKIE);
  redirect('/admin/login');
}
