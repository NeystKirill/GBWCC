export function cacheControl(maxAge = 60, staleWhileRevalidate = 300) {
  return (req, res, next) => {
    res.setHeader('Cache-Control', `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}`)
    next()
  }
}
