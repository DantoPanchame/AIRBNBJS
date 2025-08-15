import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

let pool: oracledb.Pool;

export async function initPool() {
  if (pool) return pool;
  pool = await oracledb.createPool({
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING,
    poolMin: Number(process.env.ORACLE_POOL_MIN || 1),
    poolMax: Number(process.env.ORACLE_POOL_MAX || 5),
    poolTimeout: Number(process.env.ORACLE_POOL_TIMEOUT || 60)
  });
  return pool;
}

export async function closePool() {
  if (pool) {
    await pool.close(0);
    pool = undefined as any;
  }
}

export async function withConn<T>(fn: (conn: oracledb.Connection) => Promise<T>): Promise<T> {
  const p = pool || (await initPool());
  const conn = await p.getConnection();
  try {
    return await fn(conn);
  } finally {
    try { await conn.close(); } catch (err) { console.error('Error closing conn', err); }
  }
}
