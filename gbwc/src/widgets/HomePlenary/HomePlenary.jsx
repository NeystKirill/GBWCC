import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../shared/hooks/useLang'
import { MotionSection, TiltCard } from '../../shared/animations/MotionSection'
import { PLENARY_DATA, PLENARY_LABELS } from '../../shared/constants/homeData'
import { sessions as sessionsApi } from '../../services/api'
import './HomePlenary.css'

const FALLBACK_PHOTOS = [
  { main: '/img/plenary/session1_group.jpeg', thumbs: ['/img/plenary/plenar1_5_main.jpg', '/img/plenary/session1_ribbon.jpeg'] },
  { main: '/img/plenary/plenar2_6.jpg',       thumbs: ['/img/plenary/plenar2_3.jpg',        '/img/plenary/plenar2_4.jpg'] },
  { main: '/img/plenary/session3_group.jpeg', thumbs: ['/img/plenary/session3_group.jpeg',  '/img/plenary/plenar1_5_main.jpg'] },
]

// Key facts per session (topics + results)
const SESSION_FACTS = {
  ru: [
    {
      topics: ['Развитие предпринимательства', 'Международное сотрудничество', 'Участие женщин в глобальной экономике', 'Устойчивые бизнес-модели'],
      results: ['Создание Глобального совета Женщин Бизнеса (GBWC)', 'Определение ключевых векторов деятельности Совета', 'Объединение участниц из 13+ стран'],
    },
    {
      topics: ['Зеленая экономика и развитие', 'Социальные инвестиции как фактор роста', 'Поддержка женского предпринимательства', 'Цифровая трансформация бизнеса'],
      results: ['GBWC стал оператором проекта Центров поддержки семьи', 'Подписаны меморандумы для реализации социальных программ', 'Запущена разработка рейтинговой системы G-Index'],
    },
    {
      topics: ['Социальные инвестиции', 'Роль женщин в экономике', 'Государственно-частное партнёрство', 'Устойчивое развитие'],
      results: ['Подписаны меморандумы с тремя министерствами РК', 'Согласована реализация цифровых и образовательных инициатив', 'Инициирован проект культурного обмена (выступление в Ватикане)'],
    },
  ],
  en: [
    {
      topics: ['Entrepreneurship development', 'International cooperation', 'Women in global economy', 'Sustainable business models'],
      results: ['Establishment of the Global Businesswomen Council (GBWC)', 'Defining the Council key activities', 'Uniting participants from 13+ countries'],
    },
    {
      topics: ['Green economy and development', 'Social investments as a growth factor', 'Support for women entrepreneurship', 'Business digital transformation'],
      results: ['GBWC became operator of pilot Family Support Centres', 'MoUs signed for social programmes implementation', 'G-Index rating system development launched'],
    },
    {
      topics: ['Social investments', "Women's role in economy", 'Public-private partnership', 'Sustainable development'],
      results: ['MoUs signed with three Kazakhstan ministries', 'Joint implementation of digital and educational initiatives agreed', 'Cultural exchange project initiated (choir performance at the Vatican)'],
    },
  ],
  kk: [
    {
      topics: ['Кәсіпкерлікті дамыту', 'Халықаралық ынтымақтастық', 'Әйелдердің жаһандық экономикаға қатысуы', 'Тұрақты бизнес-модельдер'],
      results: ['Global Businesswomen Council (GBWC) құрылды', 'Кеңес қызметінің негізгі бағыттары айқындалды', '13+ елден қатысушыларды біріктіру'],
    },
    {
      topics: ['Жасыл экономика және даму', 'Әлеуметтік инвестициялар', 'Әйелдер кәсіпкерлігін қолдау', 'Бизнесті цифрлық трансформациялау'],
      results: ['GBWC Отбасын қолдау орталықтарының операторы болды', 'Әлеуметтік бағдарламаларды жүзеге асыру үшін меморандумдарға қол қойылды', 'G-Index рейтингтік жүйесін әзірлеу басталды'],
    },
    {
      topics: ['Әлеуметтік инвестициялар', 'Әйелдердің экономикадағы рөлі', 'Мемлекеттік-жеке серіктестік', 'Тұрақты даму'],
      results: ['ҚР үш министрлігімен меморандумдарға қол қойылды', 'Цифрлық және білім беру бастамаларын бірлесіп жүзеге асыру келісілді', 'Мәдени алмасу жобасы басталды (Ватиканда өнер көрсету)'],
    },
  ],
}

function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : '' }

export default function HomePlenary({ data }) {
  const { lang, resolveCMS } = useLang()
  const [active, setActive] = useState(0)
  const [apiSessions, setApiSessions] = useState(null)

  const staticSessions = PLENARY_DATA[lang] || PLENARY_DATA.ru
  const fallbackLbl = PLENARY_LABELS[lang] || PLENARY_LABELS.ru
  const lbl = data && Object.keys(data).length > 0 ? { ...fallbackLbl, ...data } : fallbackLbl
  const facts = SESSION_FACTS[lang] || SESSION_FACTS.ru

  useEffect(() => {
    sessionsApi.list({ limit: 5 })
      .then(data => {
        const items = Array.isArray(data) ? data : data?.items || []
        if (items.length > 0) setApiSessions(items)
      })
      .catch(() => {})
  }, [lang])

  const formatArray = (arr) => Array.isArray(arr) ? arr.map(i => typeof i === 'object' && i.text ? i.text : i) : [];

  let sessions = [];
  if (apiSessions && apiSessions.length > 0) {
    // ALWAYS use global sessions list for "interconnected" experience
    sessions = apiSessions.map(s => {
      // Get first 3 photos from localPhotos or gallery as fallback
      const album = s.localPhotos || [];
      const displayGallery = album.length > 0 ? album.slice(0, 3) : (s.cover ? [s.cover] : []);

      const tSafe = (val) => {
        if (!val) return ''
        if (typeof val === 'string') return val
        if (typeof val === 'object') return val[lang] || val.ru || val.en || val.text || ''
        return String(val)
      }

      return {
        id: s.id, 
        title: tSafe(s.theme) || (s.number ? `${lang === 'en' ? 'Session' : 'Заседание'} ${s.number}` : 'Session'),
        year: s.year, 
        desc: tSafe(s.desc),
        cover: displayGallery[0] || s.cover, 
        gallery: displayGallery,
        topics: Array.isArray(s.topics?.[lang] || s.topics) ? (s.topics?.[lang] || s.topics).map(t => tSafe(t)) : [],
        results: Array.isArray(s.results?.[lang] || s.results) ? (s.results?.[lang] || s.results).map(r => tSafe(r)) : [],
      };
    });
  } else {
    // Fallback to static data from constants if API hasn't loaded or is empty
    sessions = staticSessions.map((st, i) => ({
      ...st,
      ...facts[i]
    }));
  }

  const s = sessions[Math.min(active, sessions.length - 1)] || {}
  const p = FALLBACK_PHOTOS[Math.min(active, FALLBACK_PHOTOS.length - 1)] || {}

  const mainPhoto = s.cover || p.main || ''
  const thumbPhotos = Array.isArray(s.localPhotos) && s.localPhotos.length >= 2 ? s.localPhotos.slice(0, 2) : p.thumbs || []

  const topicsLabel = lang === 'en' ? 'Topics' : lang === 'kk' ? 'Тақырыптар' : 'Темы'
  const resultsLabel = lang === 'en' ? 'Key outcomes' : lang === 'kk' ? 'Нәтижелер' : 'Ключевые итоги'

  return (
    <section className="hp">
      <div className="hp-inner">
        <MotionSection animation="fadeUp" className="hp-header">
          <div className="hp-label"><span className="hp-label-l" />{resolveCMS(lbl.sectionLabel)}</div>
          <h2 className="hp-title">{resolveCMS(lbl.sectionTitle)}</h2>
        </MotionSection>

        <MotionSection animation="fadeUp" delay={.15} className="hp-tabs">
          {sessions.map((se, i) => (
            <button key={i} className={`hp-tab${i === active ? ' on' : ''}`} onClick={() => setActive(i)}>
              <span className="hp-tab-n">{String(i + 1).padStart(2, '0')}</span>
              <span className="hp-tab-t">{se.title}</span>
              <span className="hp-tab-y">{se.year}</span>
              {i === active && <span className="hp-tab-bar" />}
            </button>
          ))}
        </MotionSection>

        <MotionSection animation="fadeUp" delay={.2} className="hp-content">
          {/* Left — photos */}
          <div className="hp-photos">
            <TiltCard className="hp-main-photo" intensity={5}>
              <img src={mainPhoto} alt={s.title} loading="lazy" />
              <div className="hp-photo-shine" />
            </TiltCard>
            <div className="hp-thumbs">
              {thumbPhotos.map((thumb, i) => (
                <TiltCard key={i} className="hp-thumb" intensity={8}>
                  <img src={thumb} alt="" loading="lazy" />
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Right — info + dark facts card */}
          <div className="hp-info">
            <div className="hp-session-label">{resolveCMS(lbl.sectionLabel)} · {s.year}</div>
            <h3 className="hp-session-title">{s.title}</h3>
            <p className="hp-session-desc">{s.desc}</p>

            {/* Dark facts card */}
            <div className="hp-facts-card">
              <div className="hp-facts-section">
                <div className="hp-facts-label">{topicsLabel}</div>
                <ul className="hp-facts-list">
                  {(Array.isArray(s.topics) ? s.topics : []).map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
              {s.results && (
                <div className="hp-facts-section">
                  <div className="hp-facts-label">{resultsLabel}</div>
                  <ul className="hp-facts-list hp-facts-list--results">
                    {(Array.isArray(s.results) ? s.results : []).map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              )}
            </div>

            <Link to={`/${lang}/events`} className="hp-cta">
              {resolveCMS(lbl.more)}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" />
              </svg>
            </Link>
          </div>
        </MotionSection>
      </div>
    </section>
  )
}
