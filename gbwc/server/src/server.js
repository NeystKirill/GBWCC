import app from './app.js'
import { env } from './config/env.js'
import { connectDB } from './config/db.js'
import fs from 'fs'
import path from 'path'

// Ensure upload directories exist
const uploadDirs = ['images', 'logos', 'photos', 'covers', 'gallery']
for (const dir of uploadDirs) {
  fs.mkdirSync(path.join(env.UPLOADS_DIR, dir), { recursive: true })
}

import User from './models/User.js'
import bcrypt from 'bcryptjs'

// Connect to Database and start server
const startServer = async () => {
  await connectDB()

  // Auto-seed Admin User
  const adminEmail = env.ADMIN_EMAIL || 'admin@gbwc.network'
  const adminPassword = env.ADMIN_PASSWORD || 'Admin123!'
  const existingAdmin = await User.findOne({ email: adminEmail })
  if (!existingAdmin) {
    const hash = await bcrypt.hash(adminPassword, 12)
    await User.create({ email: adminEmail, password: hash, role: 'admin' })
    console.log(`✅ Auto-seeded Default Admin: ${adminEmail}`)
  }

  app.listen(env.PORT, () => {
    console.log(`🚀 GBWC Server running on http://localhost:${env.PORT}`)
    console.log(`📦 Environment: ${env.NODE_ENV}`)
  })
}

startServer()

