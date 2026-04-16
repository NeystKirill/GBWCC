export default function HeroTitle({ eyebrow, title, desc }) {
  return (
    <div className="ab2-hero-left">
      <div className="ab2-hero-eyebrow"><span>{eyebrow}</span></div>
      <h1 className="ab2-hero-title">{title}</h1>
      {desc && <p className="ab2-hero-desc">{desc}</p>}
    </div>
  )
}
