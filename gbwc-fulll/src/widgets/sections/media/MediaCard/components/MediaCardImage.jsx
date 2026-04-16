// Media articles don't have images in the original — this component is unused in original
// Keeping as placeholder for future use
export default function MediaCardImage({ src, alt }) {
  if (!src) return null
  return <div className="med-card-img"><img src={src} alt={alt} loading="lazy" /></div>
}
