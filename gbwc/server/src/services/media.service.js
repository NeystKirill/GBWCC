import Media from '../models/Media.js'
import { getPagination, paginationMeta } from '../utils/paginate.js'

export async function list(query) {
  const { page, limit, offset } = getPagination(query)
  const filter = {}

  if (query.published === 'true') filter.published = true
  else if (query.published === 'false') filter.published = false
  if (query.session_id) filter.session_id = query.session_id
  if (query.type) filter.type = query.type

  const total = await Media.countDocuments(filter)
  const items = await Media.find(filter)
    .populate('session_id', 'slug title date')
    .sort({ sort_order: 1, created_at: -1 })
    .limit(limit)
    .skip(offset)

  return { items, pagination: paginationMeta(total, page, limit) }
}

export async function getById(id) {
  return await Media.findById(id).populate('session_id')
}

export async function create(data) {
  return await Media.create(data)
}

export async function createMany(items) {
  return await Media.insertMany(items)
}

export async function update(id, data) {
  return await Media.findByIdAndUpdate(id, data, { new: true })
}

export async function remove(id) {
  await Media.findByIdAndDelete(id)
}
