/**
 * shared/layout/PageHero
 *
 * Universal top block for ALL pages except Home.
 * Accepts both plain strings and CMS multilingual objects {ru, en, kk}.
 */
import { useLang } from '../../hooks/useLang'
import HeroLabel       from './components/HeroLabel'
import HeroTitle       from './components/HeroTitle'
import HeroDescription from './components/HeroDescription'
import HeroStats       from './components/HeroStats'

export default function PageHero({
  label,
  title,
  titleEmphasis,
  sub,
  desc,
  stats,
  rightSlot,
}) {
  const { resolveCMS } = useLang()

  const resolvedLabel         = resolveCMS(label)
  const resolvedTitle         = resolveCMS(title)
  const resolvedTitleEmphasis = resolveCMS(titleEmphasis)
  const resolvedDesc          = resolveCMS(desc)
  const resolvedSub           = resolveCMS(sub)

  return (
    <section className="page-hero">
      <div className="page-hero__bg" />
      <div className="page-hero__content">
        <div className="page-hero__left">
          {resolvedLabel && <HeroLabel>{resolvedLabel}</HeroLabel>}
          <HeroTitle>
            {resolvedTitle}
            {resolvedTitleEmphasis && <> <em>{resolvedTitleEmphasis}</em></>}
          </HeroTitle>
        </div>
        {(rightSlot || resolvedSub || resolvedDesc) && (
          rightSlot
            ? <div className="page-hero__right">{rightSlot}</div>
            : <HeroDescription sub={resolvedSub}>{resolvedDesc}</HeroDescription>
        )}
      </div>
      {stats?.length > 0 && (
        <HeroStats stats={stats.map(s => ({
          ...s,
          label: resolveCMS(s.label),
          value: resolveCMS(s.value),
        }))} />
      )}
    </section>
  )
}
