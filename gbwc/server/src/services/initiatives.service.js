import Initiative from '../models/Initiative.js'
import { getPagination, paginationMeta } from '../utils/paginate.js'

export async function list(query) {
  const { page, limit, offset } = getPagination(query)
  const filter = {}

  if (query.published === 'true') filter.published = true
  else if (query.published === 'false') filter.published = false

  const total = await Initiative.countDocuments(filter)
  const items = await Initiative.find(filter)
    .sort({ sort_order: 1, created_at: -1 })
    .limit(limit)
    .skip(offset)

  return { items, pagination: paginationMeta(total, page, limit) }
}

export async function getById(id) {
  return await Initiative.findById(id)
}

export async function getBySlug(slug) {
  return await Initiative.findOne({ slug })
}

export async function create(data) {
  return await Initiative.create(data)
}

export async function update(id, data) {
  return await Initiative.findByIdAndUpdate(id, data, { new: true })
}

export async function remove(id) {
  await Initiative.findByIdAndDelete(id)
}
