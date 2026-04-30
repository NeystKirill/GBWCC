import { useLang } from '../../../../shared/hooks/useLang'
import { ABOUT_CONTENT } from '../../../../entities/about/about.data'
import '../about.css'
import TimelineItem from './components/TimelineItem'

export default function AboutTimeline({ eyebrow, title, items }) {
  const { lang, resolveCMS } = useLang();
  const fallback = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru;

  // If items are missing or the first item has no title/year, use fallback
  const d = {
    eyebrow: eyebrow || fallback.timelineEye,
    title: title || fallback.timelineTitle,
    items: (items && items.length > 0 && (items[0].title || items[0].year)) ? items : fallback.timeline
  }

  return (
    <section className="ab2-timeline">
      <div className="ab2-inner">
        <div className="ab2-section-head">
          <div className="ab2-eyebrow-line ab2-eyebrow-line--gold"><span className="ab2-eyebrow-gem" />{resolveCMS(d.eyebrow)}</div>
          <h2 className="ab2-section-title ab2-section-title--light">{resolveCMS(d.title)}</h2>
        </div>
        <div className="ab2-tl-list">
          {d.items.map((item, i) => <TimelineItem key={i} {...item} />)}
        </div>
      </div>
    </section>
  )
}
