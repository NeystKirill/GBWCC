import rateLimit from 'express-rate-limit'

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts', code: 'RATE_LIMITED' },
  standardHeaders: true,
  legacyHeaders: false,
})

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests', code: 'RATE_LIMITED' },
  standardHeaders: true,
  legacyHeaders: false,
})
