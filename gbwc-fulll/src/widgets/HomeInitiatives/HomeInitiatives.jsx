import { Link } from 'react-router-dom'
import { MotionSection } from '../../shared/animations/MotionSection'
import './HomeInitiatives.css'

/* Each initiative: id matches anchor on /initiatives page */
const ITEMS = {
  ru: [
    {
      id: 'gindex', num: '01',
      tag: 'Аналитика & Институт',
      title: 'G-Index Initiative',
      desc: 'Институциональная инициатива по развитию аналитических инструментов и программ поддержки предпринимательства женщин.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="28" width="6" height="12" rx="1" fill="rgba(184,145,74,.6)"/>
          <rect x="18" y="20" width="6" height="20" rx="1" fill="rgba(184,145,74,.75)"/>
          <rect x="28" y="12" width="6" height="28" rx="1" fill="rgba(184,145,74,.9)"/>
          <rect x="38" y="6" width="6" height="34" rx="1" fill="#b8914a"/>
          <line x1="8" y1="42" x2="44" y2="42" stroke="rgba(184,145,74,.3)" strokeWidth="1"/>
        </svg>
      ),
    },
    {
      id: 'hub', num: '02',
      tag: 'Инфраструктура',
      title: 'G-Index Hub',
      desc: 'Аналитический, экспертный и координационный центр. Цифровая платформа hub.gbwc.org.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="5" fill="#b8914a"/>
          {[[24,6],[40,16],[40,32],[24,42],[8,32],[8,16]].map(([x,y],i) => (
            <g key={i}>
              <line x1="24" y1="24" x2={x} y2={y} stroke="rgba(184,145,74,.35)" strokeWidth="1.5" strokeDasharray="3 2"/>
              <circle cx={x} cy={y} r="3.5" fill="rgba(184,145,74,.5)"/>
            </g>
          ))}
        </svg>
      ),
    },
    {
      id: 'academy', num: '03',
      tag: 'Образование',
      title: 'G-Index Academy',
      desc: 'Образовательные программы профессионального развития: предпринимательство, управление, цифровые компетенции.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="24,8 40,18 24,28 8,18" fill="none" stroke="#b8914a" strokeWidth="1.5"/>
          <line x1="40" y1="18" x2="40" y2="30" stroke="rgba(184,145,74,.6)" strokeWidth="1.5"/>
          <circle cx="40" cy="32" r="2.5" fill="rgba(184,145,74,.7)"/>
          {[0,1,2,3].map(i => (
            <rect key={i} x={10+i*7} y={40-i*6-6} width="5" height={i*6+6} rx="1"
              fill={`rgba(184,145,74,${0.3+i*0.2})`}/>
          ))}
        </svg>
      ),
    },
    {
      id: 'itaiel', num: '04',
      tag: 'Цифровые навыки',
      title: 'Цифровые компетенции',
      desc: 'Развитие цифровых компетенций и технологических навыков женщин-предпринимателей в странах-партнёрах.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {[[10,10],[22,8],[34,14],[14,24],[26,20],[38,26],[10,36],[24,32],[36,38]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(184,145,74,.55)"/>
          ))}
          {[[10,10,22,8],[22,8,34,14],[10,10,14,24],[22,8,26,20],[34,14,38,26],[14,24,26,20],[26,20,38,26],[14,24,10,36],[26,20,24,32],[38,26,36,38]].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(184,145,74,.2)" strokeWidth="1"/>
          ))}
          
        </svg>
      ),
    },
    {
      id: 'social', num: '05',
      tag: 'Социальные проекты',
      title: 'Центры поддержки семьи',
      desc: 'Оператор пилотных Центров поддержки семьи в Акмолинской, СКО и Улытауской областях Казахстана.',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,20 Q14,10 24,14 Q34,10 38,20 Q40,30 24,40 Q8,30 10,20Z" fill="none" stroke="rgba(184,145,74,.3)" strokeWidth="1.5"/>
          {[[20,22,'А'],[30,18,'С'],[22,32,'У']].map(([cx,cy,l],i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="4" fill="rgba(184,145,74,.55)"/>
              <circle cx={cx} cy={cy} r="8" fill="none" stroke="rgba(184,145,74,.15)" strokeWidth="1"/>
              <text x={cx} y={cy+3} textAnchor="middle" fontSize="5" fill="rgba(255,255,255,.7)" fontFamily="sans-serif" fontWeight="700">{l}</text>
            </g>
          ))}
        </svg>
      ),
    },
    {
      id: 'culture', num: '06',
      tag: 'Культурная дипломатия',
      title: 'Культурные инициативы',
      desc: 'Международные культурные проекты. Выступление хоровой капеллы КазНУИ в Ватикане (май 2025).',
      icon: (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="24" cy="22" rx="10" ry="4" fill="none" stroke="rgba(184,145,74,.35)" strokeWidth="1.5"/>
          <rect x="19" y="16" width="10" height="13" fill="rgba(184,145,74,.1)" stroke="rgba(184,145,74,.35)" strokeWidth="1.5"/>
          <path d="M14,29 L34,29 L34,38 L14,38 Z" fill="rgba(184,145,74,.07)" stroke="rgba(184,145,74,.3)" strokeWidth="1.5"/>
          <line x1="14" y1="29" x2="8" y2="38" stroke="rgba(184,145,74,.25)" strokeWidth="1"/>
          <line x1="34" y1="29" x2="40" y2="38" stroke="rgba(184,145,74,.25)" strokeWidth="1"/>
          <text x="10" y="22" fontSize="10" fill="rgba(184,145,74,.4)" fontFamily="serif">♪</text>
          <text x="32" y="18" fontSize="9" fill="rgba(184,145,74,.35)" fontFamily="serif">♫</text>
        </svg>
      ),
    },
  ],
}

// Copy for en/kk with translated titles/tags/descs
ITEMS.en = ITEMS.ru.map(item => ({
  ...item,
  tag: ['Analytics & Institution','Infrastructure','Education','Digital Skills','Social Projects','Cultural Diplomacy'][ITEMS.ru.indexOf(item)],
  title: item.title,
  desc: [
    'Institutional initiative for developing analytical tools and women entrepreneurship support programmes.',
    'Analytical, expert and coordination centre. Digital platform hub.gbwc.org.',
    'Professional development programmes: entrepreneurship, management and digital competencies.',
    'Developing digital competencies and technology skills among women entrepreneurs in partner countries.',
    'Operator of pilot Family Support Centres in Akmola, North Kazakhstan and Ulytau regions.',
    'International cultural projects. KazNUI choir performed at the Vatican, May 2025.',
  ][ITEMS.ru.indexOf(item)],
}))

ITEMS.kk = ITEMS.ru.map(item => ({
  ...item,
  tag: ['Аналитика & Институт','Инфрақұрылым','Білім беру','Цифрлық дағдылар','Әлеуметтік жобалар','Мәдени дипломатия'][ITEMS.ru.indexOf(item)],
  title: ['G-Index Initiative','G-Index Hub','G-Index Academy','IT-AIEL','Отбасын қолдау орталықтары','Мәдени бастамалар'][ITEMS.ru.indexOf(item)],
  desc: [
    'Аналитикалық құралдар мен кәсіпкерлік қолдау бағдарламаларын дамытуға арналған бастама.',
    'Аналитикалық, сараптамалық және үйлестіру орталығы. hub.gbwc.org цифрлық платформасы.',
    'Кәсіптік даму бағдарламалары: кәсіпкерлік, басқару және цифрлық дағдылар.',
    'Серіктес елдердегі әйел кәсіпкерлердің цифрлық дағдыларын дамыту.',
    'Ақмола, СҚО және Ұлытау облыстарындағы пилоттық Отбасын қолдау орталықтарының операторы.',
    'Халықаралық мәдени жобалар. ҚазНӨУ хор капелласының Ватикандағы өнер көрсетуі (мамыр 2025).',
  ][ITEMS.ru.indexOf(item)],
}))

const LABELS = {
  ru: { eye: 'ИНИЦИАТИВЫ', title: 'Наши инициативы', sub: 'Шесть направлений деятельности GBWC — от аналитики и образования до культурной дипломатии', btn: 'Все инициативы', more: 'Узнать подробнее' },
  en: { eye: 'INITIATIVES', title: 'Our initiatives', sub: 'Six GBWC activity areas — from analytics and education to cultural diplomacy', btn: 'All initiatives', more: 'Learn more' },
  kk: { eye: 'БАСТАМАЛАР', title: 'Біздің бастамаларымыз', sub: 'GBWC-нің алты қызмет бағыты — аналитикадан мәдени дипломатияға дейін', btn: 'Барлық бастамалар', more: 'Толығырақ' },
}

export default function HomeInitiatives({ lang }) {
  const items = ITEMS[lang] || ITEMS.ru
  const lbl   = LABELS[lang] || LABELS.ru

  return (
    <section className="hi2">
      <div className="hi2-inner">
        <div className="hi2-card-wrap">

        {/* Header */}
        <MotionSection animation="fadeUp" className="hi2-head">
          <div className="hi2-eyebrow">
            <span className="hi2-eye-gem"/>
            {lbl.eye}
          </div>
          <h2 className="hi2-title">{lbl.title}</h2>
          <p className="hi2-sub">{lbl.sub}</p>
        </MotionSection>

        {/* Grid */}
        <MotionSection animation="fadeUp" delay={0.1}>
          <div className="hi2-grid">
            {items.map((item, i) => (
              <Link
                key={item.id}
                to={`/${lang}/initiatives#initiative-${item.id}`}
                className="hi2-card"
              >
                {/* Number */}
                <div className="hi2-card-num">{item.num}</div>

                {/* Icon */}
                <div className="hi2-card-icon">{item.icon}</div>

                {/* Top accent line — appears on hover */}
                <div className="hi2-card-line"/>

                {/* Content */}
                <div className="hi2-card-tag">{item.tag}</div>
                <h3 className="hi2-card-title">{item.title}</h3>
                <p className="hi2-card-desc">{item.desc}</p>

                {/* Link */}
                <span className="hi2-card-cta">
                  {lbl.more}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18"/>
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </MotionSection>

        </div>{/* hi2-card-wrap */}

        {/* Bottom CTA */}
        <MotionSection animation="fadeUp" delay={0.2}>
          <div className="hi2-footer">
            <Link to={`/${lang}/initiatives`} className="hi2-all-btn">
              {lbl.btn}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12H19M19 12L13 6M19 12L13 18"/>
              </svg>
            </Link>
          </div>
        </MotionSection>

      </div>
    </section>
  )
}
