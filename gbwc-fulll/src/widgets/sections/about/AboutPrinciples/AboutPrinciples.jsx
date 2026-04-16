import '../about.css'
import PrincipleCard from './components/PrincipleCard'

export default function AboutPrinciples({ eyebrow, title, items }) {
  return (
    <section className="ab2-principles">
      <div className="ab2-inner">
        <div className="ab2-section-head ab2-section-head--light">
          <div className="ab2-eyebrow-line ab2-eyebrow-line--gold"><span className="ab2-eyebrow-gem" />{eyebrow}</div>
          <h2 className="ab2-section-title ab2-section-title--light">{title}</h2>
        </div>
        <div className="ab2-principles-grid">
          {items.map((p, i) => <PrincipleCard key={i} {...p} />)}
        </div>
      </div>
    </section>
  )
}
