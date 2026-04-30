import Leader from '../models/Leader.js'
import { getPagination, paginationMeta } from '../utils/paginate.js'

export async function list(query) {
  const { page, limit, offset } = getPagination(query)
  const filter = {}

  if (query.published === 'true') filter.published = true
  else if (query.published === 'false') filter.published = false

  const total = await Leader.countDocuments(filter)
  const items = await Leader.find(filter)
    .sort({ sort_order: 1, created_at: -1 })
    .limit(limit)
    .skip(offset)

  return { items, pagination: paginationMeta(total, page, limit) }
}

export async function getById(id) {
  return await Leader.findById(id)
}

export async function getBySlug(slug) {
  return await Leader.findOne({ slug })
}

export async function create(data) {
  return await Leader.create(data)
}

export async function update(id, data) {
  return await Leader.findByIdAndUpdate(id, data, { new: true })
}

export async function remove(id) {
  await Leader.findByIdAndDelete(id)
}
