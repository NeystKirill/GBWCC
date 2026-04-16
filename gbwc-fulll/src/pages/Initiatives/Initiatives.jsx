import { useEffect } from 'react'
import PageLayout    from '../../shared/ui/PageLayout'
import { useLang }   from '../../shared/hooks/useLang'
import { INITIATIVES_CONTENT } from '../../entities/initiatives/initiatives.data'
import PageHero        from '../../shared/layout/PageHero/PageHero'
import InitiativesList from '../../widgets/sections/initiatives/InitiativesList/InitiativesList'
import '../../widgets/sections/initiatives/initiatives.css'

export default function Initiatives() {
  const { t, lang } = useLang()
  const d = INITIATIVES_CONTENT[lang] || INITIATIVES_CONTENT.ru
  const itemCount = d.items?.length || 6

  useEffect(() => { document.title = t.pages.initiatives }, [t])

  const stats = [
    { value: itemCount,  label: lang==='ru'?'Инициатив':lang==='en'?'Initiatives':'Бастамалар' },
    { value: '3',        label: lang==='ru'?'Пленарных заседания':lang==='en'?'Plenary sessions':'Пленарлық отырыс' },
    { value: '13+',      label: lang==='ru'?'Стран-партнёров':lang==='en'?'Partner countries':'Серіктес ел' },
  ]

  return (
    <PageLayout>
      <PageHero label={d.eyebrow} title={d.heroTitle} desc={d.heroDesc} stats={stats} />
      <section className="init2-intro">
        <div className="init2-inner">
          <p className="init2-intro-text">{d.intro}</p>
        </div>
      </section>
      <InitiativesList items={d.items} tasksLabel={d.tasksLabel} />
      <section className="init2-partnership">
        <div className="init2-partnership-inner">
          <div className="init2-eyebrow-row"><span className="init2-eyebrow-gem" />{d.partnershipLabel}</div>
          <h2 className="init2-partnership-title">{d.partnershipTitle}</h2>
          <p className="init2-partnership-text">{d.partnershipText}</p>
        </div>
      </section>
      <section className="init2-cta">
        <div className="init2-cta-bg" />
        <div className="init2-cta-inner">
          <div className="init2-cta-eyebrow"><span className="init2-cta-gem" />GBWC</div>
          <h2 className="init2-cta-title">{d.ctaTitle}</h2>
          <p className="init2-cta-text">{d.ctaText}</p>
          <a href={`mailto:${d.ctaEmail}`} className="init2-cta-btn">{d.ctaBtn}</a>
        </div>
      </section>
    </PageLayout>
  )
}
