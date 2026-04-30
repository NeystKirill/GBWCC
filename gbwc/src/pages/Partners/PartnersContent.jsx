import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LABELS as STATIC_LABELS } from '../../entities/partners/partners.labels'
import { STATIC_PARTNERS } from '../../entities/partners/partners.data'
import { partnerApi } from '../../shared/api/partners'
import PartnersHero from '../../widgets/sections/partners/PartnersHero/PartnersHero'
import PartnersGrid from '../../widgets/sections/partners/PartnersGrid/PartnersGrid'
import './Partners.css'

export default function PartnersContent({ data: cmsData, lang: propLang }) {
  const { i18n } = useTranslation()
  const lang = propLang || i18n.language || 'ru'
  
  const [filter, setFilter] = useState('all')
  const [partnerMap, setPartnerMap] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    partnerApi.getGrouped()
      .then(res => setPartnerMap(res))
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="lyt-loading" style={{ height: '100vh' }} />

  const lbl = { ...(STATIC_LABELS[lang] || STATIC_LABELS.ru), ...cmsData }
  
  const pData = partnerMap || { intl: [], corp: [], natl: [], inst: [] }

  const cats = [
    { key:'intl', title:lbl.intlTitle, desc:lbl.intlDesc, items:pData.intl || [], num:'01' },
    { key:'corp', title:lbl.corpTitle, desc:lbl.corpDesc, items:pData.corp || [], num:'02' },
    { key:'natl', title:lbl.natlTitle, desc:lbl.natlDesc, items:pData.natl || [], num:'03' },
    { key:'inst', title:lbl.instTitle, desc:lbl.instDesc, items:pData.inst || [], num:'04' },
  ]
  
  const displayed = filter === 'all' ? cats : cats.filter(c => c.key === filter)
  const total = cats.reduce((s, c) => s + c.items.length, 0)

  const heroStats = [
    { value:`${total}+`, label:lang==='ru'?'Всего партнёров':lang==='en'?'Total Partners':'Барлық серіктес' },
    { value:pData.intl?.length || 0, label:lbl.intlTitle },
    { value:pData.corp?.length || 0, label:lbl.corpTitle },
    { value:pData.natl?.length || 0, label:lbl.natlTitle },
  ]

  return (
    <>
      <div className="part2-filters-container">
        <div className="part2-filters">
          <button className={`part2-filter-btn${filter==='all'?' active':''}`} onClick={() => setFilter('all')}>
            {lang==='ru'?'Все':lang==='en'?'All':'Барлығы'}
          </button>
          {cats.map(cat => (
            <button 
              key={cat.key} 
              className={`part2-filter-btn${filter===cat.key?' active':''}`} 
              onClick={() => setFilter(cat.key)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>
      <PartnersGrid cats={displayed} lang={lang} lbl={lbl} />
      <section className="part2-coop">
        <div className="part2-coop-inner">
          <div className="part2-section-head">
            <div className="part2-eyebrow-line"><span className="part2-eyebrow-gem"/>{lbl.coopLabel}</div>
            <h2 className="part2-section-title">{lbl.coopTitle}</h2>
          </div>
          <div className="part2-coop-grid">
            {(STATIC_PARTNERS.COOPERATION || []).map((item,i) => (
              <div key={i} className="part2-coop-card">
                <span className="part2-coop-num">{String(i+1).padStart(2,'0')}</span>
                <span className="part2-coop-title">{item.title[lang] || item.title.ru}</span>
                <p className="part2-coop-text">{item.desc[lang] || item.desc.ru}</p>
                <div className="part2-coop-bar"/>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="part2-cta">
        <div className="part2-cta-bg"/>
        <div className="part2-cta-inner">
          <div className="part2-cta-eyebrow"><span className="part2-cta-gem"/>GBWC</div>
          <h2 className="part2-cta-title">{lbl.ctaTitle}</h2>
          <p className="part2-cta-text">{lbl.ctaText}</p>
          <a href={`mailto:${lbl.ctaEmail}`} className="part2-cta-btn">{lbl.ctaBtn}</a>
        </div>
      </section>
    </>
  )
}
