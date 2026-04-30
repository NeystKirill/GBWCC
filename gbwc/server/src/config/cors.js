import { env } from './env.js'

export const corsOptions = {
  origin: env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
