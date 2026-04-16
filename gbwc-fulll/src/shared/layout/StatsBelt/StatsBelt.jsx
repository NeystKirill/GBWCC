export default function StatsBelt({ stats, light = false }) {
  return (
    <div className={`stats-belt${light ? ' stats-belt--light' : ''}`}>
      <div className="stats-belt__inner">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <span className="stat-item__value">{s.value ?? s.n ?? s.num}</span>
            <span className="stat-item__label">{s.label ?? s.l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
