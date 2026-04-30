import fs from 'fs/promises'
import path from 'path'

export const connectDB = async () => {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    await fs.mkdir(dataDir, { recursive: true })
    console.log(`✅ Local JSON Database initialized at: ${dataDir}`)
  } catch (err) {
    console.error(`❌ Local DB initialization error: ${err.message}`)
    process.exit(1)
  }
}

export const db = {
  query: () => { throw new Error('Direct db.query is deprecated. Use LocalModel.') },
}
