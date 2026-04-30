import Session from '../models/Session.js'
import { getPagination, paginationMeta } from '../utils/paginate.js'

export async function list(query) {
  const { page, limit, offset } = getPagination(query)
  const filter = {}

  if (query.published === 'true') filter.published = true
  else if (query.published === 'false') filter.published = false

  const total = await Session.countDocuments(filter)
  const items = await Session.find(filter)
    .sort({ sort_order: 1, date: -1 })
    .limit(limit)
    .skip(offset)

  return { items, pagination: paginationMeta(total, page, limit) }
}

export async function getById(id) {
  return await Session.findById(id)
}

export async function getBySlug(slug) {
  return await Session.findOne({ slug })
}

export async function create(data) {
  return await Session.create(data)
}

export async function update(id, data) {
  return await Session.findByIdAndUpdate(id, data, { new: true })
}

export async function remove(id) {
  await Session.findByIdAndDelete(id)
}

