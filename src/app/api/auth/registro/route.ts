import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { UsuarioRegistroSchema } from '@/lib/validation/schemas';
import { findUsuarioPorCorreo, insertarUsuario } from '@/lib/db/queries/user';
import { signJwt } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = UsuarioRegistroSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: { code: 'VALIDATION_ERROR', message: parsed.error.message } }, { status: 400 });
  }
  const { correo, contrasena, nombre, apellido } = parsed.data;
  const existing = await findUsuarioPorCorreo(correo);
  if (existing) {
    return NextResponse.json({ ok: false, error: { code: 'EMAIL_EXISTS', message: 'Correo ya registrado' } }, { status: 400 });
  }
  const hash = await bcrypt.hash(contrasena, 10);
  const id = await insertarUsuario({ correo, hash, nombre, apellido });
  const token = signJwt({ sub: id });
  const cookieName = process.env.COOKIE_NAME || 'airbnb_token';
  const response = NextResponse.json({ ok: true, data: { id, correo } });
  response.cookies.set(cookieName, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.COOKIE_SECURE === 'true',
    path: '/',
  });
  return response;
}
