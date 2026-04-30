import '../partners.css'

export default function PartnersHero({ lbl = {}, stats = [] }) {
  return (
    <section className="part2-hero">
      <div className="part2-hero-bg" />
      <div className="part2-hero-content">
        <div className="part2-hero-left">
          <div className="part2-hero-eyebrow">
            <span className="part2-eyebrow-gem" />
            {lbl.eyebrow || 'GBWC'}
          </div>
          <h1 className="part2-hero-title">{lbl.heroTitle || lbl.title || ''}</h1>
        </div>
        <div className="part2-hero-right">
          <p className="part2-hero-desc">{lbl.heroDesc || lbl.desc || ''}</p>
          {stats.length > 0 && (
            <div className="part2-hero-stats">
              {stats.map((s, i) => (
                <div key={i} className="part2-hero-stat">
                  <span className="part2-hero-stat-n">{s.value ?? s.n}</span>
                  <span className="part2-hero-stat-l">{s.label ?? s.l}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
