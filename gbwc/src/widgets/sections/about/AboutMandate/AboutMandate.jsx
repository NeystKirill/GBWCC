import { useLang } from '../../../../shared/hooks/useLang'
import { ABOUT_CONTENT } from '../../../../entities/about/about.data'
import '../about.css'
import MandateText from './components/MandateText'
import MandateCards from './components/MandateCards'

export default function AboutMandate({ eyebrow, title, paragraphs, cards }) {
  const { lang, resolveCMS, resolveWithFallback } = useLang();
  const fallback = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru;

  const itms_p = (paragraphs && paragraphs.length > 0) ? paragraphs : fallback.mandateParas.map(p => ({ text: p }));
  const itms_c = (cards && cards.length > 0) ? cards : fallback.asideCards;

  return (
    <section className="ab2-mandate">
      <div className="ab2-inner">
        <div className="ab2-mandate-grid">
          <div>
            <div className="ab2-section-head">
              <div className="ab2-eyebrow-line"><span className="ab2-eyebrow-gem" />{resolveWithFallback(eyebrow, fallback.mandateEye)}</div>
              <h2 className="ab2-section-title">{resolveWithFallback(title, fallback.mandateTitle)}</h2>
            </div>
            <MandateText paragraphs={itms_p} />
          </div>
          <MandateCards cards={itms_c} />
        </div>
      </div>
    </section>
  )
}
