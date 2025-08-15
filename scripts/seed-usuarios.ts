
async function run() {
  const base = process.env.APP_BASE_URL || 'http://localhost:3000';
  await fetch(base + '/api/auth/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo: 'host@example.com', contrasena: 'password123', nombre: 'Host', apellido: 'Demo' })
  });
  await fetch(base + '/api/auth/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo: 'guest@example.com', contrasena: 'password123', nombre: 'Guest', apellido: 'Demo' })
  });
  console.log('Seed done');
}

run();
