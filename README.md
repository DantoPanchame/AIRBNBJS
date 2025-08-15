# Airbnb Clone (ES)

Repo de ejemplo con Next.js, Oracle y autenticación JWT.

## Configuración

1. Copia `.env.example` a `.env` y ajusta valores.
2. Instala dependencias: `npm install`.
3. Ejecuta en desarrollo: `npm run dev`.
4. Pruebas unitarias: `npm test`.
5. E2E (requiere server): `npm run e2e`.

## API Auth

- `POST /api/auth/registro`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`
