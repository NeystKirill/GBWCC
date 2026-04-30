import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { cacheControl } from '../middleware/cacheControl.js'
import * as svc from '../services/pages.service.js'

const router = Router()

router.get('/', authenticate, requireAdmin, async (req, res) => {
  res.json(await svc.listAll())
})

router.get('/:key(*)', cacheControl(5, 30), async (req, res) => {
  const item = await svc.getByKey(req.params.key)
  if (!item) return res.status(404).json({ error: 'Page not found' })
  res.json(item)
})

router.post('/', authenticate, requireAdmin, async (req, res) => {
  const { key, content } = req.body
  if (!key) return res.status(400).json({ error: 'Key is required' })
  res.json(await svc.upsert(key, content || {}))
})

export default router
