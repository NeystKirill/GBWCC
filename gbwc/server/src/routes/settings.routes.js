import express from 'express'
import * as settingsService from '../services/settings.service.js'
import { authenticate } from '../middleware/auth.js'
import { requireAdmin } from '../middleware/requireAdmin.js'

const router = express.Router()

// Public: Get all settings (for frontend styling)
router.get('/', async (req, res, next) => {
  try {
    const data = await settingsService.listAll()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

// Admin: Get raw settings list for editing
router.get('/raw', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const data = await settingsService.listRaw()
    res.json(data)
  } catch (err) {
    next(err)
  }
})

// Admin: Update multiple settings
router.patch('/', authenticate, requireAdmin, async (req, res, next) => {
  try {
    await settingsService.updateMany(req.body)
    const updated = await settingsService.listAll()
    res.json(updated)
  } catch (err) {
    next(err)
  }
})

export default router
