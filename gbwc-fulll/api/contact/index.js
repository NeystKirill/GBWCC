/**
 * api/contact/index.js
 *
 * POST   /api/contact          — принять заявку (публично)
 * GET    /api/contact          — список заявок (только admin)
 */
import getDb  from '../../lib/db.js'
import { sendContactNotification, sendContactAutoReply } from '../../lib/mailer.js'
import { requireAuth } from '../../lib/auth.js'
import { setCors, handlePreflight } from '../../lib/cors.js'

export default async function handler(req, res) {
  setCors(req, res)
  if (handlePreflight(req, res)) return

  const sql = getDb()

  // ── POST /api/contact ─────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { name, email, company, organization, subject, message } = req.body || {}
    const org = company || organization || ''

    // Валидация
    const errors = []
    if (!name?.trim())    errors.push('name')
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email')
    if (!subject?.trim()) errors.push('subject')
    if (!message?.trim()) errors.push('message')

    if (errors.length) {
      return res.status(400).json({ error: 'Заполните обязательные поля', fields: errors })
    }

    // Простая защита от спама — не более 3 заявок с одного email за час
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || ''
    const recent = await sql`
      SELECT COUNT(*) AS cnt FROM contacts
      WHERE email = ${email.toLowerCase().trim()}
        AND created_at > NOW() - INTERVAL '1 hour'
    `
    if (Number(recent[0].cnt) >= 3) {
      return res.status(429).json({ error: 'Слишком много заявок. Попробуйте позже.' })
    }

    // Сохраняем в БД
    const [row] = await sql`
      INSERT INTO contacts (name, email, company, subject, message, ip)
      VALUES (
        ${name.trim()},
        ${email.toLowerCase().trim()},
        ${org.trim() || null},
        ${subject.trim()},
        ${message.trim()},
        ${ip}
      )
      RETURNING id, created_at
    `

    // Отправляем email (не блокируем ответ при ошибке)
    const mailData = {
      name:    name.trim(),
      email:   email.trim(),
      company: org.trim(),
      subject: subject.trim(),
      message: message.trim(),
    }

    try {
      await Promise.all([
        sendContactNotification(mailData),
        sendContactAutoReply(mailData),
      ])
    } catch (mailErr) {
      // Письмо не ушло — логируем, но заявка уже сохранена в БД
      console.error('[mailer] Ошибка отправки:', mailErr.message)
    }

    return res.status(201).json({
      ok: true,
      id: row.id,
      message: 'Заявка принята',
    })
  }

  // ── GET /api/contact ──────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const auth = requireAuth(req)
    if (!auth.ok) return res.status(auth.status).json({ error: auth.message })

    const { status, page = '1', limit = '20', search = '' } = req.query
    const pageNum  = Math.max(1, parseInt(page))
    const limitNum = Math.min(100, Math.max(1, parseInt(limit)))
    const offset   = (pageNum - 1) * limitNum

    let rows, countRows

    if (status && status !== 'all') {
      if (search) {
        rows = await sql`
          SELECT * FROM contacts
          WHERE status = ${status}
            AND (name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'} OR subject ILIKE ${'%' + search + '%'})
          ORDER BY created_at DESC LIMIT ${limitNum} OFFSET ${offset}
        `
        countRows = await sql`
          SELECT COUNT(*) AS total FROM contacts
          WHERE status = ${status}
            AND (name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'} OR subject ILIKE ${'%' + search + '%'})
        `
      } else {
        rows = await sql`
          SELECT * FROM contacts WHERE status = ${status}
          ORDER BY created_at DESC LIMIT ${limitNum} OFFSET ${offset}
        `
        countRows = await sql`SELECT COUNT(*) AS total FROM contacts WHERE status = ${status}`
      }
    } else {
      if (search) {
        rows = await sql`
          SELECT * FROM contacts
          WHERE name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'} OR subject ILIKE ${'%' + search + '%'}
          ORDER BY created_at DESC LIMIT ${limitNum} OFFSET ${offset}
        `
        countRows = await sql`
          SELECT COUNT(*) AS total FROM contacts
          WHERE name ILIKE ${'%' + search + '%'} OR email ILIKE ${'%' + search + '%'} OR subject ILIKE ${'%' + search + '%'}
        `
      } else {
        rows      = await sql`SELECT * FROM contacts ORDER BY created_at DESC LIMIT ${limitNum} OFFSET ${offset}`
        countRows = await sql`SELECT COUNT(*) AS total FROM contacts`
      }
    }

    const total = Number(countRows[0].total)

    // Статистика по статусам
    const stats = await sql`
      SELECT status, COUNT(*) AS cnt FROM contacts GROUP BY status
    `
    const statMap = { new: 0, inprogress: 0, done: 0 }
    stats.forEach(s => { statMap[s.status] = Number(s.cnt) })

    return res.status(200).json({
      items: rows,
      pagination: { page: pageNum, limit: limitNum, total, pages: Math.ceil(total / limitNum) },
      stats: statMap,
    })
  }

  res.status(405).json({ error: 'Метод не поддерживается' })
}
