import ContactSubmission from '../models/ContactSubmission.js'
import { getPagination, paginationMeta } from '../utils/paginate.js'

export async function list(query) {
  const { page, limit, offset } = getPagination(query)
  const filter = {}

  if (query.status && query.status !== 'all') {
    filter.status = query.status
  }

  // Get all items to support search and stats (LocalModel doesn't support $regex/$or)
  let allItems = await ContactSubmission.find({}).sort({ created_at: -1 })

  // Client-side search filter
  if (query.search) {
    const s = query.search.toLowerCase()
    allItems = allItems.filter(item =>
      (item.name || '').toLowerCase().includes(s) ||
      (item.email || '').toLowerCase().includes(s) ||
      (item.subject || '').toLowerCase().includes(s) ||
      (item.company || '').toLowerCase().includes(s)
    )
  }

  // Status filter
  if (query.status && query.status !== 'all') {
    allItems = allItems.filter(item => item.status === query.status)
  }

  // Stats from all items (no status filter)
  const allForStats = await ContactSubmission.find({})
  const stats = { new: 0, read: 0, archived: 0, in_progress: 0, responded: 0 }
  allForStats.forEach(item => {
    const s = item.status || 'new'
    if (s in stats) stats[s]++
    else stats.new++
  })

  const total = allItems.length
  const items = allItems.slice(offset, offset + limit)

  return { items, pagination: paginationMeta(total, page, limit), stats }
}

export async function getById(id) {
  return await ContactSubmission.findById(id)
}

export async function send(data) {
  return await ContactSubmission.create(data)
}

export async function create(data) {
  return await ContactSubmission.create(data)
}

export async function updateStatus(id, status) {
  return await ContactSubmission.findByIdAndUpdate(id, { status }, { new: true })
}

export async function remove(id) {
  await ContactSubmission.findByIdAndDelete(id)
}
