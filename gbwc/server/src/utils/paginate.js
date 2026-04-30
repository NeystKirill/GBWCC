export function getPagination(query) {
  const page = Math.max(1, parseInt(query.page) || 1)
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 20))
  const offset = (page - 1) * limit
  return { page, limit, offset }
}

export function paginationMeta(total, page, limit) {
  return { total, page, limit, pages: Math.ceil(total / limit) }
}
