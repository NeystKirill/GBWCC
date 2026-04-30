import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { LABELS, CATEGORIES } from '../../entities/media/media.labels'
import { STATIC_ARTICLES } from '../../entities/media/media.data'
import { mediaApi } from '../../shared/api/media'
import { news as newsApi } from '../../services/api'
import MediaHero from '../../widgets/sections/media/MediaHero/MediaHero'
import MediaGrid from '../../widgets/sections/media/MediaGrid/MediaGrid'
import './Media.css'

export default function MediaContent({ data: cmsData, lang: propLang }) {
  const { i18n } = useTranslation()
  const lang = propLang || i18n.language || 'ru'

  const [filter, setFilter] = useState('all')
  const [articles, setArticles] = useState([])
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      mediaApi.list({ sort: 'sort_order' }).catch(() => []),
      newsApi.list({ published: 'true', limit: 100 }).catch(() => []),
    ]).then(([mediaRes, newsRes]) => {
      setArticles(Array.isArray(mediaRes) ? mediaRes : mediaRes?.items || [])
      setNewsItems(Array.isArray(newsRes) ? newsRes : newsRes?.items || [])
    }).finally(() => setLoading(false))
  }, [])

  const lbl = { ...(LABELS[lang] || LABELS.ru), ...cmsData }

  const dynamicItems = articles.map(a => ({
    ...a,
    title: a.title?.[lang] || a.title?.ru || '',
    date: a.date?.[lang] || a.date?.ru || '',
  }))

  const mappedNews = newsItems.map(n => ({
    id: n.id || n._id,
    category: 'news',
    source: n.source || 'GBWC',
    url: n.source_url || '#',
    image: n.cover || '',
    title: n.title?.[lang] || n.title?.ru || '',
    date: n.published_at ? new Date(n.published_at).toLocaleDateString(lang === 'ru' ? 'ru-RU' : lang === 'kk' ? 'kk-KZ' : 'en-US', { year: 'numeric', month: 'long' }) : '',
  }))

  const allArticles = [...dynamicItems, ...mappedNews]

  const filtered = filter === 'all' ? allArticles : allArticles.filter(a => a.category === filter || a.type === filter)

  const stats = [
    { value: allArticles.length, label: lang==='ru'?'Публикаций':lang==='en'?'Publications':'Жарияланым' },
    { value: CATEGORIES.length - 1, label: lang==='ru'?'Категории':lang==='en'?'Categories':'Санат' },
    { value: '3', label: lang==='ru'?'Языка':lang==='en'?'Languages':'Тіл' },
  ]

  return (
    <>
      <div className="med-container">
        <div className="med-filters-row">
          <div className="med-filters">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`med-filter-btn${filter===cat?' active':''}`}
                onClick={() => setFilter(cat)}
              >
                {lbl[cat]}
              </button>
            ))}
          </div>
        </div>
        <MediaGrid articles={filtered} lang={lang} readLabel={lbl.read} />
      </div>
    </>
  )
}
