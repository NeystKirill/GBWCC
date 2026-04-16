export default function DirectionRow({ n, title, desc }) {
  return (
    <div className="ab2-dir-row">
      <span className="ab2-dir-n">{n}</span>
      <div className="ab2-dir-body">
        <div className="ab2-dir-title">{title}</div>
        <div className="ab2-dir-desc">{desc}</div>
      </div>
      <span className="ab2-dir-arrow">→</span>
    </div>
  )
}
