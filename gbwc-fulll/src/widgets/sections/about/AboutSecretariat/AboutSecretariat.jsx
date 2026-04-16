import '../about.css'
import TeamCard from './components/TeamCard'

export default function AboutSecretariat({ eyebrow, title, members }) {
  return (
    <section className="ab2-secret">
      <div className="ab2-inner">
        <div className="ab2-section-head">
          <div className="ab2-eyebrow-line"><span className="ab2-eyebrow-gem" />{eyebrow}</div>
          <h2 className="ab2-section-title">{title}</h2>
        </div>
        <div className="ab2-secret-grid">
          {members.map((m, i) => <TeamCard key={i} {...m} />)}
        </div>
      </div>
    </section>
  )
}
