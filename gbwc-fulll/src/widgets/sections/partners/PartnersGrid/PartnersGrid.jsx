import { useState, useMemo } from 'react'
import '../partners.css'
import PartnerCard from '../PartnerCard/PartnerCard'

const SEARCH_PH  = { ru: 'Поиск партнёра…', en: 'Search partner…', kk: 'Серіктес іздеу…' }
const NO_RESULT  = { ru: 'Партнёры не найдены', en: 'No partners found', kk: 'Серіктес табылмады' }
const CTA_TEXT   = {
  ru: { label: 'СТАТЬ ПАРТНЁРОМ', body: 'Присоединяйтесь к глобальной сети GBWC', btn: 'Связаться' },
  en: { label: 'BECOME A PARTNER', body: 'Join the global GBWC network',          btn: 'Contact us' },
  kk: { label: 'СЕРІКТЕС БОЛУ',    body: 'GBWC жаһандық желісіне қосылыңыз',      btn: 'Хабарласу' },
}

function pluralize(n, lang) {
  if (lang === 'ru') {
    const m10 = n%10, m100 = n%100
    if (m100>=11&&m100<=14) return 'результатов'
    if (m10===1) return 'результат'
    if (m10>=2&&m10<=4) return 'результата'
    return 'результатов'
  }
  return n===1 ? 'result' : 'results'
}

export default function PartnersGrid({ cats, lang, lbl }) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const allItems = useMemo(() =>
    cats.flatMap(cat => cat.items.map(p => ({ ...p, _cat: cat.key, _catTitle: cat.title })))
  , [cats])

  const filtered = useMemo(() =>
    q ? allItems.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.full?.[lang] || p.full?.ru || '').toLowerCase().includes(q)
    ) : null
  , [q, allItems, lang])

  const cta = CTA_TEXT[lang] || CTA_TEXT.ru

  return (
    <section className="part2-section">
      {/* Search */}
      <div className="part2-search-wrap">
        <div className="part2-search-box">
          <svg className="part2-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21"/>
          </svg>
          <input className="part2-search-input" type="text"
            placeholder={SEARCH_PH[lang] || SEARCH_PH.ru}
            value={query} onChange={e => setQuery(e.target.value)} />
          {query && <button className="part2-search-clear" onClick={() => setQuery('')}>✕</button>}
        </div>
        {filtered && (
          <div className="part2-search-count">
            {filtered.length} {pluralize(filtered.length, lang)}
          </div>
        )}
      </div>

      {/* Search results */}
      {filtered ? (
        <div className="part2-search-results">
          {filtered.length === 0
            ? <div className="part2-search-empty">{NO_RESULT[lang] || NO_RESULT.ru}</div>
            : <div className="part2-pcards-grid">
                {filtered.map((partner, i) => (
                  <PartnerCard key={i} partner={partner} lang={lang} lbl={lbl} index={i} />
                ))}
              </div>
          }
        </div>
      ) : (
        cats.map((cat, idx) => {
          const items = cat.items
          // Pad to multiple of 3 with CTA card(s) if last row incomplete
          const remainder = items.length % 3
          const ctaCount  = remainder === 0 ? 0 : 3 - remainder

          return (
            <div key={cat.key} className="part2-cat">
              <div className="part2-cat-header">
                <div className="part2-cat-header-left">
                  <span className="part2-cat-num">{cat.num}</span>
                  <div>
                    <h2 className="part2-cat-title">{cat.title}</h2>
                    <p className="part2-cat-desc">{cat.desc}</p>
                  </div>
                </div>
                <span className="part2-cat-count">{items.length}</span>
              </div>

              {/* Logo marquee */}
              <div className="part2-logo-marquee-wrap">
                <div className={`part2-logo-marquee-track${idx % 2 === 1 ? ' part2-logo-marquee-track--rev' : ''}`}>
                  {[...items, ...items, ...items].map((p, i) => (
                    <div key={i} className="part2-logo-chip" title={p.name}>
                      <img src={p.logo} alt={p.name} className="part2-logo-chip-img" />
                      <span className="part2-logo-chip-name">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cards grid + CTA filler */}
              <div className="part2-pcards-grid">
                {items.map((partner, i) => (
                  <PartnerCard key={i} partner={partner} lang={lang} lbl={lbl} index={i} />
                ))}
                {/* Fill empty grid cells */}
                {ctaCount > 0 && Array.from({ length: ctaCount }).map((_, i) => (
                  <div key={`cta-${i}`} className="part2-pcard part2-pcard--cta">
                    <div className="part2-pcard-cta-inner">
                      <div className="part2-pcard-cta-num">{items.length}+</div>
                      <span className="part2-pcard-cta-gem" />
                      <p className="part2-pcard-cta-label">{cta.label}</p>
                      <p className="part2-pcard-cta-body">{cta.body}</p>
                      <a href="mailto:partnerships@gbwc.org" className="part2-pcard-cta-btn">
                        {cta.btn} →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })
      )}
    </section>
  )
}
