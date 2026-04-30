import { Router } from 'express'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/requireAdmin.js'
import { upload } from '../middleware/upload.js'
import * as svc from '../services/uploads.service.js'
import { processImage } from '../utils/imageProcessor.js'

const router = Router()

router.get('/', authenticate, requireAdmin, async (req, res) => {
  res.json(await svc.list(req.query))
})

router.post('/', authenticate, requireAdmin, upload.array('files', 20), async (req, res) => {
  const folder = req.query?.folder || 'images'
  const results = []
  for (const file of (req.files || [])) {
    await processImage(file.path)
    results.push(await svc.create(file, req.user.id, folder))
  }
  res.status(201).json(results)
})

// Single file upload — pass folder as query param: POST /api/uploads/single?folder=media
router.post('/single', authenticate, requireAdmin, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  const folder = req.query?.folder || 'images'
  await processImage(req.file.path)
  const result = await svc.create(req.file, req.user.id, folder)
  res.status(201).json(result)
})

router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  await svc.remove(req.params.id)
  res.json({ ok: true })
})

export default router
