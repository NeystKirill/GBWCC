import EventsHeroTitle from './components/EventsHeroTitle'
import EventsHeroStats from './components/EventsHeroStats'
import '../events.css'

export default function EventsHero({ lbl = {}, eyebrow, title, desc, stats }) {
  const _eyebrow = eyebrow ?? lbl.eyebrow ?? 'GBWC'
  const _title   = title   ?? lbl.heroTitle ?? lbl.title ?? ''
  const _desc    = desc    ?? lbl.heroDesc  ?? lbl.desc  ?? ''
  const _stats   = stats   ?? []
  return (
    <section className="ev2-hero">
      <div className="ev2-hero-bg" />
      <div className="ev2-hero-content">
        <EventsHeroTitle eyebrow={_eyebrow} title={_title} />
        <EventsHeroStats desc={_desc} stats={_stats} />
      </div>
    </section>
  )
}
