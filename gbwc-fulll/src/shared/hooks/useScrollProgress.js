import { useEffect, useRef, useState } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [direction, setDirection] = useState(1)
  const prevY = useRef(0)
  const prevTime = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const now = performance.now()
      const y = window.scrollY
      const maxY = document.body.scrollHeight - window.innerHeight
      const p = maxY > 0 ? Math.min(y / maxY, 1) : 0
      const dt = now - prevTime.current
      const dy = y - prevY.current
      setProgress(p)
      setVelocity(dt > 0 ? dy / dt : 0)
      setDirection(dy >= 0 ? 1 : -1)
      prevY.current = y
      prevTime.current = now
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return { progress, velocity, direction }
}

export function useElementScrollProgress(ref) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      const p = (window.innerHeight - rect.top) / (window.innerHeight + rect.height)
      setProgress(Math.max(0, Math.min(1, p)))
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [ref])
  return progress
}
