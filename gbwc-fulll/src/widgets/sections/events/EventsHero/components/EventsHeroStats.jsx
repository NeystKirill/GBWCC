export default function EventsHeroStats({ desc, stats }) {
  return (
    <div className="ev2-hero-right">
      <p className="ev2-hero-desc">{desc}</p>
      <div className="ev2-hero-stats">
        {stats.map((s, i) => (
          <div key={i} className="ev2-hero-stat">
            <span className="ev2-hero-stat-n">{s.n}</span>
            <span className="ev2-hero-stat-l">{s.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
