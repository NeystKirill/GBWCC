import '../about.css'
import { Link } from 'react-router-dom'
import { useLang } from '../../../../shared/hooks/useLang'
import { ABOUT_CONTENT } from '../../../../entities/about/about.data'

export default function AboutCTA({ text, title, btn, initLabel, partLabel, email, lang: langProp }) {
  const { lang: langHook, resolveCMS, resolveWithFallback } = useLang()
  const lang = langProp || langHook
  const fallback = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru

  const resolvedText = resolveWithFallback(text, fallback.ctaText)
  const resolvedInit = resolveWithFallback(initLabel || btn, fallback.ctaInit)
  const resolvedPart = resolveWithFallback(partLabel, fallback.ctaPart)

  return (
    <section className="ab2-cta">
      <div className="ab2-cta-inner">
        <p className="ab2-cta-text">{resolvedText}</p>
        <div className="ab2-cta-btns">
          <Link to={`/${lang}/initiatives`} className="ab2-cta-btn ab2-cta-btn--gold">{resolvedInit}</Link>
          <Link to={`/${lang}/partners`}    className="ab2-cta-btn ab2-cta-btn--outline">{resolvedPart}</Link>
        </div>
      </div>
    </section>
  )
}
