import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './jwt';

export function withAuth(handler: (req: NextRequest, user: { id: number }) => Promise<NextResponse>, roles?: string[]) {
  return async (req: NextRequest) => {
    const cookieName = process.env.COOKIE_NAME || 'airbnb_token';
    const token = cookies().get(cookieName)?.value;
    if (!token) {
      return NextResponse.json({ ok: false, error: { code: 'UNAUTHORIZED', message: 'No token' } }, { status: 401 });
    }
    try {
      const payload = verifyJwt(token);
      return await handler(req, { id: payload.sub });
    } catch (err) {
      return NextResponse.json({ ok: false, error: { code: 'UNAUTHORIZED', message: 'Token invalido' } }, { status: 401 });
    }
  };
}
