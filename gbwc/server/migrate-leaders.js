import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data', 'leader.json')

try {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  let modified = false

  data.forEach(leader => {
    if (leader.data) {
      const langs = Object.keys(leader.data)
      const fields = new Set()
      
      // Collect all fields across all languages
      langs.forEach(lang => {
        if (leader.data[lang]) {
          Object.keys(leader.data[lang]).forEach(field => fields.add(field))
        }
      })

      // Reconstruct leader object
      fields.forEach(field => {
        leader[field] = {}
        langs.forEach(lang => {
          if (leader.data[lang] && leader.data[lang][field] !== undefined) {
            leader[field][lang] = leader.data[lang][field]
          }
        })
      })

      // Clean up the old data object
      delete leader.data
      modified = true
    }
  })

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    console.log('leader.json structure migrated successfully.')
  } else {
    console.log('No migration needed for leader.json.')
  }
} catch (e) {
  console.error('Error migrating leader.json:', e)
}
