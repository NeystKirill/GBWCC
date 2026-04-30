import { useState, useEffect } from 'react'
import { sessions } from '../../services/api'

export function useSessions(filters = {}) {
  const [data, setData] = useState({ items: [], pagination: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = { published: 'true', ...filters }
    sessions.list(params)
      .then(d => setData(d || { items: [], pagination: null }))
      .catch(() => setData({ items: [], pagination: null }))
      .finally(() => setLoading(false))
  }, [])

  return { ...data, loading }
}
