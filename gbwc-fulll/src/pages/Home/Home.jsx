/**
 * pages/Home/Home.jsx — pure orchestrator
 * Imports all sections from widgets/sections/home/
 */
import { useEffect } from 'react'
import { useLang }   from '../../shared/hooks/useLang'
import PageLayout    from '../../shared/ui/PageLayout'

import VideoHero       from '../../widgets/HeroSection/VideoHero'
import HomeAbout       from '../../widgets/HomeAbout/HomeAbout'
import HomeQuote       from '../../widgets/HomeQuote/HomeQuote'
import HomeStats       from '../../widgets/HomeStats/HomeStats'
import HomeDirections  from '../../widgets/HomeDirections/HomeDirections'
import HomePlenary     from '../../widgets/HomePlenary/HomePlenary'
import HomeKeyPeople   from '../../widgets/HomeKeyPeople/HomeKeyPeople'
import HomeInitiatives from '../../widgets/HomeInitiatives/HomeInitiatives'
import HomePartners    from '../../widgets/HomePartners/HomePartners'
import HomeCoop        from '../../widgets/HomeCoop/HomeCoop'

import './Home.css'


const Sep = () => (
  <div className="home-section-sep">
    <img src="/img/own/logo.svg" alt="" className="home-sep-logo" aria-hidden="true" />
  </div>
)

export default function Home() {
  const { lang } = useLang()

  useEffect(() => {
    document.body.classList.add('page-immersive')
    return () => document.body.classList.remove('page-immersive')
  }, [])

  return (
    <main>
      <VideoHero />
      <HomeAbout       lang={lang} />
      <Sep />
      <HomeQuote       lang={lang} />
      <HomeStats       lang={lang} />
      <Sep />
      <HomeDirections  lang={lang} />
      <Sep />
      <HomePlenary     lang={lang} />
      <Sep />
      <HomeKeyPeople   lang={lang} />
      <Sep />
      <HomeInitiatives lang={lang} />
      <Sep />
      <HomePartners    lang={lang} />
      <Sep />
      <HomeCoop        lang={lang} />
    </main>
  )
}
