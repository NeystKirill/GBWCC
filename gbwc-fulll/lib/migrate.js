/**
 * lib/migrate.js
 * Запуск: node lib/migrate.js
 * Создаёт таблицы и первого admin-пользователя из .env
 */
import { neon } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const sql = neon(process.env.DATABASE_URL)

async function migrate() {
  console.log('🔧 Запуск миграции...')

  // ── Таблица пользователей (для доступа к админке) ──────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id         SERIAL PRIMARY KEY,
      email      TEXT UNIQUE NOT NULL,
      password   TEXT NOT NULL,
      role       TEXT NOT NULL DEFAULT 'admin',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // ── Таблица заявок с контактной формы ─────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id           SERIAL PRIMARY KEY,
      name         TEXT NOT NULL,
      email        TEXT NOT NULL,
      company      TEXT,
      subject      TEXT NOT NULL,
      message      TEXT NOT NULL,
      status       TEXT NOT NULL DEFAULT 'new',
      ip           TEXT,
      created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  // ── Индекс для быстрой сортировки ─────────────────────────────────────────
  await sql`
    CREATE INDEX IF NOT EXISTS contacts_created_idx ON contacts (created_at DESC)
  `
  await sql`
    CREATE INDEX IF NOT EXISTS contacts_status_idx ON contacts (status)
  `

  // ── Первый admin-пользователь ──────────────────────────────────────────────
  const email    = process.env.ADMIN_EMAIL    || 'admin@gbwc.network'
  const password = process.env.ADMIN_PASSWORD || 'ChangeMe123!'

  const existing = await sql`SELECT id FROM users WHERE email = ${email}`
  if (existing.length === 0) {
    const hash = await bcrypt.hash(password, 12)
    await sql`
      INSERT INTO users (email, password, role)
      VALUES (${email}, ${hash}, 'admin')
    `
    console.log(`✅ Admin создан: ${email}`)
  } else {
    console.log(`ℹ️  Admin уже существует: ${email}`)
  }

  console.log('✅ Миграция завершена')
  process.exit(0)
}

migrate().catch(err => {
  console.error('❌ Ошибка миграции:', err)
  process.exit(1)
})
