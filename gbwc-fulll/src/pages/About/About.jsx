import { useEffect } from 'react'
import PageLayout        from '../../shared/ui/PageLayout'
import { useLang }       from '../../shared/hooks/useLang'
import { ABOUT_CONTENT } from '../../entities/about/about.data'
import PageHero          from '../../shared/layout/PageHero/PageHero'
import '../../widgets/sections/about/about.css'

import AboutMandate     from '../../widgets/sections/about/AboutMandate/AboutMandate'
import AboutDirections  from '../../widgets/sections/about/AboutDirections/AboutDirections'
import AboutTimeline    from '../../widgets/sections/about/AboutTimeline/AboutTimeline'
import AboutPrinciples  from '../../widgets/sections/about/AboutPrinciples/AboutPrinciples'
import AboutFounder     from '../../widgets/sections/about/AboutFounder/AboutFounder'
import AboutSecretariat from '../../widgets/sections/about/AboutSecretariat/AboutSecretariat'
import AboutMission     from '../../widgets/sections/about/AboutMission/AboutMission'
import AboutCTA         from '../../widgets/sections/about/AboutCTA/AboutCTA'

export default function About() {
  const { t, lang } = useLang()
  const c = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru
  useEffect(() => { document.title = t.pages.about }, [t])

  return (
    <PageLayout>
      <PageHero
        label={c.heroEye}
        title={c.heroTitle}
        desc={c.heroDesc}
        stats={c.stats.map(s => ({ value: s.n, label: s.l }))}
      />
      <AboutMandate     eyebrow={c.mandateEye} title={c.mandateTitle} paragraphs={c.mandateParas} cards={c.asideCards} />
      <AboutDirections  eyebrow={c.dirEye} title={c.dirTitle} items={c.dirs} />
      <AboutTimeline    eyebrow={c.timelineEye} title={c.timelineTitle} items={c.timeline} />
      <AboutPrinciples  eyebrow={c.princEye} title={c.princTitle} items={c.princs} />
      <AboutFounder     eyebrow={c.founderEye} name={c.founderTitle} role={c.founderRole} bio={c.founderBio} points={c.founderPoints} photo={c.founderPhoto} />
      <AboutSecretariat eyebrow={c.secretEye} title={c.secretTitle} members={c.team} />
      <AboutMission     eyebrow={c.mvvEye} mission={c.mission} vision={c.vision} values={c.values} />
      <AboutCTA         text={c.ctaText} initLabel={c.ctaInit} partLabel={c.ctaPart} lang={lang} />
    </PageLayout>
  )
}
