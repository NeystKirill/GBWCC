import { useState, useEffect } from 'react'
import { pages } from '../../services/api'

export function usePageContent(key) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!key) { setLoading(false); return }
    pages.get(key)
      .then(d => setContent(d?.content || null))
      .catch(() => setContent(null))
      .finally(() => setLoading(false))
  }, [key])

  return { content, loading }
}
