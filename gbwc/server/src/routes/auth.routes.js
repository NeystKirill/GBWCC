import { Router } from 'express'
import { loginLimiter } from '../middleware/rateLimit.js'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import * as authService from '../services/auth.service.js'
import { env } from '../config/env.js'

const router = Router()

const REFRESH_COOKIE_OPTS = {
  httpOnly: true,
  secure: false,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/api/auth',
}

// Login
router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

  const ip = req.ip || req.connection.remoteAddress
  const result = await authService.login(email, password, ip)

  if (env.NODE_ENV === 'production') REFRESH_COOKIE_OPTS.secure = true

  res.cookie('gbwc_rt', result.refreshToken, REFRESH_COOKIE_OPTS)
  res.json({
    user: result.user,
    tokens: { accessToken: result.accessToken, refreshToken: result.refreshToken },
  })
})

// Refresh
router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies?.gbwc_rt || req.body?.refreshToken
  const result = await authService.refresh(refreshToken)

  res.cookie('gbwc_rt', result.refreshToken, REFRESH_COOKIE_OPTS)
  res.json({ tokens: { accessToken: result.accessToken, refreshToken: result.refreshToken } })
})

// Logout
router.post('/logout', async (req, res) => {
  const refreshToken = req.cookies?.gbwc_rt || req.body?.refreshToken
  await authService.logout(refreshToken)
  res.clearCookie('gbwc_rt', { path: '/api/auth' })
  res.json({ ok: true })
})

// Me
router.get('/me', authenticate, async (req, res) => {
  const user = await authService.me(req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
})

// User management (superadmin)
router.get('/users', authenticate, requireAdmin, async (req, res) => {
  res.json(await authService.listUsers())
})

router.post('/users', authenticate, requireAdmin, async (req, res) => {
  const { email, password, role } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' })
  res.status(201).json(await authService.createUser(email, password, role))
})

router.patch('/users/:id', authenticate, requireAdmin, async (req, res) => {
  const user = await authService.updateUser(req.params.id, req.body)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
})

router.delete('/users/:id', authenticate, requireAdmin, async (req, res) => {
  await authService.deleteUser(req.params.id)
  res.json({ ok: true })
})

export default router
