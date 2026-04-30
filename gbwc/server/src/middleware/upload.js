import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { v4 as uuid } from 'uuid'
import { env } from '../config/env.js'

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) cb(null, true)
  else cb(new Error('Invalid file type'))
}

const makeFilename = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase()
  cb(null, `${uuid()}${ext}`)
}

export function uploadTo(folder) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(env.UPLOADS_DIR, folder)
      fs.mkdirSync(dir, { recursive: true })
      cb(null, dir)
    },
    filename: makeFilename,
  })
  return multer({ storage, limits: { fileSize: 10 * 1024 * 1024 }, fileFilter })
}

// Dynamic folder via req.query.folder (set before multipart parsing starts)
const dynamicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.query?.folder || 'images'
    const dir = path.join(env.UPLOADS_DIR, folder)
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: makeFilename,
})

export const upload = multer({
  storage: dynamicStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
})
