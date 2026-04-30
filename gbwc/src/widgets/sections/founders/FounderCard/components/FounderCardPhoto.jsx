import { useState, useEffect } from 'react'

const CAPTIONS = {
  ru: ['I Пленарное заседание', 'II Пленарное заседание', 'III Пленарное заседание'],
  en: ['Plenary Session I',     'Plenary Session II',     'Plenary Session III'],
  kk: ['I Пленарлық отырыс',   'II Пленарлық отырыс',   'III Пленарлық отырыс'],
}

const LABEL = {
  ru: 'С пленарных заседаний',
  en: 'From plenary sessions',
  kk: 'Пленарлық отырыстардан',
}

export default function FounderCardPhoto({ photo, initials, index, sessionPhotos = [], lang = 'ru' }) {
  const [active, setActive] = useState(0)
  const [fading, setFading] = useState(false)

  const captions = CAPTIONS[lang] || CAPTIONS.ru
  const count = sessionPhotos.length || 3  // always show 3 slots

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActive(prev => (prev + 1) % count)
        setFading(false)
      }, 350)
    }, 5000)
    return () => clearInterval(timer)
  }, [count])

  const goTo = (i) => {
    if (i === active) return
    setFading(true)
    setTimeout(() => { setActive(i); setFading(false) }, 350)
  }

  const currentSrc = sessionPhotos[active] || null

  return (
    <div className="ldr-photo-col">

      {/* ── Portrait ── */}
      <div className="ldr-photo-side">
        <div className="ldr-photo-bg" />
        <div className="ldr-photo-frame">
          {photo
            ? <img src={photo} alt={initials} className="ldr-photo-img" />
            : <div className="ldr-photo-placeholder">
                <span className="ldr-photo-initials">{initials}</span>
              </div>
          }
        </div>
        <div className="ldr-photo-corner ldr-photo-corner--tl" />
        <div className="ldr-photo-corner ldr-photo-corner--br" />
        <span className="ldr-photo-index">{index}</span>
      </div>

      {/* ── Session slideshow ── */}
      <div className="ldr-slide">

        {/* Image area */}
        <div className="ldr-slide-frame">
          <div className={`ldr-slide-img-wrap${fading ? ' fading' : ''}`}>
            {currentSrc
              ? <img src={currentSrc} alt={captions[active]} className="ldr-slide-img" />
              : <div className="ldr-slide-placeholder">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(184,145,74,0.4)" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                  </svg>
                </div>
            }
          </div>

          {/* Caption overlay */}
          <div className="ldr-slide-caption">
            <span className="ldr-slide-label-dot" />
            {LABEL[lang]}
            <span className="ldr-slide-session-name">{captions[active]}</span>
          </div>

          {/* Progress bar */}
          <div className="ldr-slide-progress">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className={`ldr-slide-pip${i === active ? ' active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={captions[i]}
              />
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
