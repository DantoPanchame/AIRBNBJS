import { z } from 'zod';

export const UsuarioRegistroSchema = z.object({
  correo: z.string().email(),
  contrasena: z.string().min(8),
  nombre: z.string().min(1),
  apellido: z.string().min(1)
});

export const LoginSchema = z.object({
  correo: z.string().email(),
  contrasena: z.string().min(8)
});
