export default function SessionGallery({ photos, numeral, label }) {
  if (!photos?.length) return null
  return (
    <div className="ev2-photo-section">
      <div className="ev2-photo-label">{label}</div>
      <div className="ev2-photo-grid">
        {photos.map((src, i) => (
          <div key={i} className="ev2-photo-item">
            <img src={src} alt={`Plenary ${numeral} — ${i+1}`} loading="lazy" />
            <div className="ev2-photo-overlay" />
          </div>
        ))}
      </div>
    </div>
  )
}
