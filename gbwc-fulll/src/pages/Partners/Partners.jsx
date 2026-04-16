import { useEffect, useState } from 'react'
import PageLayout   from '../../shared/ui/PageLayout'
import { useLang }  from '../../shared/hooks/useLang'
import { PARTNERS } from '../../entities/partners/partners.data'
import { LABELS }   from '../../entities/partners/partners.labels'
import PageHero     from '../../shared/layout/PageHero/PageHero'
import PartnersGrid from '../../widgets/sections/partners/PartnersGrid/PartnersGrid'
import '../../widgets/sections/partners/partners.css'

export default function Partners() {
  const { t, lang }    = useLang()
  const lbl            = LABELS[lang] || LABELS.ru
  const [filter, setFilter] = useState('all')
  useEffect(() => { document.title = t.pages.partners }, [t])

  const cats = [
    { key:'intl', title:lbl.intlTitle, desc:lbl.intlDesc, items:PARTNERS.intl,    num:'01' },
    { key:'corp', title:lbl.corpTitle, desc:lbl.corpDesc, items:PARTNERS.corp,    num:'02' },
    { key:'natl', title:lbl.natlTitle, desc:lbl.natlDesc, items:PARTNERS.natl,    num:'03' },
    { key:'inst', title:lbl.instTitle, desc:lbl.instDesc, items:PARTNERS.inst||[],num:'04' },
  ]
  const displayed = filter === 'all' ? cats : cats.filter(c => c.key === filter)
  const total = cats.reduce((s, c) => s + c.items.length, 0)

  const heroStats = [
    { value:`${total}+`, label:lang==='ru'?'Всего партнёров':lang==='en'?'Total Partners':'Барлық серіктес' },
    { value:PARTNERS.intl.length, label:lbl.intlTitle },
    { value:PARTNERS.corp.length, label:lbl.corpTitle },
    { value:PARTNERS.natl.length, label:lbl.natlTitle },
  ]

  return (
    <PageLayout>
      <PageHero label={lbl.eyebrow} title={lbl.heroTitle} desc={lbl.heroDesc} stats={heroStats} />
      <div className="part2-filters-bar">
        <div className="part2-filters-inner">
          {[{k:'all',label:lbl.filterAll},{k:'intl',label:lbl.filterIntl},{k:'corp',label:lbl.filterCorp},{k:'natl',label:lbl.filterNatl},{k:'inst',label:lbl.filterInst}].map(f => (
            <button key={f.k} className={`part2-filter-btn${filter===f.k?' active':''}`} onClick={()=>setFilter(f.k)}>{f.label}</button>
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
            {lbl.coopItems.map((item,i) => (
              <div key={i} className="part2-coop-card">
                <span className="part2-coop-num">{String(i+1).padStart(2,'0')}</span>
                <span className="part2-coop-title">{item.title}</span>
                <p className="part2-coop-text">{item.desc}</p>
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
    </PageLayout>
  )
}
