/**
 * GBWC API Client — Production Hardened
 * Unified client for both public frontend and admin panel.
 */

const BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

// ─── Token storage ──────────────────────────────────────────────────────────
let _accessToken = localStorage.getItem('gbwc_token') || null

export function setToken(token) {
  _accessToken = token
  if (token) localStorage.setItem('gbwc_token', token)
  else localStorage.removeItem('gbwc_token')
}

export function getToken() {
  return _accessToken
}

export const tokenStore = {
  set: (access) => { setToken(access) },
  clear: () => { setToken(null) },
}

// ─── Core fetch ─────────────────────────────────────────────────────────────
let _refreshing = null

async function apiFetch(path, options = {}) {
  const headers = { ...options.headers }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  if (_accessToken) headers['Authorization'] = `Bearer ${_accessToken}`

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  })

  // Token expired → try refresh
  if (res.status === 401 && path !== '/auth/refresh' && path !== '/auth/login') {
    if (!_refreshing) {
      _refreshing = _tryRefresh().finally(() => { _refreshing = null })
    }
    const ok = await _refreshing
    if (ok) {
      headers['Authorization'] = `Bearer ${_accessToken}`
      const retry = await fetch(`${BASE_URL}${path}`, { ...options, headers, credentials: 'include' })
      if (!retry.ok) throw await _buildError(retry)
      return retry.json().catch(() => null)
    }
    tokenStore.clear()
    window.dispatchEvent(new CustomEvent('gbwc:sessionExpired'))
    throw Object.assign(new Error('Session expired. Please log in again.'), { status: 401 })
  }

  if (!res.ok) throw await _buildError(res)
  return res.json().catch(() => null)
}

async function _buildError(res) {
  let body = {}
  try { body = await res.json() } catch {}
  const msg = body.error || body.message || `Request failed (${res.status})`
  return Object.assign(new Error(msg), { status: res.status })
}

async function _tryRefresh() {
  try {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) return false
    const data = await res.json()
    setToken(data.tokens.accessToken)
    return true
  } catch {
    return false
  }
}

// ─── Auth ───────────────────────────────────────────────────────────────────
export const auth = {
  async login(email, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    })
    setToken(data.tokens.accessToken)
    return data.user
  },
  async logout() {
    try { await apiFetch('/auth/logout', { method: 'POST' }) } catch {}
    tokenStore.clear()
  },
  me:         () => apiFetch('/auth/me'),
  listUsers:  () => apiFetch('/auth/users'),
  createUser: (d) => apiFetch('/auth/users', { method: 'POST', body: JSON.stringify(d) }),
  updateUser: (id, d) => apiFetch(`/auth/users/${id}`, { method: 'PATCH', body: JSON.stringify(d) }),
  deleteUser: (id) => apiFetch(`/auth/users/${id}`, { method: 'DELETE' }),
}

// ─── Generic CRUD factory ───────────────────────────────────────────────────
const crud = (base) => ({
  list:      (q = {}) => { const s = new URLSearchParams(q).toString(); return apiFetch(`${base}${s ? '?' + s : ''}`) },
  get:       (id) => apiFetch(`${base}/${id}`),
  getBySlug: (slug) => apiFetch(`${base}/slug/${slug}`),
  create:    (d) => apiFetch(base, { method: 'POST', body: JSON.stringify(d) }),
  update:    (id, d) => apiFetch(`${base}/${id}`, { method: 'PATCH', body: JSON.stringify(d) }),
  remove:    (id) => apiFetch(`${base}/${id}`, { method: 'DELETE' }),
})

export const pages       = { ...crud('/pages'), listAll: () => apiFetch('/pages') }
export const leaders     = crud('/leaders')
export const sessions    = { ...crud('/sessions'),
  uploadGallery: (id, files) => {
    const form = new FormData()
    files.forEach(f => form.append('files', f))
    return apiFetch(`/sessions/${id}/gallery`, { method: 'POST', body: form })
  },
}
export const initiatives = crud('/initiatives')
export const partners    = { ...crud('/partners'),
  list: (q = {}) => { const s = new URLSearchParams(q).toString(); return apiFetch(`/partners${s ? '?' + s : ''}`) },
}
export const news        = crud('/news')
export const media       = crud('/media')
export const settings    = {
  get:    () => apiFetch('/settings'),
  listRaw: () => apiFetch('/settings/raw'),
  update: (data) => apiFetch('/settings', { method: 'PATCH', body: JSON.stringify(data) }),
}

export const contact = {
  submit:       (d) => apiFetch('/contact', { method: 'POST', body: JSON.stringify(d) }),
  list:         (q = {}) => { const s = new URLSearchParams(q).toString(); return apiFetch(`/contact${s ? '?' + s : ''}`) },
  get:          (id) => apiFetch(`/contact/${id}`),
  updateStatus: (id, status) => apiFetch(`/contact/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  remove:       (id) => apiFetch(`/contact/${id}`, { method: 'DELETE' }),
}

export const upload = {
  file: (file, folder = 'images') => {
    const form = new FormData()
    form.append('file', file)
    form.append('folder', folder)
    return apiFetch('/upload/single', { method: 'POST', body: form })
  },
  multiple: (files, folder = 'images') => {
    const form = new FormData()
    files.forEach(f => form.append('files', f))
    form.append('folder', folder)
    return apiFetch('/upload', { method: 'POST', body: form })
  },
  list:   (q = {}) => { const s = new URLSearchParams(q).toString(); return apiFetch(`/upload${s ? '?' + s : ''}`) },
  remove: (id) => apiFetch(`/upload/${id}`, { method: 'DELETE' }),
}

export default { auth, pages, leaders, sessions, initiatives, partners, news, media, settings, contact, upload }
