import { NextResponse } from 'next/server';

export async function POST() {
  const cookieName = process.env.COOKIE_NAME || 'airbnb_token';
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, '', { httpOnly: true, expires: new Date(0), path: '/' });
  return res;
}
