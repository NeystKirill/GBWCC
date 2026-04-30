import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { cacheControl } from '../middleware/cacheControl.js'
import { uploadTo } from '../middleware/upload.js'
import * as svc from '../services/partners.service.js'
import { processImage, getUploadUrl } from '../utils/imageProcessor.js'

const router = Router()

router.get('/', cacheControl(5, 10), async (req, res) => {
  res.json(await svc.list(req.query))
})

router.get('/:id', cacheControl(60), async (req, res) => {
  const item = await svc.getById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Partner not found' })
  res.json(item)
})

router.post('/', authenticate, requireAdmin, async (req, res) => {
  res.status(201).json(await svc.create(req.body))
})

router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  const item = await svc.update(req.params.id, req.body)
  if (!item) return res.status(404).json({ error: 'Partner not found' })
  res.json(item)
})

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  await svc.remove(req.params.id)
  res.json({ ok: true })
})

router.post('/:id/logo', authenticate, requireAdmin, uploadTo('logos').single('logo'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  await processImage(req.file.path)
  const url = getUploadUrl('logos', req.file.filename)
  const item = await svc.update(req.params.id, { logo_url: url })
  res.json(item)
})

export default router
