/**
 * HomeStats — Template: StatsBelt (dark background)
 * Uses unified stats-belt + stat-item classes
 */
import { useEffect, useRef } from 'react'
import { useLang } from '../../shared/hooks/useLang'
import ShaderBackground from '../../shared/webgl/ShaderBackground'
import { MotionSection } from '../../shared/animations/MotionSection'
import './HomeStats.css'

const STATS = {
  ru: [
    { n:15,   sx:'+', label:'Стран-участниц',     desc:'Азия, Европа, СНГ и Ближний Восток' },
    { n:3,    sx:'+', label:'Пленарных заседаний', desc:'Диалог на высшем уровне 2023–2025' },
    { n:15,   sx:'+', label:'Партнёров',           desc:'Транснациональные корпорации и институты' },
    { n:7,    sx:'+', label:'Инициатив и проектов',desc:'Стратегические социальные программы' },
  ],
  en: [
    { n:15,   sx:'+', label:'Member Countries', desc:'Asia, Europe, CIS and Middle East' },
    { n:3,    sx:'+', label:'Plenary Sessions', desc:'High-level dialogue 2023–2025' },
    { n:15,   sx:'+', label:'Partners',         desc:'Transnational corporations and institutions' },
    { n:7,    sx:'+', label:'Initiatives & Projects', desc:'Strategic social programs' },
  ],
  kk: [
    { n:15,   sx:'+', label:'Қатысушы елдер',     desc:'Азия, Еуропа, ТМД және Таяу Шығыс' },
    { n:3,    sx:'+', label:'Пленарлық отырыстар', desc:'2023–2025 жоғары деңгейлі диалог' },
    { n:15,   sx:'+', label:'Серіктестер',         desc:'Трансұлттық корпорациялар мен институттар' },
    { n:7,    sx:'+', label:'Бастамалар мен жобалар',desc:'Стратегиялық әлеуметтік бағдарламалар' },
  ],
}

function AnimNum({ to, sx, duration = 1800, delay = 0 }) {
  const ref = useRef(null); const started = useRef(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.textContent = '0'
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now() + delay
        const step = (now) => {
          const p = Math.min(Math.max(now - t0, 0) / duration, 1)
          el.innerHTML = Math.round((1 - (1-p)**4) * to) + (sx ? `<span class="hs-card-sx">${sx}</span>` : '')
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        io.disconnect()
      }
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [to, sx, duration, delay])
  return <span ref={ref}>0{sx}</span>
}

export default function HomeStats({ data }) {
  const { lang, resolveWithFallback } = useLang()
  const itemsFromData = Array.isArray(data) ? data : (data && Array.isArray(data.items) ? data.items : null)
  const stats = (itemsFromData && itemsFromData.length > 0) ? itemsFromData : (STATS[lang] || STATS.ru)
  return (
    <>
      {/* Dark stats belt — uses .hs-shader for WebGL, then stats-belt layout */}
      <section className="hs">
        <ShaderBackground className="hs-shader" intensity={0.6} />
        <div className="hs-grid-lines" />
        <div className="hs-shimmer" />

        {/* StatsBelt geometry: 4 equal columns */}
        <div className="hs-inner">
          {stats.map((s, i) => (
            <MotionSection key={i} animation="fadeUp" delay={i * 0.08} className="hs-card">
              {/* lyt-card__value pattern */}
              <div className="hs-card-num">
                <AnimNum to={Number(s.n || 0)} sx={s.sx} duration={1800} delay={i * 120} />
              </div>
              {/* lyt-card__meta pattern */}
              <div className="hs-card-label">{resolveWithFallback(s.label, '')}</div>
              <div className="hs-card-desc">{resolveWithFallback(s.desc, '')}</div>
              <div className="hs-card-bar" />
            </MotionSection>
          ))}
        </div>
      </section>
    </>
  )
}
