export default function EventsHeroTitle({ eyebrow, title }) {
  return (
    <div className="ev2-hero-left">
      <div className="ev2-hero-eyebrow"><span>{eyebrow}</span></div>
      <h1 className="ev2-hero-title">{title}</h1>
    </div>
  )
}
