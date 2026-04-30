import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../shared/hooks/useLang'
import { MotionSection } from '../../shared/animations/MotionSection'
import { leaders as leadersApi } from '../../services/api'
import './HomeKeyPeople.css'

const PEOPLE = [
  { name: 'Одиль Рено-Бассо', title: { ru: 'Президент EBRD', en: 'President, EBRD', kk: 'ЕҚДБ Президенті' }, org: 'EBRD', photo: '/img/plenary/Одиль Рено-Бассо.jpg', sessions: [1,2,3], type: 'intl' },
  { name: 'Кирсти Уилсон', title: { ru: 'Зам. председателя Baker McKenzie', en: 'Deputy Chair, Baker McKenzie', kk: 'Baker McKenzie вице-төрайымы' }, org: 'Baker McKenzie', photo: '/img/plenary/Кирсти Уилсон.jpg', sessions: [1,3], type: 'corp' },
  { name: 'Антонелла Бассани', title: { ru: 'Вице-президент Всемирного банка', en: 'VP, World Bank Europe & CA', kk: 'Дүниежүзілік банк VP' }, org: 'World Bank', photo: '/img/plenary/Антонелла Бассани.jpeg', sessions: [1], type: 'intl' },
  { name: 'Джули Монако', title: { ru: 'Управляющий директор Citi', en: 'Managing Director, Citi', kk: 'Citi MD' }, org: 'Citi', photo: '/img/plenary/Джули Монако.png', sessions: [1], type: 'corp' },
  { name: 'Аида Балаева', title: { ru: 'Зам. Руководителя Администрации Президента РК', en: 'Deputy Head, Presidential Administration', kk: 'ҚР Президенті Әкімшілігі жетекшісінің орынбасары' }, org: 'Администрация Президента РК', photo: '/img/plenary/Аида Балаева.webp', sessions: [1,2], type: 'govt' },
  { name: 'Эльвира Азимова', title: { ru: 'Председатель Конституционного Суда РК', en: 'Chair, Constitutional Court of Kazakhstan', kk: 'ҚР Конституциялық Соты Төрайымы' }, org: 'Конституционный Суд РК', photo: '/img/plenary/Эльвира Азимова.jpg', sessions: [1,2], type: 'govt' },
  { name: 'Ажар Гиният', title: { ru: 'Министр здравоохранения РК', en: 'Minister of Healthcare, Kazakhstan', kk: 'ҚР Денсаулық сақтау министрі' }, org: 'Министерство здравоохранения РК', photo: '/img/plenary/Ажар Гиният.jpg', sessions: [1,2], type: 'govt' },
  { name: 'Тамара Дуйсенова', title: { ru: 'Министр труда и социальной защиты РК', en: 'Minister of Labour, Kazakhstan', kk: 'ҚР Еңбек министрі' }, org: 'Министерство труда РК', photo: '/img/plenary/Тамара Дуйсенова.jpeg', sessions: [1], type: 'govt' },
  { name: 'Гаухар Бурибаева', title: { ru: 'Председатель Правления Фонда «Даму»', en: 'CEO, Damu Entrepreneurship Development Fund', kk: '«Даму» қоры Басқарма Төрайымы' }, org: 'Фонд «Даму»', photo: '/img/plenary/Гаухар Бурибаева.jpg', sessions: [1], type: 'govt' },
  { name: 'Катаржина Вавьерниа', title: { ru: 'Постоянный представитель ПРООН в РК', en: 'UNDP Resident Representative in Kazakhstan', kk: 'БҰҰДБ тұрақты өкілі' }, org: 'UNDP', photo: '/img/plenary/Катаржина Вавьерниа.jpg', sessions: [2], type: 'intl' },
  { name: 'Мишель Симмонс', title: { ru: 'Президент Microsoft в ЦЕ и ЦА', en: 'President, Microsoft CE & Central Asia', kk: 'Microsoft президенті' }, org: 'Microsoft', photo: '/img/plenary/Мишель Симмонс.jpg', sessions: [2], type: 'corp' },
  { name: 'Марине Бабаян', title: { ru: 'Директор по корпоративным связям VEON', en: 'Global Director of Corporate Affairs, VEON', kk: 'VEON корпоративтік байланыстар директоры' }, org: 'VEON', photo: '/img/plenary/Марине Бабаян.jpg', sessions: [2,3], type: 'corp' },
  { name: 'Акмарал Альназарова', title: { ru: 'Министр труда и социальной защиты РК', en: 'Minister of Labour, Kazakhstan', kk: 'ҚР Еңбек министрі' }, org: 'Министерство труда РК', photo: '/img/plenary/Акмарал Альназарова.jpg', sessions: [2], type: 'govt' },
  { name: 'Ербек Кошербаев', title: { ru: 'Аким города Астана', en: 'Akim of Astana', kk: 'Астана қаласының Әкімі' }, org: 'Акимат Астаны', photo: '/img/plenary/Ербек Кошербаев.jpg', sessions: [2], type: 'govt' },
  { name: 'Эмили Муран-Ренуар', title: { ru: 'Вице-президент Air Liquide', en: 'Vice President, Air Liquide', kk: 'Air Liquide вице-президенті' }, org: 'Air Liquide', photo: '/img/plenary/Эмили Муран-Ренуар.png', sessions: [3], type: 'corp' },
  { name: 'Асель Жанасова', title: { ru: 'Советник Президента РК', en: 'Advisor to the President of Kazakhstan', kk: 'ҚР Президентінің кеңесшісі' }, org: 'Администрация Президента РК', photo: '/img/plenary/Асель Жанасова.jpg', sessions: [3], type: 'govt' },
  { name: 'Динара Щеглова', title: { ru: 'Вице-министр науки и высшего образования РК', en: 'Vice Minister of Science & Higher Education, Kazakhstan', kk: 'ҚР Ғылым және жоғары білім вице-министрі' }, org: 'Министерство науки РК', photo: '/img/plenary/Динара Щеглова.jpg', sessions: [3], type: 'govt' },
]

const TYPE_ACCENT = { intl: '#4a7fc1', corp: '#b8914a', govt: '#6b8f71' }
const ROMAN = ['I','II','III']

const LABELS = {
  ru: { label: 'УЧАСТНИКИ', title: 'Ключевые участники', sub: 'Руководители международных организаций, корпораций и государственных институтов на пленарных заседаниях GBWC', cta: 'Все пленарные заседания' },
  en: { label: 'PARTICIPANTS', title: 'Key Participants', sub: 'Leaders of international organisations, corporations and government institutions at GBWC plenary sessions', cta: 'All plenary sessions' },
  kk: { label: 'ҚАТЫСУШЫЛАР', title: 'Негізгі қатысушылар', sub: 'GBWC пленарлық отырыстарына қатысқан басшылар', cta: 'Барлық отырыстар' },
}

function PersonCard({ person, resolveCMS }) {
  const initials = (resolveCMS(person.name) || '').split(' ').slice(0,2).map(w=>w[0]).join('')
  return (
    <div className="hkp-card">
      <div className="hkp-photo">
        <img src={person.photo} alt={resolveCMS(person.name)} loading="lazy"
          onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex' }}/>
        <div className="hkp-initials" style={{display:'none'}}>{initials}</div>
        <div className="hkp-overlay"/>
        <div className="hkp-badges">
          {(person.sessions || []).map(s => <span key={s} className="hkp-badge">{ROMAN[s-1]}</span>)}
        </div>
      </div>
      <div className="hkp-info">
        <div className="hkp-name">{resolveCMS(person.name)}</div>
        <div className="hkp-role" style={{color: TYPE_ACCENT[person.type] || 'var(--gold)'}}>{resolveCMS(person.role || person.title)}</div>
        <div className="hkp-org">{resolveCMS(person.org)}</div>
      </div>
    </div>
  )
}

export default function HomeKeyPeople({ data }) {
  const { lang, resolveCMS, resolveWithFallback } = useLang()
  const [leaders, setLeaders] = useState([])
  const defaultLbl = LABELS[lang] || LABELS.ru
  const lbl = {
    label: resolveWithFallback(data?.sectionLabel, defaultLbl.label),
    title: resolveWithFallback(data?.sectionTitle, defaultLbl.title),
    sub: resolveWithFallback(data?.ctaText, defaultLbl.sub),
    cta: resolveWithFallback(data?.btnText, defaultLbl.cta),
  }

  useEffect(() => {
    leadersApi.list({ limit: 100 })
      .then(res => {
        const items = Array.isArray(res) ? res : res.items || []
        if (items.length > 0) setLeaders(items)
      })
      .catch(() => {})
  }, [])

  let displayPeople = []
  if (data?.people && data.people.length > 0) {
    displayPeople = data.people
  } else if (leaders.length > 0) {
    displayPeople = leaders
  } else {
    displayPeople = PEOPLE
  }

  return (
    <section className="hkp">
      <div className="hkp-inner">
        <MotionSection animation="fadeUp" className="hkp-head">
          <div className="hkp-eyebrow"><span className="hkp-eye-line"/>{lbl.label}</div>
          <h2 className="hkp-title">{lbl.title}</h2>
          <p className="hkp-sub">{lbl.sub}</p>
        </MotionSection>
        <MotionSection animation="fadeUp" delay={0.1}>
          <div className="hkp-grid">
            {displayPeople.map((p,i) => (
               <PersonCard 
                 key={i} 
                 person={p} 
                 resolveCMS={resolveCMS}
               />
            ))}
          </div>
        </MotionSection>
        <div className="hkp-more">
          <Link to={`/${lang}/events`} className="lyt-btn lyt-btn--secondary">
            {lbl.cta}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12H19M19 12L13 6M19 12L13 18"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
