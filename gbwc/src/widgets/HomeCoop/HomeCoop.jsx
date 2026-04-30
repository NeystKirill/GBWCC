import { useLang } from '../../shared/hooks/useLang'
import { Link } from 'react-router-dom'
import ShaderBackground from '../../shared/webgl/ShaderBackground'
import ParticleField    from '../../shared/webgl/ParticleField'
import { MotionSection } from '../../shared/animations/MotionSection'
import { COOP_DATA } from '../../shared/constants/homeData'
import './HomeCoop.css'

export default function HomeCoop({ data }) {
  const { lang, resolveCMS } = useLang()
  const fallback = COOP_DATA[lang] || COOP_DATA.ru
  const d = data && Object.keys(data).length > 0 ? { ...fallback, ...data } : fallback
  // Normalize tags from CMS {text:"..."} objects to plain strings
  if (Array.isArray(d.tags)) {
    d.tags = d.tags.map(t => (t && typeof t === 'object' && typeof t.text === 'string') ? t.text : t)
  }
  return (
    <section className="hc">
      <div className="hc-card">


      <div className="hc-particles"><ParticleField /></div>
      <div className="hc-grid" />
      <div className="hc-inner">
        <MotionSection animation="fadeUp" className="hc-label-row">
          <span className="hc-label-line" />
          <span className="hc-eyebrow">{resolveCMS(d.label)}</span>
          <span className="hc-label-line hc-label-line--rev" />
        </MotionSection>

        <MotionSection animation="fadeUp" delay={0.08}>
          <h2 className="hc-title">{resolveCMS(d.title)}</h2>
        </MotionSection>

        <MotionSection animation="fadeUp" delay={0.14}>
          <p className="hc-text">{resolveCMS(d.text)}</p>
        </MotionSection>

        <MotionSection animation="fadeUp" delay={0.2} stagger staggerDelay={0.06} className="hc-tags">
          {d.tags?.map((tag, i) => <span key={i} className="hc-tag">{resolveCMS(tag)}</span>)}
        </MotionSection>

        <MotionSection animation="scale" delay={0.26} className="hc-btns">
          <Link to={`/${lang}/contacts`} className="lyt-btn lyt-btn--primary">
            {resolveCMS(d.btn1)}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12H19M19 12L13 6M19 12L13 18"/>
            </svg>
          </Link>
          <Link to={`/${lang}/partners`} className="lyt-btn lyt-btn--ghost">{resolveCMS(d.btn2)}</Link>
        </MotionSection>
      </div>
      </div>
    </section>
  )
}
