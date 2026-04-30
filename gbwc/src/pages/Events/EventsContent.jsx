import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SESSIONS, EVENTS_LABELS } from '../../entities/events/events.data'
import { sessions as sessionsApi } from '../../services/api'
import EventsHero from '../../widgets/sections/events/EventsHero/EventsHero'
import EventsTimeline from '../../widgets/sections/events/EventsTimeline/EventsTimeline'
import EventDetails from '../../widgets/sections/events/EventDetails/EventDetails'
import './Events.css'

export default function EventsContent({ data: cmsData, lang: propLang }) {
  const { i18n } = useTranslation()
  const lang = propLang || i18n.language || 'ru'

  const [activeId, setActiveId] = useState(null)
  const [apiSessions, setApiSessions] = useState([])

  useEffect(() => {
    sessionsApi.list({ published: 'true', limit: 100 })
      .then(res => setApiSessions(Array.isArray(res) ? res : res?.items || []))
      .catch(() => null)
  }, [])

  const lbl = { ...(EVENTS_LABELS[lang] || EVENTS_LABELS.ru), ...cmsData }

  const dataList = [...apiSessions].sort((a, b) => (Number(a.year) || 0) - (Number(b.year) || 0))

  useEffect(() => {
    if (!activeId && dataList.length > 0) {
      setActiveId(dataList[dataList.length - 1].id)
    }
  }, [dataList.length, activeId])

  const currentActive = dataList.find(s => s.id === activeId) || dataList[dataList.length - 1]

  const getVal = (obj) => {
    if (!obj) return ''
    if (typeof obj === 'string') return obj
    return obj[lang] || obj.ru || ''
  }

  const getArr = (obj) => {
    if (!obj) return []
    if (Array.isArray(obj)) return obj
    if (typeof obj === 'object') return obj[lang] || obj.ru || []
    return []
  }

  const mappedSession = currentActive ? {
    ...currentActive,
    title: getVal(currentActive.theme),
    desc: getVal(currentActive.description || currentActive.desc),
    dateValue: getVal(currentActive.date),
    locValue: getVal(currentActive.location),
    contextValue: getVal(currentActive.context),
    topics: getArr(currentActive.topics),
    results: getArr(currentActive.results),
    members: currentActive.members || [],
  } : null

  return (
    <>
      <div className="ev2-content">
        <EventsTimeline
          sessions={dataList}
          activeId={activeId}
          onSelect={setActiveId}
        />
        {mappedSession && (
          <EventDetails
            session={mappedSession}
            lang={lang}
            lbl={lbl}
          />
        )}
      </div>
    </>
  )
}
