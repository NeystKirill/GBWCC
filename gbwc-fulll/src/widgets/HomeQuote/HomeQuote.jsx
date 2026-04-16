import { MotionSection } from '../../shared/animations/MotionSection'
import './HomeQuote.css'

const DATA = {
  ru: {
    eyebrow: 'НАША МИССИЯ',
    title: 'Строить мосты между лидерами',
    lead: 'GBWC — это международная платформа, где женщины-лидеры в бизнесе, государственных институтах и международных организациях встречаются для диалога, обмена опытом и совместных инициатив.',
    pillars: [
      { icon: '◆', label: 'Диалог', text: 'Нейтральное пространство для честного и стратегического обмена между государством, бизнесом и международными организациями.' },
      { icon: '◈', label: 'Партнёрство', text: 'Долгосрочные партнёрства между корпорациями, финансовыми институтами и государственными структурами.' },
      { icon: '◉', label: 'Влияние', text: 'Формирование рекомендаций и инициатив, которые становятся частью реальной повестки на национальном и международном уровне.' },
    ],
    quote: '«Мы создаём пространство, где лидеры могут влиять на глобальную повестку и формировать инклюзивное будущее мировой экономики.»',
    author: 'Жанна Байдашева',
    role: 'Основатель GBWC',
  },
  en: {
    eyebrow: 'OUR MISSION',
    title: 'Building bridges between leaders',
    lead: 'GBWC is an international platform where women leaders in business, government institutions and international organisations meet for dialogue, knowledge exchange and joint initiatives.',
    pillars: [
      { icon: '◆', label: 'Dialogue', text: 'A neutral space for honest and strategic exchange between government, business and international organisations.' },
      { icon: '◈', label: 'Partnership', text: 'Long-term partnerships between corporations, financial institutions and government bodies.' },
      { icon: '◉', label: 'Impact', text: 'Shaping recommendations and initiatives that become part of the real agenda at national and international level.' },
    ],
    quote: '"We create a space where leaders can influence the global agenda and shape an inclusive future for the world economy."',
    author: 'Zhanna Baidasheva',
    role: 'GBWC Founder',
  },
  kk: {
    eyebrow: 'БІЗДІҢ МИССИЯ',
    title: 'Көшбасшылар арасында көпір салу',
    lead: 'GBWC — бизнестегі, мемлекеттік институттар мен халықаралық ұйымдардағы әйел-көшбасшылар диалог, тәжірибе алмасу және бірлескен бастамалар үшін жиналатын халықаралық платформа.',
    pillars: [
      { icon: '◆', label: 'Диалог', text: 'Мемлекет, бизнес пен халықаралық ұйымдар арасындағы стратегиялық алмасуға арналған бейтарап кеңістік.' },
      { icon: '◈', label: 'Серіктестік', text: 'Корпорациялар, қаржы институттары мен мемлекеттік құрылымдар арасындағы ұзақ мерзімді серіктестік.' },
      { icon: '◉', label: 'Ықпал', text: 'Ұлттық және халықаралық деңгейдегі нақты күн тәртібінің бөлігіне айналатын ұсыныстар мен бастамалар қалыптастыру.' },
    ],
    quote: '«Біз көшбасшылардың жаһандық күн тәртібіне ықпал ете алатын кеңістік жасаймыз.»',
    author: 'Жанна Байдашева',
    role: 'GBWC Негізін қалаушы',
  },
}

export default function HomeQuote({ lang }) {
  const d = DATA[lang] || DATA.ru

  return (
    <section className="hm">
      <div className="hm-inner">

        {/* Left column — text */}
        <MotionSection animation="fadeUp" className="hm-left">
          <div className="hm-eyebrow">
            <span className="hm-eye-gem"/>
            {d.eyebrow}
          </div>
          <h2 className="hm-title">{d.title}</h2>
          <p className="hm-lead">{d.lead}</p>

          {/* Quote */}
          <blockquote className="hm-quote">
            <span className="hm-qmark">"</span>
            <p>{d.quote}</p>
            <footer>
              <span className="hm-author-line"/>
              <div>
                <div className="hm-author">{d.author}</div>
                <div className="hm-role">{d.role}</div>
              </div>
            </footer>
          </blockquote>
        </MotionSection>

        {/* Right column — pillars */}
        <MotionSection animation="fadeUp" delay={0.15} className="hm-right">
          <div className="hm-pillars">
            {d.pillars.map((p, i) => (
              <div key={i} className="hm-pillar">
                <div className="hm-pillar-icon">{p.icon}</div>
                <div className="hm-pillar-body">
                  <div className="hm-pillar-label">{p.label}</div>
                  <p className="hm-pillar-text">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </MotionSection>

      </div>
    </section>
  )
}
