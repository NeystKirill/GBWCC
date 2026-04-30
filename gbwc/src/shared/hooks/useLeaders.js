import { useState, useEffect } from 'react'
import { leaders } from '../../services/api'

export function useLeaders(filters = {}) {
  const [data, setData] = useState({ items: [], pagination: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    leaders.list({ published: 'true', ...filters })
      .then(d => setData(d || { items: [], pagination: null }))
      .catch(() => setData({ items: [], pagination: null }))
      .finally(() => setLoading(false))
  }, [])

  return { ...data, loading }
}
