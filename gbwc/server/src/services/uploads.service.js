import Upload from '../models/Upload.js'
import { getPagination, paginationMeta } from '../utils/paginate.js'
import fs from 'fs'
import path from 'path'
import { env } from '../config/env.js'

export async function list(query) {
  const { page, limit, offset } = getPagination(query)
  const filter = {}

  if (query.folder) filter.folder = query.folder

  const total = await Upload.countDocuments(filter)
  const items = await Upload.find(filter)
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(offset)

  return { items, pagination: paginationMeta(total, page, limit) }
}

export async function create(file, userId, folder = 'images') {
  const url = `/uploads/${folder}/${file.filename}`
  return await Upload.create({
    filename: file.filename,
    original_name: file.originalname,
    mime_type: file.mimetype,
    size: file.size,
    url,
    folder,
    uploaded_by: userId
  })
}

export async function remove(id) {
  const upload = await Upload.findById(id)
  if (upload) {
    const filePath = path.join(env.UPLOADS_DIR, upload.folder, upload.filename)
    try { fs.unlinkSync(filePath) } catch {}
    // Also try to delete thumb
    const thumbPath = filePath.replace(/\.[^.]+$/, '_thumb.webp')
    try { fs.unlinkSync(thumbPath) } catch {}
    await Upload.findByIdAndDelete(id)
  }
}

