import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { cacheControl } from '../middleware/cacheControl.js'
import { uploadTo } from '../middleware/upload.js'
import * as svc from '../services/media.service.js'
import { processImage, getUploadUrl } from '../utils/imageProcessor.js'

const router = Router()

router.get('/', cacheControl(60, 300), async (req, res) => {
  res.json(await svc.list(req.query))
})

router.get('/:id', cacheControl(60), async (req, res) => {
  const item = await svc.getById(req.params.id)
  if (!item) return res.status(404).json({ error: 'Media not found' })
  res.json(item)
})

router.post('/', authenticate, requireAdmin, uploadTo('photos').array('files', 50), async (req, res) => {
  const items = []
  for (const file of (req.files || [])) {
    const thumbPath = await processImage(file.path)
    const url = getUploadUrl('photos', file.filename)
    const thumbUrl = thumbPath ? url.replace(/\.[^.]+$/, '_thumb.webp') : null
    items.push(await svc.create({
      type: req.body?.type || 'photo',
      url,
      thumb: thumbUrl,
      caption: {},
      session_id: req.body?.session_id || null,
    }))
  }
  res.status(201).json(items)
})

router.patch('/:id', authenticate, requireAdmin, async (req, res) => {
  const item = await svc.update(req.params.id, req.body)
  if (!item) return res.status(404).json({ error: 'Media not found' })
  res.json(item)
})

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  await svc.remove(req.params.id)
  res.json({ ok: true })
})

export default router
