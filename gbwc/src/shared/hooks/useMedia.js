import { useState, useEffect } from 'react'
import { media } from '../../services/api'

export function useMedia(filters = {}) {
  const [data, setData] = useState({ items: [], pagination: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    media.list({ ...filters })
      .then(d => setData(d || { items: [], pagination: null }))
      .catch(() => setData({ items: [], pagination: null }))
      .finally(() => setLoading(false))
  }, [])

  return { ...data, loading }
}
