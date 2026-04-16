import '../about.css'
import DirectionRow from './components/DirectionRow'

export default function AboutDirections({ eyebrow, title, items }) {
  return (
    <section className="ab2-directions">
      <div className="ab2-inner">
        <div className="ab2-section-head">
          <div className="ab2-eyebrow-line"><span className="ab2-eyebrow-gem" />{eyebrow}</div>
          <h2 className="ab2-section-title">{title}</h2>
        </div>
        <div className="ab2-dir-list">
          {items.map((d, i) => <DirectionRow key={i} {...d} />)}
        </div>
      </div>
    </section>
  )
}
