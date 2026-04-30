import { useState, useEffect } from 'react'
import { partners } from '../../services/api'

export function usePartners(type = '') {
  const [data, setData] = useState({ items: [], pagination: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = type ? { type } : {}
    partners.list(params)
      .then(d => setData(d || { items: [], pagination: null }))
      .catch(() => setData({ items: [], pagination: null }))
      .finally(() => setLoading(false))
  }, [type])

  return { ...data, loading }
}
