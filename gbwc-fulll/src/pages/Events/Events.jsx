import { useEffect, useState } from 'react'
import PageLayout          from '../../shared/ui/PageLayout'
import { useLang }         from '../../shared/hooks/useLang'
import { SESSIONS, EVENTS_LABELS } from '../../entities/events/events.data'
import PageHero       from '../../shared/layout/PageHero/PageHero'
import EventsTimeline from '../../widgets/sections/events/EventsTimeline/EventsTimeline'
import SessionDetail  from '../../widgets/sections/events/SessionDetail/SessionDetail'
import '../../widgets/sections/events/events.css'

export default function Events() {
  const { t, lang }             = useLang()
  const lbl                     = EVENTS_LABELS[lang] || EVENTS_LABELS.ru
  const [activeId, setActiveId] = useState(3)
  useEffect(() => { document.title = t.pages.events }, [t])

  const session = SESSIONS.find(s => s.id === activeId) || SESSIONS[SESSIONS.length - 1]
  const heroStats = [
    { value: '3',   label: lang==='ru'?'Заседания':lang==='en'?'Sessions':'Отырыс' },
    { value: '13+', label: lang==='ru'?'Стран':lang==='en'?'Countries':'Ел' },
    { value: '50+', label: lang==='ru'?'Участников каждый раз':lang==='en'?'Participants each':'Қатысушы' },
  ]

  return (
    <PageLayout>
      <PageHero label={lbl.eyebrow} title={lbl.heroTitle} desc={lbl.heroDesc} stats={heroStats} />
      <EventsTimeline sessions={SESSIONS} activeId={activeId} onSelect={setActiveId} />
      <SessionDetail  session={session} lang={lang} labels={lbl} />
    </PageLayout>
  )
}
