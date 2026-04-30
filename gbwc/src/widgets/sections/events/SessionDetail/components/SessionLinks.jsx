export default function SessionLinks({ gallery, video, labels }) {
  return (
    <div className="ev2-links">
      {gallery && <a href={gallery} target="_blank" rel="noopener noreferrer" className="ev2-link-btn ev2-link-btn--gold">{labels.gallery} ↗</a>}
      {video   && <a href={video}   target="_blank" rel="noopener noreferrer" className="ev2-link-btn ev2-link-btn--outline">{labels.video} ↗</a>}
    </div>
  )
}
