/**
 * MotionProvider — global scroll-based fade-up support.
 * Handles legacy .fade-up class animation via IntersectionObserver.
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function MotionProvider({ children }) {
  const location = useLocation()

  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [location.pathname])

  return children
}
