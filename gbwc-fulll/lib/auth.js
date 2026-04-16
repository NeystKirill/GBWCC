/**
 * lib/auth.js — JWT утилиты
 */
import jwt from 'jsonwebtoken'

const ACCESS_TTL  = '15m'
const REFRESH_TTL = '30d'

export function signAccess(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL })
}

export function signRefresh(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: REFRESH_TTL })
}

export function verifyAccess(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export function verifyRefresh(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}

/**
 * Middleware: читает Bearer токен из заголовка Authorization
 * Возвращает { ok: false, status, message } или { ok: true, user }
 */
export function requireAuth(req) {
  const header = req.headers['authorization'] || ''
  const token  = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return { ok: false, status: 401, message: 'Необходима авторизация' }
  try {
    const user = verifyAccess(token)
    return { ok: true, user }
  } catch {
    return { ok: false, status: 401, message: 'Токен недействителен или истёк' }
  }
}
