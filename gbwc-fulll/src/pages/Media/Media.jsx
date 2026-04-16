import { useEffect, useState } from 'react'
import PageLayout   from '../../shared/ui/PageLayout'
import { useLang }  from '../../shared/hooks/useLang'
import { ARTICLES } from '../../entities/media/media.data'
import { LABELS, CATEGORIES } from '../../entities/media/media.labels'
import PageHero  from '../../shared/layout/PageHero/PageHero'
import MediaGrid from '../../widgets/sections/media/MediaGrid/MediaGrid'
import '../../widgets/sections/media/media.css'

export default function Media() {
  const { t, lang }         = useLang()
  const lbl                 = LABELS[lang] || LABELS.ru
  const [filter, setFilter] = useState('all')
  useEffect(() => { document.title = t.pages.media }, [t])

  const filtered = filter === 'all' ? ARTICLES : ARTICLES.filter(a => a.category === filter)

  const stats = [
    { value: ARTICLES.length,           label: lang==='ru'?'Публикаций':lang==='en'?'Publications':'Жарияланым' },
    { value: CATEGORIES.length - 1,     label: lang==='ru'?'Категории':lang==='en'?'Categories':'Санат' },
    { value: '3',                        label: lang==='ru'?'Языка':lang==='en'?'Languages':'Тіл' },
  ]

  return (
    <PageLayout>
      <PageHero label="GBWC" title={lbl.title} desc={lbl.subtitle} stats={stats} />
      <section className="med-section">
        <div className="med-inner">
          <div className="med-filters">
            {CATEGORIES.map(cat => (
              <button key={cat} className={`med-filter-btn${filter===cat?' active':''}`} onClick={() => setFilter(cat)}>
                {lbl[cat]}
              </button>
            ))}
          </div>
          <MediaGrid articles={filtered} lang={lang} readLabel={lbl.read} />
        </div>
      </section>
    </PageLayout>
  )
}
