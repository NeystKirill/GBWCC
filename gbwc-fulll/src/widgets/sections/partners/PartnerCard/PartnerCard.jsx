import '../partners.css'

export default function PartnerCard({ partner, lang, lbl, index }) {
  const content = (
    <>
      {/* Logo area */}
      <div className="part2-pcard-logo-wrap">
        <img
          src={partner.logo}
          alt={partner.name}
          className="part2-pcard-logo-img"
        />
      </div>

      {/* Body */}
      <div className="part2-pcard-body">
        <div className="part2-pcard-index">{String(index + 1).padStart(2, '0')}</div>
        <div className="part2-pcard-name">{partner.name}</div>
        <div className="part2-pcard-full">{partner.full[lang] || partner.full.ru}</div>

        {partner.rep && (
          <>
            <div className="part2-pcard-divider" />
            <div className="part2-pcard-rep">
              <span className="part2-pcard-rep-label">{lbl.repLabel}</span>
              {partner.rep[lang] || partner.rep.ru}
            </div>
          </>
        )}

        {partner.sessions?.length > 0 && (
          <div className="part2-pcard-sessions">
            {partner.sessions.map(s => (
              <span key={s} className="part2-session-badge">
                PS {['I','II','III'][s-1]}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="part2-pcard part2-pcard--link"
        title={partner.full?.[lang] || partner.name}
      >
        {content}
      </a>
    )
  }

  return <div className="part2-pcard">{content}</div>
}
