import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * useApi — fetch data with loading/error/refetch.
 * Uses an incrementing generation counter to safely ignore stale responses
 * even when multiple concurrent calls overlap.
 */
export function useApi(fetcher, deps = []) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)
  const genRef = useRef(0)  // generation counter; increments on each new call

  const run = useCallback(async () => {
    const gen = ++genRef.current  // capture this call's generation
    setLoading(true)
    setError(null)
    try {
      const result = await fetcher()
      if (gen === genRef.current) setData(result)
    } catch (err) {
      if (gen === genRef.current) setError(err.message || 'Failed to load data')
    } finally {
      if (gen === genRef.current) setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    run()
    return () => { genRef.current++ }  // invalidate on unmount/re-run
  }, [run])

  return { data, loading, error, refetch: run }
}

/**
 * usePaginated — paginated list with filter/sort controls.
 */
export function usePaginated(fetcher, initialParams = {}) {
  const [params, setParams] = useState({ page: 1, limit: 12, ...initialParams })
  const depsKey = JSON.stringify(params)

  const { data, loading, error, refetch } = useApi(
    () => fetcher(params),
    [depsKey]
  )

  const goTo      = useCallback((page)  => setParams(p => ({ ...p, page })),           [])
  const setFilter = useCallback((f)     => setParams(p => ({ ...p, ...f, page: 1 })),  [])
  const setLimit  = useCallback((limit) => setParams(p => ({ ...p, limit, page: 1 })), [])

  return {
    items:   data?.items || (Array.isArray(data) ? data : []),
    total:   data?.total  || 0,
    pages:   data?.pages  || 1,
    page:    params.page,
    loading, error, refetch, goTo, setFilter, setLimit,
  }
}
