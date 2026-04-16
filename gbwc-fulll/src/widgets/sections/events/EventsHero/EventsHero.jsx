import EventsHeroTitle from './components/EventsHeroTitle'
import EventsHeroStats from './components/EventsHeroStats'
import '../events.css'

export default function EventsHero({ eyebrow, title, desc, stats }) {
  return (
    <section className="ev2-hero">
      <div className="ev2-hero-bg" />
      <div className="ev2-hero-content">
        <EventsHeroTitle eyebrow={eyebrow} title={title} />
        <EventsHeroStats desc={desc} stats={stats} />
      </div>
    </section>
  )
}
