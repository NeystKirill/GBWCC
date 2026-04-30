import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { cacheControl } from '../middleware/cacheControl.js'
import { uploadTo } from '../middleware/upload.js'
import * as svc from '../services/sessions.service.js'
import { processImage, getUploadUrl } from '../utils/imageProcessor.js'

const router = Router()

router.get('/', cacheControl(60, 300), async (req, res) => {
  res.json(await svc.list(req.query))
})

router.get('/:id', cacheControl(60), async (req, res) => {
  const item = await svc.getById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Session not found' })
  res.json(item)
})

router.get('/slug/:slug', cacheControl(60), async (req, res) => {
  const item = await svc.getBySlug(req.params.slug)
  if (!item) return res.status(404).json({ error: 'Session not found' })
  res.json(item)
})

router.post('/', authenticate, requireAdmin, async (req, res) => {
  res.status(201).json(await svc.create(req.body))
})

router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  const item = await svc.update(req.params.id, req.body)
  if (!item) return res.status(404).json({ error: 'Session not found' })
  res.json(item)
})

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  await svc.remove(req.params.id)
  res.json({ ok: true })
})

router.post('/:id/gallery', authenticate, requireAdmin, uploadTo('sessions').array('files', 20), async (req, res) => {
  const session = await svc.getById(req.params.id)
  if (!session) return res.status(404).json({ error: 'Session not found' })

  const localPhotos = Array.isArray(session.localPhotos) ? session.localPhotos : []
  for (const file of req.files) {
    await processImage(file.path)
    localPhotos.push(getUploadUrl('sessions', file.filename))
  }

  const updated = await svc.update(req.params.id, { localPhotos })
  res.json(updated)
})

export default router
