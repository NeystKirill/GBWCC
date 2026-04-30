import Setting from '../models/Setting.js'

export async function listAll() {
  const settings = await Setting.find().sort({ group: 1, key: 1 })
  // Convert to object for easier consumption
  return settings.reduce((acc, s) => {
    acc[s.key] = s.value
    return acc
  }, {})
}

export async function listRaw() {
  return await Setting.find().sort({ group: 1, key: 1 })
}

export async function getByKey(key) {
  const setting = await Setting.findOne({ key })
  return setting ? setting.value : null
}

export async function update(key, value) {
  return await Setting.findOneAndUpdate(
    { key },
    { value },
    { upsert: true, new: true }
  )
}

export async function updateMany(settings) {
  const ops = Object.entries(settings).map(([key, value]) => ({
    updateOne: {
      filter: { key },
      update: { value },
      upsert: true
    }
  }))
  return await Setting.bulkWrite(ops)
}
