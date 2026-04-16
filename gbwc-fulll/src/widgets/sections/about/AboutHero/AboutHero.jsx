import HeroTitle from './components/HeroTitle'
import HeroStats from './components/HeroStats'
import '../about.css'

export default function AboutHero({ eyebrow, title, desc, stats }) {
  return (
    <section className="ab2-hero">
      <div className="ab2-hero-bg" />
      <div className="ab2-hero-content">
        <HeroTitle eyebrow={eyebrow} title={title} desc={desc} />
      </div>
      <HeroStats stats={stats} />
    </section>
  )
}
