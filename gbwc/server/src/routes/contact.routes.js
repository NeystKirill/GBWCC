import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { apiLimiter } from '../middleware/rateLimit.js'
import * as svc from '../services/contact.service.js'

const router = Router()

// Public: submit contact form
router.post('/', apiLimiter, async (req, res) => {
  const { name, email, company, subject, message } = req.body
  if (!name || !email) return res.status(400).json({ error: 'Name and email are required' })
  res.status(201).json(await svc.create({ name, email, company, subject, message }))
})

// Admin: list submissions
router.get('/', authenticate, requireAdmin, async (req, res) => {
  res.json(await svc.list(req.query))
})

// Admin: get single
router.get('/:id', authenticate, requireAdmin, async (req, res) => {
  const item = await svc.getById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Submission not found' })
  res.json(item)
})

// Admin: update status
router.patch('/:id/status', authenticate, requireAdmin, async (req, res) => {
  const { status } = req.body
  if (!status) return res.status(400).json({ error: 'Status is required' })
  const item = await svc.updateStatus(req.params.id, status)
  if (!item) return res.status(404).json({ error: 'Submission not found' })
  res.json(item)
})

// Admin: update (backwards compat with existing admin)
router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  const { status } = req.body
  if (status) {
    const item = await svc.updateStatus(req.params.id, status)
    if (!item) return res.status(404).json({ error: 'Submission not found' })
    return res.json(item)
  }
  res.status(400).json({ error: 'Nothing to update' })
})

// Admin: delete
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  await svc.remove(req.params.id)
  res.json({ ok: true })
})

export default router
