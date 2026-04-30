export default function FounderCardBio({ name, positions, bio, decree, competencies, competenciesLabel, gbwc, gbwcLabel }) {
  return (
    <div className="ldr-text-side">
      <h2 className="ldr-name">{name}</h2>
      <div className="ldr-positions">
        {positions.map((p, i) => <span key={i} className="ldr-pos">{p}</span>)}
      </div>
      <div className="ldr-ornament"><span className="ldr-ornament-gem" /></div>
      <div className="ldr-bio-block">
        <div 
          className="ldr-bio-p" 
          dangerouslySetInnerHTML={{ __html: bio }} 
        />
      </div>

      {decree && <blockquote className="ldr-decree">{decree}</blockquote>}
      {(competencies?.length > 0 || gbwc?.length > 0) && (
        <div className="ldr-cols">
          {competencies?.length > 0 && (
            <div className="ldr-col">
              <p className="ldr-col-label">{competenciesLabel}</p>
              <ul className="ldr-list">
                {competencies.map((c, i) => <li key={i} className="ldr-list-item"><span className="ldr-dot" />{c}</li>)}
              </ul>
            </div>
          )}
          {gbwc?.length > 0 && (
            <div className="ldr-col">
              <p className="ldr-col-label">{gbwcLabel}</p>
              <ul className="ldr-list">
                {gbwc.map((g, i) => <li key={i} className="ldr-list-item"><span className="ldr-dot ldr-dot--gold" />{g}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
