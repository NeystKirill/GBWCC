import '../about.css'
import TimelineItem from './components/TimelineItem'

export default function AboutTimeline({ eyebrow, title, items }) {
  return (
    <section className="ab2-timeline">
      <div className="ab2-inner">
        <div className="ab2-section-head">
          <div className="ab2-eyebrow-line ab2-eyebrow-line--gold"><span className="ab2-eyebrow-gem" />{eyebrow}</div>
          <h2 className="ab2-section-title ab2-section-title--light">{title}</h2>
        </div>
        <div className="ab2-tl-list">
          {items.map((item, i) => <TimelineItem key={i} {...item} />)}
        </div>
      </div>
    </section>
  )
}
