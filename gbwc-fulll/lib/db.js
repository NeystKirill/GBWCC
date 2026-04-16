/**
 * lib/db.js — Neon PostgreSQL клиент (serverless-совместимый)
 */
import { neon } from '@neondatabase/serverless'

let _sql = null

export function getDb() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL не задан в переменных окружения')
    }
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}

export default getDb
