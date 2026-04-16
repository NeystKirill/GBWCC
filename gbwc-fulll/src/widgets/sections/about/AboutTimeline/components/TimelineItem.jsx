export default function TimelineItem({ year, title, desc }) {
  return (
    <div className="ab2-tl-item">
      <div className="ab2-tl-year">{year}</div>
      <div className="ab2-tl-dot" />
      <div className="ab2-tl-body">
        <div className="ab2-tl-title">{title}</div>
        <p className="ab2-tl-desc">{desc}</p>
      </div>
    </div>
  )
}
