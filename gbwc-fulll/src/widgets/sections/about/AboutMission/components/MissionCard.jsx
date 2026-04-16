export default function MissionCard({ letter, tag, text, variant }) {
  return (
    <div className={`ab2-mvv-card ab2-mvv-card--${variant}`}>
      <span className="ab2-mvv-letter">{letter}</span>
      <div className="ab2-mvv-card-tag">{tag}</div>
      <p className="ab2-mvv-card-text">{text}</p>
    </div>
  )
}
