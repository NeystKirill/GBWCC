import '../founders.css'
import FounderCardPhoto from './components/FounderCardPhoto'
import FounderCardBio   from './components/FounderCardBio'

export default function FounderCard({ leader, lang, idx }) {
  const d = leader.data[lang] || leader.data.ru
  const reversed = idx % 2 === 1

  return (
    <div className={`ldr-block${reversed ? ' ldr-block--reversed' : ''}`}>
      <FounderCardPhoto
        photo={leader.photo}
        initials={leader.initials}
        index={leader.index}
        sessionPhotos={leader.sessionPhotos || []}
        lang={lang}
      />
      <FounderCardBio
        name={d.name}
        positions={d.positions}
        bio={d.bio}
        decree={d.decree}
        competencies={d.competencies}
        competenciesLabel={d.competenciesLabel}
        gbwc={d.gbwc}
        gbwcLabel={d.gbwcLabel}
      />
    </div>
  )
}
