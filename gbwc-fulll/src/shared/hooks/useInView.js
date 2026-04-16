import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting)
      if (e.isIntersecting && options.once) io.disconnect()
    }, { threshold: options.threshold ?? 0.1, rootMargin: options.rootMargin ?? '0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView]
}
