/**
 * api/auth/[action].js
 *
 * POST /api/auth/login    — вход
 * POST /api/auth/refresh  — обновление токенов
 * POST /api/auth/logout   — выход (клиентский)
 * GET  /api/auth/me       — текущий пользователь
 */
import getDb from '../../lib/db.js'
import bcrypt from 'bcryptjs'
import { signAccess, signRefresh, verifyRefresh, requireAuth } from '../../lib/auth.js'
import { setCors, handlePreflight } from '../../lib/cors.js'

export default async function handler(req, res) {
  setCors(req, res)
  if (handlePreflight(req, res)) return

  const sql    = getDb()
  const action = req.query.action

  // ── POST /api/auth/login ──────────────────────────────────────────────────
  if (action === 'login' && req.method === 'POST') {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'Введите email и пароль' })
    }

    const [user] = await sql`
      SELECT * FROM users WHERE email = ${email.toLowerCase().trim()}
    `
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(401).json({ error: 'Неверный email или пароль' })
    }

    const payload      = { id: user.id, email: user.email, role: user.role }
    const accessToken  = signAccess(payload)
    const refreshToken = signRefresh({ id: user.id })

    return res.status(200).json({
      user:   { id: user.id, email: user.email, role: user.role },
      tokens: { accessToken, refreshToken },
    })
  }

  // ── POST /api/auth/refresh ────────────────────────────────────────────────
  if (action === 'refresh' && req.method === 'POST') {
    const { refreshToken } = req.body || {}
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token отсутствует' })

    let payload
    try {
      payload = verifyRefresh(refreshToken)
    } catch {
      return res.status(401).json({ error: 'Refresh token недействителен' })
    }

    const [user] = await sql`SELECT * FROM users WHERE id = ${payload.id}`
    if (!user) return res.status(401).json({ error: 'Пользователь не найден' })

    const newPayload      = { id: user.id, email: user.email, role: user.role }
    const newAccessToken  = signAccess(newPayload)
    const newRefreshToken = signRefresh({ id: user.id })

    return res.status(200).json({
      tokens: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    })
  }

  // ── GET /api/auth/me ──────────────────────────────────────────────────────
  if (action === 'me' && req.method === 'GET') {
    const auth = requireAuth(req)
    if (!auth.ok) return res.status(auth.status).json({ error: auth.message })

    const [user] = await sql`
      SELECT id, email, role, created_at FROM users WHERE id = ${auth.user.id}
    `
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' })
    return res.status(200).json(user)
  }

  // ── POST /api/auth/logout (клиентский — токен очищается на фронте) ────────
  if (action === 'logout' && req.method === 'POST') {
    return res.status(200).json({ ok: true })
  }

  res.status(404).json({ error: 'Не найдено' })
}
