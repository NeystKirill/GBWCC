import News from '../models/News.js'
import { getPagination, paginationMeta } from '../utils/paginate.js'

export async function list(query) {
  const { page, limit, offset } = getPagination(query)
  const filter = {}

  if (query.published === 'true') filter.published = true
  else if (query.published === 'false') filter.published = false

  const total = await News.countDocuments(filter)
  const items = await News.find(filter)
    .sort({ published_at: -1, created_at: -1 })
    .limit(limit)
    .skip(offset)

  return { items, pagination: paginationMeta(total, page, limit) }
}

export async function getById(id) {
  return await News.findById(id)
}

export async function getBySlug(slug) {
  return await News.findOne({ slug })
}

export async function create(data) {
  return await News.create(data)
}

export async function update(id, data) {
  return await News.findByIdAndUpdate(id, data, { new: true })
}

export async function remove(id) {
  await News.findByIdAndDelete(id)
}
