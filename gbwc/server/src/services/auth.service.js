import User from '../models/User.js'
import LoginAttempt from '../models/LoginAttempt.js'
import RefreshToken from '../models/RefreshToken.js'
import { env } from '../config/env.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const ACCESS_TTL = '15m'
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000

function signAccess(user) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TTL })
}

function signRefresh(user) {
  return jwt.sign({ id: user.id }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

export async function login(email, password, ip) {
  // Check brute force
  const attempt = await LoginAttempt.findOne({ ip })
  if (attempt?.locked_until && attempt.locked_until > new Date()) {
    const mins = Math.ceil((attempt.locked_until - new Date()) / 60000)
    const err = new Error(`Too many attempts. Try again in ${mins} minutes`)
    err.status = 429
    throw err
  }

  const user = await User.findOne({ email })
  if (user && user.active === false) {
    const err = new Error('User account is disabled')
    err.status = 403
    throw err
  }

  if (!user || !(await bcrypt.compare(password, user?.password || ''))) {
    // Increment attempts
    const newAttempts = (attempt?.attempts || 0) + 1
    const lockedUntil = newAttempts >= 5 ? new Date(Date.now() + 15 * 60000) : null
    
    await LoginAttempt.findOneAndUpdate(
      { ip },
      { 
        $inc: { attempts: 1 }, 
        last_attempt: new Date(),
        locked_until: lockedUntil
      },
      { upsert: true }
    )

    const err = new Error('Invalid email or password')
    err.status = 401
    throw err
  }

  // Reset attempts
  await LoginAttempt.deleteOne({ ip })

  const accessToken = signAccess(user)
  const refreshToken = signRefresh(user)

  // Store refresh token hash
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
  await RefreshToken.create({
    user_id: user.id,
    token_hash: tokenHash,
    expires_at: new Date(Date.now() + REFRESH_TTL_MS)
  })

  return {
    user: { id: user.id, email: user.email, role: user.role },
    accessToken,
    refreshToken,
  }
}

export async function refresh(refreshToken) {
  if (!refreshToken) {
    const err = new Error('No refresh token')
    err.status = 401
    throw err
  }

  let payload
  try {
    payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET)
  } catch {
    const err = new Error('Invalid refresh token')
    err.status = 401
    throw err
  }

  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
  const stored = await RefreshToken.findOne({ token_hash: tokenHash, expires_at: { $gt: new Date() } })

  if (!stored) {
    const err = new Error('Refresh token expired or revoked')
    err.status = 401
    throw err
  }

  // Delete old token
  await RefreshToken.deleteOne({ token_hash: tokenHash })

  const user = await User.findOne({ _id: payload.id })
  if (!user || user.active === false) {
    const err = new Error('User not found or disabled')
    err.status = 401
    throw err
  }

  const accessToken = signAccess(user)
  const refreshTokenNew = signRefresh(user)

  const newHash = crypto.createHash('sha256').update(refreshTokenNew).digest('hex')
  await RefreshToken.create({
    user_id: user.id,
    token_hash: newHash,
    expires_at: new Date(Date.now() + REFRESH_TTL_MS)
  })

  return { accessToken, refreshToken: refreshTokenNew }
}

export async function logout(refreshToken) {
  if (!refreshToken) return
  const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
  await RefreshToken.deleteOne({ token_hash: tokenHash })
}

export async function me(userId) {
  return await User.findById(userId).select('email role created_at')
}

export async function listUsers() {
  return await User.find().select('email role active created_at').sort({ _id: 1 })
}

export async function createUser(email, password, role = 'admin') {
  const hash = await bcrypt.hash(password, 12)
  return await User.create({ email, password: hash, role })
}

export async function updateUser(id, data) {
  const updateData = { ...data }
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password, 12)
  }
  return await User.findByIdAndUpdate(id, updateData, { new: true })
}

export async function deleteUser(id) {
  await User.findByIdAndDelete(id)
}

