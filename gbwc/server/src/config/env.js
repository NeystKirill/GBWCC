import 'dotenv/config'

function required(name) {
  const val = process.env[name]
  if (!val) throw new Error(`ENV variable ${name} is required`)
  return val
}

export const env = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: required('DATABASE_URL'),
  JWT_ACCESS_SECRET: required('JWT_ACCESS_SECRET'),
  JWT_REFRESH_SECRET: required('JWT_REFRESH_SECRET'),
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@gbwc.network',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  UPLOADS_DIR: process.env.UPLOADS_DIR || '../uploads',
  BASE_URL: process.env.BASE_URL || 'http://localhost:4000',
}
