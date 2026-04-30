import '../media.css'

export default function MediaHero({ lbl = {}, stats = [] }) {
  return (
    <section className="med-hero">
      <div className="med-hero-bg" />
      <div className="med-hero-content">
        <div className="med-hero-left">
          <div className="med-hero-eyebrow">
            <span className="med-eyebrow-gem" />
            GBWC
          </div>
          <h1 className="med-hero-title">{lbl.title || lbl.heroTitle || ''}</h1>
        </div>
        <div className="med-hero-right">
          <p className="med-hero-desc">{lbl.subtitle || lbl.heroDesc || ''}</p>
          {stats.length > 0 && (
            <div className="med-hero-stats">
              {stats.map((s, i) => (
                <div key={i} className="med-hero-stat">
                  <span className="med-hero-stat-n">{s.value ?? s.n}</span>
                  <span className="med-hero-stat-l">{s.label ?? s.l}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
