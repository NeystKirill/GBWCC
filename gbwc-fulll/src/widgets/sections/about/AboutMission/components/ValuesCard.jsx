export default function ValuesCard({ letter, values }) {
  return (
    <div className="ab2-mvv-card ab2-mvv-card--values">
      <span className="ab2-mvv-letter">{letter}</span>
      <div className="ab2-mvv-card-tag">VALUES</div>
      <ul className="ab2-values-list">
        {values.map((v, i) => (
          <li key={i} className="ab2-values-item">
            <span className="ab2-val-dot" /><strong>{v.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}
