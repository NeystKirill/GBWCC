export function success(res, data, status = 200) {
  return res.status(status).json(data)
}

export function error(res, message, status = 400, code = null) {
  return res.status(status).json({ error: message, ...(code && { code }) })
}

export function notFound(res, resource = 'Resource') {
  return res.status(404).json({ error: `${resource} not found` })
}
