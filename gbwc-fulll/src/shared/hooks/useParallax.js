import { useEffect, useRef } from 'react'
import { useElementScrollProgress } from './useScrollProgress'

export function useParallax(speed = 0.3) {
  const ref = useRef(null)
  const progress = useElementScrollProgress(ref)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const offset = (progress - 0.5) * speed * 220
    el.style.transform = `translateY(${offset}px)`
  }, [progress, speed])
  return ref
}

export function useMagneticHover(strength = 0.3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - rect.left - rect.width  / 2) * strength
      const dy = (e.clientY - rect.top  - rect.height / 2) * strength
      el.style.transform = `translate(${dx}px,${dy}px)`
      el.style.transition = 'transform 0.15s ease'
    }
    const onLeave = () => {
      el.style.transform = ''
      el.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)'
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }, [strength])
  return ref
}
