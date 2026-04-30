import { useEffect, useRef } from 'react'

export function useFadeUp(threshold = 0.1) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.disconnect() }
    }, { threshold })
    el.classList.add('fade-up')
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return ref
}
