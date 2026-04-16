import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MotionSection } from '../../shared/animations/MotionSection'
import './HomeGallery.css'

const GALLERY = [
  { src:'/img/plenary/IMG_1823.jpg',      year:'2023', caption:'I Пленарное заседание',  ratio:'wide', featured:true },
  { src:'/img/plenary/plenar1_2.jpg',     year:'2023', caption:'Астана, 2023',           ratio:'std' },
  { src:'/img/plenary/IMG_1906.jpg',      year:'2023', caption:'Панельная дискуссия',    ratio:'std' },
  { src:'/img/plenary/IMG_2801.jpg',      year:'2024', caption:'II Пленарное заседание', ratio:'wide', featured:true },
  { src:'/img/plenary/IMG_2918.jpg',      year:'2024', caption:'Астана, 2024',           ratio:'std' },
  { src:'/img/plenary/plenar2_3.jpg',     year:'2024', caption:'Подписание соглашений',  ratio:'std' },
  { src:'/img/plenary/IMG_5537.jpg',      year:'2025', caption:'III Пленарное заседание',ratio:'wide', featured:true },
  { src:'/img/plenary/IMG_6030-2.jpg',    year:'2025', caption:'Астана, 2025',           ratio:'std' },
  { src:'/img/plenary/IMG_5843.jpg',      year:'2025', caption:'Стратегический диалог',  ratio:'std' },
]
const LABELS = {
  ru: { label:'Галерея', title:'Фотогалерея', sub:'Избранные моменты пленарных заседаний и ключевых событий', all:'Все фото', filters:['Все','2023','2024','2025'] },
  en: { label:'Gallery', title:'Photo Gallery', sub:'Selected moments from plenary sessions and key events', all:'All photos', filters:['All','2023','2024','2025'] },
  kk: { label:'Галерея', title:'Фотогалерея', sub:'Пленарлық сессиялардың таңдаулы сәттері', all:'Барлық фото', filters:['Барлығы','2023','2024','2025'] },
}

export default function HomeGallery({ lang }) {
  const lbl = LABELS[lang] || LABELS.ru
  const [activeFilter, setActiveFilter] = useState(lbl.filters[0])
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('hg-in'); io.disconnect() } }, { threshold:0.05 })
    io.observe(el); return () => io.disconnect()
  }, [])

  const filterKey = activeFilter === lbl.filters[0] ? null : activeFilter
  const visible = filterKey ? GALLERY.filter(g => g.year === filterKey) : GALLERY

  return (
    <section className="home-gallery" ref={ref}>
      <div className="hg-inner">
        <MotionSection animation="fadeUp" className="hg-header">
          <div className="hg-label"><span className="hg-label-line" />{lbl.label}</div>
          <h2 className="hg-title">{lbl.title}</h2>
          <p className="hg-sub">{lbl.sub}</p>
        </MotionSection>

        <div className="hg-filters">
          {lbl.filters.map(f => (
            <button key={f} className={`hg-filter-btn${activeFilter===f?' active':''}`} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>

        <div className="hg-grid">
          {visible.map((item, i) => (
            <div key={i} className={`hg-tile hg-tile--${item.ratio}${item.featured?' hg-tile--featured':''}`}>
              <img src={item.src} alt={item.caption} loading="lazy" />
              <div className="hg-tile-overlay">
                <span className="hg-tile-caption">{item.caption}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hg-more">
          <Link to={`/${lang}/media`} className="lyt-btn lyt-btn--secondary">
            {lbl.all}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
