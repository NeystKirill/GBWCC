export default function MediaCluster({ primary, thumbs = [], alt = '' }) {
  return (
    <div className="media-cluster">
      <div className="media-cluster__primary">
        <img src={primary} alt={alt} loading="lazy" />
        <div className="media-cluster__primary-shine" />
      </div>
      {thumbs.length > 0 && (
        <div className="media-cluster__secondary">
          {thumbs.slice(0, 2).map((src, i) => (
            <div key={i} className="media-cluster__thumb">
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
