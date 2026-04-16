import '../about.css'
import MandateText from './components/MandateText'
import MandateCards from './components/MandateCards'

export default function AboutMandate({ eyebrow, title, paragraphs, cards }) {
  return (
    <section className="ab2-mandate">
      <div className="ab2-inner">
        <div className="ab2-mandate-grid">
          <div>
            <div className="ab2-section-head">
              <div className="ab2-eyebrow-line"><span className="ab2-eyebrow-gem" />{eyebrow}</div>
              <h2 className="ab2-section-title">{title}</h2>
            </div>
            <MandateText paragraphs={paragraphs} />
          </div>
          <MandateCards cards={cards} />
        </div>
      </div>
    </section>
  )
}
