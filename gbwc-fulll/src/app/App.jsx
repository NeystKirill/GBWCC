/**
 * App — root orchestrator.
 *
 * Architecture: Feature Architecture (senior level)
 * Page → Widgets → Features → Entities → Shared
 *
 * Layers:
 *  app/      — global providers, routing shell
 *  pages/    — page orchestrators (import from widgets)
 *  widgets/  — large reusable UI blocks
 *  features/ — domain logic modules
 *  entities/ — data models
 *  shared/   — hooks, animations, webgl, ui, utils
 */
import { lazy, Suspense, useEffect, useRef } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Widgets (layout-level)
import Header    from '../widgets/Header/Header'
import Footer    from '../widgets/Footer/Footer'

// Shared UI
import Preloader    from '../shared/ui/Preloader'
import ScrollToTop  from '../shared/ui/ScrollToTop'

// Motion provider
import MotionProvider from './providers/MotionProvider'

// ─── Lazy-loaded pages (code splitting) ──────────────────────────────────────
const Home        = lazy(() => import('../pages/Home/Home'))
const About       = lazy(() => import('../pages/About/About'))
const Founders    = lazy(() => import('../pages/Founders/Founders'))
const Events      = lazy(() => import('../pages/Events/Events'))
const Initiatives = lazy(() => import('../pages/Initiatives/Initiatives'))
const Partners    = lazy(() => import('../pages/Partners/Partners'))
const Media       = lazy(() => import('../pages/Media/Media'))
const Contacts    = lazy(() => import('../pages/Contacts/Contacts'))
const Admin       = lazy(() => import('../pages/Admin/Admin'))

// ─── Page loader fallback ─────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{
      minHeight: '50vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 40, height: 40, border: '3px solid rgba(184,145,74,.2)',
        borderTopColor: '#b8914a', borderRadius: '50%',
        animation: 'spin .8s linear infinite',
      }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// ─── Custom Cursor ────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos    = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const raf    = useRef(0)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
    }
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12
      pos.current.y += (target.current.y - pos.current.y) * 0.12
      ring.style.transform = `translate(${pos.current.x - 18}px, ${pos.current.y - 18}px)`
      raf.current = requestAnimationFrame(animate)
    }
    const onEnter = (e) => {
      if (e.target.closest('a,button,[role="button"]')) {
        dot.classList.add('cursor-hover')
        ring.classList.add('cursor-hover')
      }
    }
    const onLeave = () => {
      dot.classList.remove('cursor-hover')
      ring.classList.remove('cursor-hover')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cur-dot"  />
      <div ref={ringRef} className="cur-ring" />
      <style>{`
        .cur-dot,.cur-ring{position:fixed;top:0;left:0;pointer-events:none;z-index:999998;will-change:transform}
        .cur-dot{width:8px;height:8px;border-radius:50%;background:rgba(184,145,74,.9);box-shadow:0 0 18px rgba(184,145,74,.6);transition:width .2s,height .2s}
        .cur-ring{width:36px;height:36px;border-radius:50%;border:1px solid rgba(184,145,74,.35);transition:width .3s,height .3s,border-color .3s}
        .cur-dot.cursor-hover{width:4px;height:4px}
        .cur-ring.cursor-hover{width:52px;height:52px;border-color:rgba(184,145,74,.7)}
        @media(hover:none){.cur-dot,.cur-ring{display:none}}
      `}</style>
    </>
  )
}

// ─── Routes inside lang prefix ────────────────────────────────────────────────
function LangRoutes() {
  return (
    <Routes>
      <Route path="/"            element={<Home />} />
      <Route path="/about"       element={<About />} />
      <Route path="/founders"    element={<Founders />} />
      <Route path="/events"      element={<Events />} />
      <Route path="/initiatives" element={<Initiatives />} />
      <Route path="/partners"    element={<Partners />} />
      <Route path="/media"       element={<Media />} />
      <Route path="/contacts"    element={<Contacts />} />
    </Routes>
  )
}

function AppLayout() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Админка — без шапки/футера ─────────────────────────────── */}
        <Route path="/admin/*" element={<Admin />} />

        {/* ── Публичный сайт ─────────────────────────────────────────── */}
        <Route path="*" element={
          <>
            <ScrollToTop />
            <Preloader />
            <CustomCursor />
            <Header />
            <MotionProvider>
              <Routes>
                <Route path="/"     element={<Navigate to="/ru" replace />} />
                <Route path="/ru/*" element={<LangRoutes />} />
                <Route path="/en/*" element={<LangRoutes />} />
                <Route path="/kk/*" element={<LangRoutes />} />
                <Route path="*"     element={<Navigate to="/ru" replace />} />
              </Routes>
            </MotionProvider>
            <Footer />
          </>
        } />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return <AppLayout />
}
