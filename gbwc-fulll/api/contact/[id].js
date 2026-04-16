/**
 * api/contact/[id].js
 *
 * GET    /api/contact/:id         — детали заявки
 * PATCH  /api/contact/:id/status  — смена статуса
 * DELETE /api/contact/:id         — удаление
 *
 * Все методы требуют авторизации.
 */
import getDb  from '../../lib/db.js'
import { requireAuth } from '../../lib/auth.js'
import { setCors, handlePreflight } from '../../lib/cors.js'

const VALID_STATUSES = ['new', 'inprogress', 'done']

export default async function handler(req, res) {
  setCors(req, res)
  if (handlePreflight(req, res)) return

  const auth = requireAuth(req)
  if (!auth.ok) return res.status(auth.status).json({ error: auth.message })

  const sql = getDb()
  const id  = parseInt(req.query.id)
  if (isNaN(id)) return res.status(400).json({ error: 'Некорректный ID' })

  // ── GET /api/contact/:id ─────────────────────────────────────────────────
  if (req.method === 'GET') {
    const [row] = await sql`SELECT * FROM contacts WHERE id = ${id}`
    if (!row) return res.status(404).json({ error: 'Заявка не найдена' })
    return res.status(200).json(row)
  }

  // ── PATCH /api/contact/:id — обновление статуса ──────────────────────────
  if (req.method === 'PATCH') {
    const { status } = req.body || {}
    if (!status || !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Допустимые статусы: ${VALID_STATUSES.join(', ')}`,
      })
    }
    const [updated] = await sql`
      UPDATE contacts
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    if (!updated) return res.status(404).json({ error: 'Заявка не найдена' })
    return res.status(200).json(updated)
  }

  // ── DELETE /api/contact/:id ───────────────────────────────────────────────
  if (req.method === 'DELETE') {
    const [deleted] = await sql`
      DELETE FROM contacts WHERE id = ${id} RETURNING id
    `
    if (!deleted) return res.status(404).json({ error: 'Заявка не найдена' })
    return res.status(200).json({ ok: true, id: deleted.id })
  }

  res.status(405).json({ error: 'Метод не поддерживается' })
}
