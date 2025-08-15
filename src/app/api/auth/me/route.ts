import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth/guards';
import { findUsuarioPorId } from '@/lib/db/queries/user';

export const GET = withAuth(async (_req: NextRequest, user) => {
  const u = await findUsuarioPorId(user.id);
  if (!u) {
    return NextResponse.json({ ok: false, error: { code: 'NOT_FOUND', message: 'Usuario no encontrado' } }, { status: 404 });
  }
  return NextResponse.json({ ok: true, data: { id: u.id, correo: u.correo, nombre: u.nombre, apellido: u.apellido } });
});
