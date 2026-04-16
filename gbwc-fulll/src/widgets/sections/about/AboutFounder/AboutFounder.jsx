import '../about.css'
import FounderPhoto  from './components/FounderPhoto'
import FounderBio    from './components/FounderBio'
import FounderPoints from './components/FounderPoints'

export default function AboutFounder({ eyebrow, name, role, bio, points, photo }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('')
  return (
    <section className="ab2-founder">
      <div className="ab2-inner">
        <div className="ab2-founder-grid">
          <FounderPhoto initials={initials} photo={photo} />
          <div className="ab2-founder-text-col">
            <div className="ab2-eyebrow-line"><span className="ab2-eyebrow-gem" />{eyebrow}</div>
            <h2 className="ab2-founder-name">{name}</h2>
            <div className="ab2-founder-role">{role}</div>
            <div className="ab2-ornament"><span className="ab2-ornament-gem" /></div>
            <FounderBio paragraphs={bio} />
            <FounderPoints points={points} />
          </div>
        </div>
      </div>
    </section>
  )
}
