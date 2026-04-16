import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MotionSection, TiltCard } from '../../shared/animations/MotionSection'
import { ABOUT_DATA } from '../../shared/constants/homeData'
import './HomeAbout.css'

// All group photos for slideshow — wide shots with many faces
const SLIDESHOW = [
  '/img/plenary/session3_group.jpeg',
  '/img/plenary/session1_group.jpeg',
  '/img/plenary/session1_ribbon.jpeg',
  '/img/plenary/plenar1_5_main.jpg',
  '/img/plenary/IMG_1929.jpg',
  '/img/plenary/IMG_2926.jpg',
  '/img/plenary/IMG_5970.jpg',
]

function PhotoSlideshow() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % SLIDESHOW.length)
        setFade(true)
      }, 400)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="ha-slideshow">
      <img
        key={idx}
        src={SLIDESHOW[idx]}
        alt="GBWC Plenary"
        loading="lazy"
        style={{ opacity: fade ? 1 : 0, transition: 'opacity .4s ease' }}
      />
      <div className="ha-photo-shine" />
      {/* Dots */}
      <div className="ha-slide-dots">
        {SLIDESHOW.map((_, i) => (
          <button
            key={i}
            className={`ha-slide-dot${i === idx ? ' active' : ''}`}
            onClick={() => { setFade(false); setTimeout(() => { setIdx(i); setFade(true) }, 400) }}
            aria-label={`Фото ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function HomeAbout({ lang }) {
  const d = ABOUT_DATA[lang] || ABOUT_DATA.ru

  function splitNum(str) {
    const m = String(str).match(/^(\d+)(.*)$/)
    return m ? { n: m[1], sx: m[2] || '' } : { n: str, sx: '' }
  }

  return (
    <section className="ha">
      <div className="ha-inner">

        {/* Left — text */}
        <MotionSection animation="fadeUp" className="ha-left">
          <div className="ha-label">
            <span className="ha-label-line" />
            {d.label}
          </div>
          <h2 className="ha-heading">{d.title}</h2>
          <p className="ha-body">{d.p1}</p>
          <p className="ha-body">{d.p2}</p>
          {d.p3 && <p className="ha-body ha-body--quote">{d.p3}</p>}
          <Link to={`/${lang}/about`} className="lyt-btn lyt-btn--secondary" style={{ marginTop: 8, alignSelf: 'flex-start' }}>
            {d.cta}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" />
            </svg>
          </Link>
        </MotionSection>

        {/* Right — Slideshow + Stats */}
        <MotionSection animation="fadeUp" delay={0.15} className="ha-right">

          {/* Main slideshow */}
          <TiltCard className="ha-photo-main" intensity={3}>
            <PhotoSlideshow />
          </TiltCard>

          {/* Stats badge */}
          <MotionSection animation="scale" delay={0.28} className="ha-badge">
            <div className="ha-stats-row">
              {d.stats.map((s, i) => {
                const { n, sx } = splitNum(s.num)
                return (
                  <div key={i}>
                    <div className="ha-stat-n">{n}<span>{sx}</span></div>
                    <div className="ha-stat-l">{s.label}</div>
                  </div>
                )
              })}
            </div>
            <p className="ha-quote">{d.quote}</p>
          </MotionSection>
        </MotionSection>

      </div>
    </section>
  )
}
