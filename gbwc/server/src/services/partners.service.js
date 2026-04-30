import Partner from '../models/Partner.js'
import { getPagination, paginationMeta } from '../utils/paginate.js'

export async function list(query) {
  const { page, limit, offset } = getPagination(query)
  const filter = {}

  if (query.published === 'true') filter.published = true
  else if (query.published === 'false') filter.published = false
  if (query.type) filter.type = query.type

  const total = await Partner.countDocuments(filter)
  const items = await Partner.find(filter)
    .sort({ sort_order: 1, created_at: -1 })
    .limit(limit)
    .skip(offset)

  return { items, pagination: paginationMeta(total, page, limit) }
}

export async function getById(id) {
  return await Partner.findById(id)
}

export async function create(data) {
  return await Partner.create(data)
}

export async function update(id, data) {
  return await Partner.findByIdAndUpdate(id, data, { new: true })
}

export async function remove(id) {
  await Partner.findByIdAndDelete(id)
}
