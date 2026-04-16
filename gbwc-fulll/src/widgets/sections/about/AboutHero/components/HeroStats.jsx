export default function HeroStats({ stats }) {
  return (
    <div className="ab2-hero-stats">
      <div className="ab2-hero-stats-inner">
        {stats.map((s, i) => (
          <div key={i} className="ab2-stat">
            <span className="ab2-stat-n">{s.n}</span>
            <span className="ab2-stat-l">{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
