import { useLang } from '../../shared/hooks/useLang'
import { MotionSection } from '../../shared/animations/MotionSection'
import { DIRECTIONS_DATA, DIRECTIONS_LABELS } from '../../shared/constants/homeData'
import './HomeDirections.css'

export default function HomeDirections({ data }) {
  const { lang, resolveCMS, resolveWithFallback } = useLang()
  const fallbackItems = DIRECTIONS_DATA[lang] || DIRECTIONS_DATA.ru
  const fallbackLabels = DIRECTIONS_LABELS[lang] || DIRECTIONS_LABELS.ru
  
  const items = (data?.items && data.items.length > 0) ? data.items : fallbackItems;

  return (
    <section className="hd">
      <div className="hd-inner">
        <MotionSection animation="fadeUp" className="hd-header">
          <div className="hd-label">
            <span className="hd-label-line"/>
            {resolveWithFallback(data?.sectionLabel, fallbackLabels.sectionLabel)}
          </div>
          <h2 className="hd-title">{resolveWithFallback(data?.sectionTitle, fallbackLabels.sectionTitle)}</h2>
          {resolveWithFallback(data?.sectionSubtext, fallbackLabels.sectionSubtext) && (
            <p className="hd-subtitle">{resolveWithFallback(data?.sectionSubtext, fallbackLabels.sectionSubtext)}</p>
          )}
        </MotionSection>

        <div className="hd-grid">
          {(() => {
            const ROMAN = ['I','II','III','IV','V']
            return (Array.isArray(items) ? items : []).map((item, i) => (
              <MotionSection key={i} animation="fadeUp" delay={i * 0.08} className="hd-card">
                <div className="hd-card-roman-wrap">
                  <span className="hd-card-roman">{ROMAN[i]}</span>
                </div>
                {item.icon && <div className="hd-card-icon">{item.icon}</div>}
                <div className="hd-card-title">{resolveCMS(item.title)}</div>
                <p className="hd-card-desc">{resolveCMS(item.desc)}</p>
                <span className="hd-card-num">0{i+1}</span>
              </MotionSection>
            ))
          })()}
        </div>
      </div>
    </section>
  )
}
