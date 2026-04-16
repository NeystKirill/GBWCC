/**
 * shared/layout/PageHero
 *
 * Universal top block for ALL pages except Home.
 * Usage:
 *   <PageHero label="GBWC" title="О Совете" desc="..." stats={[...]} />
 * 
 * Or with custom right slot:
 *   <PageHero label="GBWC" title="Events" rightSlot={<YourComponent />} stats={[...]} />
 */
import HeroLabel       from './components/HeroLabel'
import HeroTitle       from './components/HeroTitle'
import HeroDescription from './components/HeroDescription'
import HeroStats       from './components/HeroStats'

export default function PageHero({
  label,
  title,
  titleEmphasis,   // italic part appended to title
  sub,             // small sub-label in right col
  desc,            // description text
  stats,           // array of { value, label }
  rightSlot,       // custom right content (overrides desc)
}) {
  return (
    <section className="page-hero">
      <div className="page-hero__bg" />
      <div className="page-hero__content">
        <div className="page-hero__left">
          {label && <HeroLabel>{label}</HeroLabel>}
          <HeroTitle>
            {title}
            {titleEmphasis && <> <em>{titleEmphasis}</em></>}
          </HeroTitle>
        </div>
        {(rightSlot || sub || desc) && (
          rightSlot
            ? <div className="page-hero__right">{rightSlot}</div>
            : <HeroDescription sub={sub}>{desc}</HeroDescription>
        )}
      </div>
      {stats?.length > 0 && <HeroStats stats={stats} />}
    </section>
  )
}
