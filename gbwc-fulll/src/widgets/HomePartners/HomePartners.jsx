import { useFadeUp } from '../../shared/animations/useFadeUp'
import { PARTNERS } from '../../entities/partners/partners.data'
import { PARTNERS_LABELS } from '../../shared/constants/homeData'
import './HomePartners.css'

// Build flat list of all partners for marquee rows (all have logos now)
function buildMarqueeRows() {
  const all = [
    ...PARTNERS.intl,
    ...PARTNERS.corp,
    ...PARTNERS.natl,
    ...PARTNERS.inst,
  ]
  // duplicate for seamless infinite scroll
  const doubled = [...all, ...all]
  const half = Math.ceil(doubled.length / 2)
  return [doubled.slice(0, half), doubled.slice(half)]
}

export default function HomePartners({ lang }) {
  const refH = useFadeUp()
  const lbl = PARTNERS_LABELS[lang] || PARTNERS_LABELS.ru
  const [row1, row2] = buildMarqueeRows()

  const cats = [
    { num: '01', key: 'intl', label: lbl.intl, count: PARTNERS.intl.length },
    { num: '02', key: 'corp', label: lbl.corp, count: PARTNERS.corp.length },
    { num: '03', key: 'natl', label: lbl.natl, count: PARTNERS.natl.length },
  ]

  return (
    <>
      <section className="home-partners home-section">
        <div className="home-partners-inner">
          {/* Header */}
          <div className="home-partners-header fade-up" ref={refH}>
            <div className="home-section-label">{lbl.sectionLabel}</div>
            <h2 className="home-section-title dark">{lbl.sectionTitle}</h2>
            {lbl.sectionSubtext && (
              <p className="home-partners-subtext">{lbl.sectionSubtext}</p>
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
              const items = PARTNERS[cat.key] || []
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
