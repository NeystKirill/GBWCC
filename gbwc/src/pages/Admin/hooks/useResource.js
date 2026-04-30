import { useState, useCallback } from 'react'

const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

function getHeaders() {
  const token = localStorage.getItem('gbwc_token')
  const h = { 'Content-Type': 'application/json' }
  if (token) h['Authorization'] = `Bearer ${token}`
  return h
}

async function request(method, path, body) {
  const opts = { method, headers: getHeaders(), credentials: 'include' }
  if (body && !(body instanceof FormData)) opts.body = JSON.stringify(body)
  if (body instanceof FormData) {
    delete opts.headers['Content-Type']
    opts.body = body
  }
  const res = await fetch(`${BASE}${path}`, opts)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw Object.assign(new Error(err.error || `Error ${res.status}`), { status: res.status })
  }
  return res.json().catch(() => null)
}

export function useResource(endpoint) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState(null)

  const list = useCallback(async (params = {}) => {
    setLoading(true)
    try {
      const qs = new URLSearchParams(params).toString()
      const data = await request('GET', `${endpoint}${qs ? '?' + qs : ''}`)
      if (data?.items) {
        setItems(data.items)
        setPagination(data.pagination || null)
      } else if (Array.isArray(data)) {
        setItems(data)
        setPagination(null)
      } else {
        setItems([])
      }
      return data
    } finally {
      setLoading(false)
    }
  }, [endpoint])

  const get = useCallback(async (id) => {
    return request('GET', `${endpoint}/${id}`)
  }, [endpoint])

  const create = useCallback(async (data) => {
    const result = await request('POST', endpoint, data)
    return result
  }, [endpoint])

  const update = useCallback(async (id, data) => {
    const result = await request('PATCH', `${endpoint}/${id}`, data)
    return result
  }, [endpoint])

  const remove = useCallback(async (id) => {
    await request('DELETE', `${endpoint}/${id}`)
    setItems(prev => prev.filter(item => item.id !== id))
  }, [endpoint])

  const uploadFile = useCallback(async (id, subpath, file, fieldName = 'file') => {
    const form = new FormData()
    form.append(fieldName, file)
    return request('POST', `${endpoint}/${id}/${subpath}`, form)
  }, [endpoint])

  const uploadFiles = useCallback(async (id, subpath, files, fieldName = 'files') => {
    const form = new FormData()
    files.forEach(f => form.append(fieldName, f))
    return request('POST', `${endpoint}/${id}/${subpath}`, form)
  }, [endpoint])

  return { items, loading, pagination, list, get, create, update, remove, uploadFile, uploadFiles, setItems }
}
