/**
 * lib/cors.js — CORS заголовки для serverless функций Vercel
 */

const ALLOWED_ORIGINS = (process.env.FRONTEND_URL || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

export function setCors(req, res) {
  const origin = req.headers.origin || ''
  const allowed =
    ALLOWED_ORIGINS.length === 0 ||
    ALLOWED_ORIGINS.includes(origin) ||
    origin.endsWith('.vercel.app')

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', allowed ? (origin || '*') : ALLOWED_ORIGINS[0] || '*')
}

export function handlePreflight(req, res) {
  if (req.method === 'OPTIONS') {
    setCors(req, res)
    res.status(204).end()
    return true
  }
  return false
}
