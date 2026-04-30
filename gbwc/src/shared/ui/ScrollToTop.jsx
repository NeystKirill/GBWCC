import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Has anchor — wait for render then scroll to element
      const id = hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }
      }, 100)
    } else {
      // No anchor — always scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
