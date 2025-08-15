import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { LoginSchema } from '@/lib/validation/schemas';
import { findUsuarioPorCorreo } from '@/lib/db/queries/user';
import { signJwt } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = LoginSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.message } }, { status: 400 });
  }
  const { correo, contrasena } = parsed.data;
  const user = await findUsuarioPorCorreo(correo);
  if (!user) {
    return NextResponse.json({ ok: false, error: { code: 'INVALID_CREDENTIALS', message: 'Credenciales invalidas' } }, { status: 401 });
  }
  const match = await bcrypt.compare(contrasena, user.hash_contrasena);
  if (!match) {
    return NextResponse.json({ ok: false, error: { code: 'INVALID_CREDENTIALS', message: 'Credenciales invalidas' } }, { status: 401 });
  }
  const token = signJwt({ sub: user.id });
  const cookieName = process.env.COOKIE_NAME || 'airbnb_token';
  const response = NextResponse.json({ ok: true, data: { id: user.id, correo: user.correo } });
  response.cookies.set(cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    path: '/',
  });
  return response;
}
