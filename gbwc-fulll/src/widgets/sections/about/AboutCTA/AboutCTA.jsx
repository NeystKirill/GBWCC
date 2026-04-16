import '../about.css'
import { Link } from 'react-router-dom'

export default function AboutCTA({ text, initLabel, partLabel, lang }) {
  return (
    <section className="ab2-cta">
      <div className="ab2-cta-inner">
        <p className="ab2-cta-text">{text}</p>
        <div className="ab2-cta-btns">
          <Link to={`/${lang}/initiatives`} className="ab2-cta-btn ab2-cta-btn--gold">{initLabel}</Link>
          <Link to={`/${lang}/partners`}    className="ab2-cta-btn ab2-cta-btn--outline">{partLabel}</Link>
        </div>
      </div>
    </section>
  )
}
