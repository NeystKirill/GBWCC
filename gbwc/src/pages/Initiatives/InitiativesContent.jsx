import { useEffect, useState } from 'react'
import PageLayout    from '../../shared/ui/PageLayout'
import { useLang }   from '../../shared/hooks/useLang'
import { initiatives as initApi, pages } from '../../services/api'
import { INITIATIVES_CONTENT } from '../../entities/initiatives/initiatives.data'
import PageHero        from '../../shared/layout/PageHero/PageHero'
import InitiativesList from '../../widgets/sections/initiatives/InitiativesList/InitiativesList'
import '../../widgets/sections/initiatives/initiatives.css'

export default function InitiativesContent(props) {
  const { t, lang } = useLang()
  const [initList, setInitList] = useState([])
  const [loading, setLoading] = useState(true)
  const cmsData = props.data || props

  useEffect(() => {
    initApi.list({ sort: 'sort_order' })
      .then(res => setInitList(Array.isArray(res) ? res : res?.items || []))
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [t])

  if (loading) return <div className="lyt-loading" style={{ height: '30vh' }} />

  const d = INITIATIVES_CONTENT[lang] || INITIATIVES_CONTENT.ru
  // Combine props with default fallback
  const activeLabels = { ...d, ...cmsData }
  
  // API items take priority; static fills gaps for slugs not in API
  const dynamicItems = initList.map(item => ({
    ...item,
    title: item.title?.[lang] || item.title?.ru,
    tag: item.tag?.[lang] || item.tag?.ru,
    desc: item.description?.[lang] || item.description?.ru,
    details: item.details?.[lang] || item.details?.ru,
    tasks: item.tasks?.[lang] || item.tasks?.ru || [],
  }))

  const mappedItems = dynamicItems

  return (
    <>
      <section className="init2-intro">
        <div className="init2-inner">
          <p className="init2-intro-text">{activeLabels.intro}</p>
        </div>
      </section>
      <InitiativesList items={mappedItems} tasksLabel={activeLabels.tasksLabel} lang={lang} />
      <section className="init2-partnership">
        <div className="init2-partnership-inner">
          <div className="init2-eyebrow-row"><span className="init2-eyebrow-gem" />{activeLabels.partnershipLabel}</div>
          <h2 className="init2-partnership-title">{activeLabels.partnershipTitle}</h2>
          <p className="init2-partnership-text">{activeLabels.partnershipText}</p>
        </div>
      </section>
      <section className="init2-cta">
        <div className="init2-cta-bg" />
        <div className="init2-cta-inner">
          <div className="init2-cta-eyebrow"><span className="init2-cta-gem" />GBWC</div>
          <h2 className="init2-cta-title">{activeLabels.ctaTitle}</h2>
          <p className="init2-cta-text">{activeLabels.ctaText}</p>
          <a href={`mailto:${activeLabels.ctaEmail}`} className="init2-cta-btn">{activeLabels.ctaBtn}</a>
        </div>
      </section>
    </>
  )
}
