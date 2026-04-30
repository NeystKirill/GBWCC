import Page from '../models/Page.js'

export async function getByKey(key) {
  return await Page.findOne({ key })
}

export async function upsert(key, content) {
  return await Page.findOneAndUpdate(
    { key },
    { content },
    { upsert: true, new: true }
  )
}

export async function listAll() {
  return await Page.find().sort({ key: 1 })
}

