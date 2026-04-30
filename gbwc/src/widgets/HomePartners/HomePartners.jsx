import { useState, useEffect } from 'react'
import { useLang } from '../../shared/hooks/useLang'
import { useFadeUp } from '../../shared/animations/useFadeUp'
import { PARTNERS as STATIC_PARTNERS } from '../../entities/partners/partners.data'
import { PARTNERS_LABELS } from '../../shared/constants/homeData'
import { partners as partnersApi } from '../../services/api'
import './HomePartners.css'

// Build flat list of all partners for marquee rows (all have logos now)
function buildMarqueeRows(partnersSource) {
  const p = partnersSource || STATIC_PARTNERS
  const all = [
    ...(p.intl || []),
    ...(p.corp || []),
    ...(p.natl || []),
    ...(p.inst || []),
  ]
  if (all.length === 0) return [[], []]
  // duplicate for seamless infinite scroll
  const doubled = [...all, ...all]
  const half = Math.ceil(doubled.length / 2)
  return [doubled.slice(0, half), doubled.slice(half)]
}

export default function HomePartners({ data }) {
  const { lang, resolveCMS } = useLang()
  const refH = useFadeUp()
  const [apiData, setApiData] = useState(null)
  
  useEffect(() => {
    partnersApi.list({ limit: 100 })
      .then(res => {
        const items = Array.isArray(res) ? res : res.items || []
        if (items.length > 0) {
          // Group by type
          const grouped = { intl: [], corp: [], natl: [], inst: [] }
          items.forEach(item => {
            let key = item.type || item.category || ''
            if (key === 'international') key = 'intl'
            if (key === 'corporate')     key = 'corp'
            if (key === 'national')      key = 'natl'
            if (key === 'institutional') key = 'inst'

            if (grouped[key]) {
              grouped[key].push({
                ...item,
                logo: item.logo_url || item.logo || item.image || item.photo
              })
            }
          })
          setApiData(grouped)
        }
      })
      .catch(() => {})
  }, [])

  const defaultLbl = PARTNERS_LABELS[lang] || PARTNERS_LABELS.ru
  const lbl = {
    sectionLabel: data?.sectionLabel || defaultLbl.sectionLabel,
    sectionTitle: data?.sectionTitle || defaultLbl.sectionTitle,
    sectionSubtext: data?.sectionSubtext || defaultLbl.sectionSubtext,
    intl: data?.intlLbl || defaultLbl.intl,
    corp: data?.corpLbl || defaultLbl.corp,
    natl: data?.natlLbl || defaultLbl.natl,
  }
  
  const pSource = apiData || { intl: [], corp: [], natl: [], inst: [] }
  
  // If CMS provides partner arrays, prepend them
  if (data?.intl) pSource.intl = [...(Array.isArray(data.intl) ? data.intl.map(p => ({ name: p.text || p.name || '', logo: p.logo || '' })).filter(p => p.name) : []), ...pSource.intl]
  if (data?.corp) pSource.corp = [...(Array.isArray(data.corp) ? data.corp.map(p => ({ name: p.text || p.name || '', logo: p.logo || '' })).filter(p => p.name) : []), ...pSource.corp]
  if (data?.natl) pSource.natl = [...(Array.isArray(data.natl) ? data.natl.map(p => ({ name: p.text || p.name || '', logo: p.logo || '' })).filter(p => p.name) : []), ...pSource.natl]

  const [row1, row2] = buildMarqueeRows(pSource)

  const cats = [
    { num: '01', key: 'intl', label: resolveCMS(lbl.intl), count: pSource.intl?.length || 0 },
    { num: '02', key: 'corp', label: resolveCMS(lbl.corp), count: pSource.corp?.length || 0 },
    { num: '03', key: 'natl', label: resolveCMS(lbl.natl), count: pSource.natl?.length || 0 },
  ]

  return (
    <>
      <section className="home-partners home-section">
        <div className="home-partners-inner">
          {/* Header */}
          <div className="home-partners-header fade-up" ref={refH}>
            <div className="home-section-label">{resolveCMS(lbl.sectionLabel)}</div>
            <h2 className="home-section-title dark">{resolveCMS(lbl.sectionTitle)}</h2>
            {lbl.sectionSubtext && (
              <p className="home-partners-subtext">{resolveCMS(lbl.sectionSubtext)}</p>
            )}
          </div>

          {/* Stats bar */}
          <div className="home-partners-stats">
            {cats.map(c => (
              <div key={c.key} className="hp-stat">
                <span className="hp-stat-num">{c.num}</span>
                <div className="hp-stat-info">
                  <span className="hp-stat-count">{c.count}</span>
                  <span className="hp-stat-label">{c.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dual-row logo marquee ── */}
        <div className="hp-logos-section">
          <div className="hp-logo-row">
            <div className="hp-logo-track">
              {row1.map((p, i) => <LogoTile key={i} partner={p} />)}
            </div>
          </div>
          <div className="hp-logo-row hp-logo-row--rev">
            <div className="hp-logo-track hp-logo-track--rev">
              {row2.map((p, i) => <LogoTile key={i} partner={p} />)}
            </div>
          </div>
        </div>

        {/* Category accordion with mini logos */}
        <div className="home-partners-inner">
          <div className="hp-cat-list">
            {cats.map(cat => {
              const items = pSource[cat.key] || []
              return (
                <div key={cat.key} className="hp-cat">
                  <div className="hp-cat-line" />
                  <div className="hp-cat-header">
                    <div className="hp-cat-left">
                      <span className="hp-cat-num">{cat.num}</span>
                      <span className="hp-cat-name">{cat.label}</span>
                      <span className="hp-cat-count">{cat.count}</span>
                    </div>
                    <div className="hp-cat-mini-logos">
                      {items.slice(0, 6).map((p, i) => (
                        <div key={i} className="hp-mini-logo" title={p.name}>
                          <img src={p.logo} alt={p.name} />
                        </div>
                      ))}
                    </div>
                    <span className="hp-cat-arrow">&#8594;</span>
                  </div>
                </div>
              )
            })}
            <div className="hp-cat-bottom-line" />
          </div>
        </div>
      </section>
</>
  )
}

function LogoTile({ partner }) {
  const inner = (
    <>
      <div className="hp-logo-tile-img-wrap">
        <img src={partner.logo} alt={partner.name} className="hp-logo-tile-img" />
      </div>
    </>
  )
  if (partner.url) {
    return (
      <a href={partner.url} target="_blank" rel="noopener noreferrer"
         className="hp-logo-tile" title={partner.name}>
        {inner}
      </a>
    )
  }
  return <div className="hp-logo-tile" title={partner.name}>{inner}</div>
}
