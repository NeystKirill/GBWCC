import { useLang } from '../../../../shared/hooks/useLang'
import { ABOUT_CONTENT } from '../../../../entities/about/about.data'
import '../about.css'
import TeamCard from './components/TeamCard'

export default function AboutSecretariat({ eyebrow, title, members }) {
  const { lang, resolveCMS } = useLang();
  const fallback = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru;

  const d = {
    eyebrow: eyebrow || fallback.secretEye,
    title: title || fallback.secretTitle,
    members: (members && members.length > 0 && members[0].name) ? members : fallback.team
  }

  return (
    <section className="ab2-secret">
      <div className="ab2-inner">
        <div className="ab2-section-head">
          <div className="ab2-eyebrow-line"><span className="ab2-eyebrow-gem" />{resolveCMS(d.eyebrow)}</div>
          <h2 className="ab2-section-title">{resolveCMS(d.title)}</h2>
        </div>
        <div className="ab2-secret-grid">
          {d.members.map((m, i) => <TeamCard key={i} {...m} />)}
        </div>
      </div>
    </section>
  )
}
