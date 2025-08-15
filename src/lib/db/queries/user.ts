import { withConn } from '../oracle';

export interface Usuario {
  id: number;
  correo: string;
  hash_contrasena: string;
  nombre: string;
  apellido: string;
}

export async function findUsuarioPorCorreo(correo: string): Promise<Usuario | null> {
  return withConn(async conn => {
    const res = await conn.execute<any>(
      `SELECT id, correo, hash_contrasena, nombre, apellido FROM usuario WHERE correo = :correo AND fecha_eliminacion IS NULL`,
      { correo },
      { outFormat: undefined }
    );
    return res.rows?.[0] as Usuario | null;
  });
}

export async function insertarUsuario(data: { correo: string; hash: string; nombre: string; apellido: string }): Promise<number> {
  return withConn(async conn => {
    const res = await conn.execute(
      `INSERT INTO usuario (correo, hash_contrasena, nombre, apellido) VALUES (:correo, :hash, :nombre, :apellido) RETURNING id INTO :id`,
      { correo: data.correo, hash: data.hash, nombre: data.nombre, apellido: data.apellido, id: { dir: (conn as any).BIND_OUT, type: (conn as any).NUMBER } }
    );
    // Oracle driver returns outBinds differently
    const id = (res.outBinds as any).id[0];
    await conn.commit();
    return id;
  });
}

export async function findUsuarioPorId(id: number): Promise<Usuario | null> {
  return withConn(async conn => {
    const res = await conn.execute<any>(
      `SELECT id, correo, hash_contrasena, nombre, apellido FROM usuario WHERE id = :id`,
      { id },
      { outFormat: undefined }
    );
    return res.rows?.[0] as Usuario | null;
  });
}
