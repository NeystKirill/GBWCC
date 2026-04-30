import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export async function processImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase()
    if (['.svg', '.gif'].includes(ext)) return null

    const dir = path.dirname(filePath)
    const name = path.basename(filePath, ext)
    const thumbPath = path.join(dir, `${name}_thumb.webp`)

    await sharp(filePath)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(thumbPath)

    return thumbPath
  } catch (err) {
    console.error('Image processing error:', err.message)
    return null
  }
}

export function getUploadUrl(folder, filename) {
  return `/uploads/${folder}/${filename}`
}
