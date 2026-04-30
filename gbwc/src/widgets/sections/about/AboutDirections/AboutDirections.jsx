import { useLang } from '../../../../shared/hooks/useLang'
import { ABOUT_CONTENT } from '../../../../entities/about/about.data'
import '../about.css'
import DirectionRow from './components/DirectionRow'

export default function AboutDirections({ eyebrow, title, items }) {
  const { lang, resolveCMS, resolveWithFallback } = useLang();
  const fallback = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru;

  const itms = (items && items.length > 0 && items[0].title) ? items : fallback.dirs;

  return (
    <section className="ab2-directions">
      <div className="ab2-inner">
        <div className="ab2-section-head">
          <div className="ab2-eyebrow-line">
            <span className="ab2-eyebrow-gem" />
            {resolveWithFallback(eyebrow, fallback.dirEye)}
          </div>
          <h2 className="ab2-section-title">{resolveWithFallback(title, fallback.dirTitle)}</h2>
        </div>
        <div className="ab2-dir-list">
          {itms.map((it, i) => <DirectionRow key={i} {...it} />)}
        </div>
      </div>
    </section>
  )
}
