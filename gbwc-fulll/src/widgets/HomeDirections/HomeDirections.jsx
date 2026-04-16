import { MotionSection } from '../../shared/animations/MotionSection'
import { DIRECTIONS_DATA, DIRECTIONS_LABELS } from '../../shared/constants/homeData'
import './HomeDirections.css'

export default function HomeDirections({ lang }) {
  const items = DIRECTIONS_DATA[lang] || DIRECTIONS_DATA.ru
  const lbl   = DIRECTIONS_LABELS[lang] || DIRECTIONS_LABELS.ru

  return (
    <section className="hd">
      <div className="hd-inner">
        <MotionSection animation="fadeUp" className="hd-header">
          <div className="hd-label">
            <span className="hd-label-line"/>
            {lbl.sectionLabel}
          </div>
          <h2 className="hd-title">{lbl.sectionTitle}</h2>
          {lbl.sectionSubtext && <p className="hd-subtitle">{lbl.sectionSubtext}</p>}
        </MotionSection>

        <div className="hd-grid">
          {(() => {
            const ROMAN = ['I','II','III','IV','V']
            return items.map((item, i) => (
              <MotionSection key={i} animation="fadeUp" delay={i * 0.08} className="hd-card">
                <div className="hd-card-roman-wrap">
                  <span className="hd-card-roman">{ROMAN[i]}</span>
                </div>
                <div className="hd-card-icon">{item.icon}</div>
                <div className="hd-card-title">{item.title}</div>
                <p className="hd-card-desc">{item.desc}</p>
                <span className="hd-card-num">0{i+1}</span>
              </MotionSection>
            ))
          })()}
        </div>
      </div>
    </section>
  )
}
