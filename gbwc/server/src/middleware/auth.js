import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function authenticate(req, res, next) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    const token = header.split(' ')[1]
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
