import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../shared/hooks/useLang'
import { MotionSection, TiltCard } from '../../shared/animations/MotionSection'
import { ABOUT_DATA } from '../../shared/constants/homeData'
import './HomeAbout.css'

// All group photos for slideshow — wide shots with many faces
const SLIDESHOW = [
  '/img/plenary/session3_group.jpeg',
  '/img/plenary/session1_group.jpeg',
  '/img/plenary/session1_ribbon.jpeg',
  '/img/plenary/plenar1_5_main.jpg',
]

function PhotoSlideshow({ customSlides }) {
  const images = (customSlides && customSlides.length > 0) ? customSlides : SLIDESHOW
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
        src={images[idx]}
        alt="GBWC Plenary"
        loading="lazy"
        style={{ opacity: fade ? 1 : 0, transition: 'opacity .4s ease' }}
      />
      <div className="ha-photo-shine" />
      {/* Dots */}
      <div className="ha-slide-dots">
        {images.map((_, i) => (
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

export default function HomeAbout({ data }) {
  const { lang, resolveCMS, resolveWithFallback } = useLang()
  const fallback = ABOUT_DATA[lang] || ABOUT_DATA.ru

  // Merged data: CMS overrides fallback where non-null
  const slideshow = data?.slideshow?.length > 0 ? data.slideshow : undefined
  const stats = data?.stats?.length > 0 ? data.stats : fallback.stats
  const quote = resolveWithFallback(data?.quote, fallback.quote)

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
            {resolveWithFallback(data?.label, fallback.label)}
          </div>
          <h2 className="ha-heading">{resolveWithFallback(data?.title, fallback.title)}</h2>
          <p className="ha-body">{resolveWithFallback(data?.p1, fallback.p1)}</p>
          <p className="ha-body">{resolveWithFallback(data?.p2, fallback.p2)}</p>
          {resolveWithFallback(data?.p3, fallback.p3) && <p className="ha-body ha-body--quote">{resolveWithFallback(data?.p3, fallback.p3)}</p>}
          <Link to={`/${lang}/about`} className="lyt-btn lyt-btn--secondary" style={{ marginTop: 8, alignSelf: 'flex-start' }}>
            {resolveWithFallback(data?.cta, fallback.cta)}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" />
            </svg>
          </Link>
        </MotionSection>

        {/* Right — Slideshow + Stats */}
        <MotionSection animation="fadeUp" delay={0.15} className="ha-right">

          {/* Main slideshow */}
          <TiltCard className="ha-photo-main" intensity={3}>
            <PhotoSlideshow customSlides={slideshow} />
          </TiltCard>

          {/* Stats badge */}
          <MotionSection animation="scale" delay={0.28} className="ha-badge">
            <div className="ha-stats-row">
              {stats?.map((s, i) => {
                const { n, sx } = splitNum(s.num)
                return (
                  <div key={i}>
                    <div className="ha-stat-n">{n}<span>{sx}</span></div>
                    <div className="ha-stat-l">{resolveCMS(s.label)}</div>
                  </div>
                )
              })}
            </div>
            <p className="ha-quote">{quote}</p>
          </MotionSection>
        </MotionSection>

      </div>
    </section>
  )
}
