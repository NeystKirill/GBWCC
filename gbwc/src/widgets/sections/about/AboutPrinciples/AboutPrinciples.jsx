import { useLang } from '../../../../shared/hooks/useLang'
import { ABOUT_CONTENT } from '../../../../entities/about/about.data'
import '../about.css'
import PrincipleCard from './components/PrincipleCard'

export default function AboutPrinciples({ eyebrow, title, items }) {
  const { lang, resolveCMS } = useLang();
  const fallback = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru;

  const d = {
    eyebrow: eyebrow || fallback.princEye,
    title: title || fallback.princTitle,
    items: (items && items.length > 0 && items[0].title) ? items : fallback.princs
  }

  return (
    <section className="ab2-principles">
      <div className="ab2-inner">
        <div className="ab2-section-head ab2-section-head--light">
          <div className="ab2-eyebrow-line ab2-eyebrow-line--gold"><span className="ab2-eyebrow-gem" />{resolveCMS(d.eyebrow)}</div>
          <h2 className="ab2-section-title ab2-section-title--light">{resolveCMS(d.title)}</h2>
        </div>
        <div className="ab2-principles-grid">
          {d.items.map((p, i) => <PrincipleCard key={i} {...p} />)}
        </div>
      </div>
    </section>
  )
}
