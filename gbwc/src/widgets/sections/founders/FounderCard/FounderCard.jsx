import '../founders.css'
import FounderCardPhoto from './components/FounderCardPhoto'
import FounderCardBio   from './components/FounderCardBio'

export default function FounderCard({ leader, lang, idx }) {
  const reversed = idx % 2 === 1
  
  const get = (field) => {
    const src = leader[field]
    if (!src) return null
    return src[lang] || src['ru'] || null
  }

  // positions and bio are stored as arrays in leader.data by the admin
  const getArray = (field) => {
    const fromData = leader.data?.[field]
    if (fromData) {
      const val = fromData[lang] || fromData['ru'] || []
      if (Array.isArray(val)) return val
    }
    const raw = get(field)
    if (!raw) return []
    if (Array.isArray(raw)) return raw
    return String(raw).split('\n').map(x => x.trim()).filter(Boolean)
  }

  const getName = () =>
    leader.data?.name?.[lang] || leader.data?.name?.ru || get('name') || ''

  const getBio = () => {
    const fromData = leader.data?.bio?.[lang] || leader.data?.bio?.ru
    if (Array.isArray(fromData)) return fromData.join('<br>')
    return get('bio') || ''
  }

  return (
    <div className={`ldr-block${reversed ? ' ldr-block--reversed' : ''}`}>
      <FounderCardPhoto
        photo={leader.photo}
        initials={leader.initials || leader.data?.initials}
        index={leader.index ?? leader.data?.index}
        sessionPhotos={[]}
        lang={lang}
      />
      <FounderCardBio
        name={getName()}
        positions={getArray('positions')}
        bio={getBio()}
        decree={get('decree') || leader.data?.decree?.[lang] || leader.data?.decree?.ru || null}
        competencies={getArray('competencies')}
        competenciesLabel={get('competenciesLabel')}
        gbwc={getArray('gbwc')}
        gbwcLabel={get('gbwcLabel')}
      />
    </div>
  )
}

