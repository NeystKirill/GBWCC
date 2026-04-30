import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const files = fs.readdirSync(dataDir)

files.forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(dataDir, file)
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      if (Array.isArray(data)) {
        let modified = false
        data.forEach(item => {
          if (item.published === undefined) {
            item.published = true
            modified = true
          }
        })
        if (modified) {
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
          console.log(`Updated ${file}`)
        }
      }
    } catch (e) {
      console.error(`Error processing ${file}:`, e)
    }
  }
})
console.log('Done patching DB.')
