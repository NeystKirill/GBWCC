export default function SessionHeader({ session, lang }) {
  return (
    <div className="ev2-session-header">
      <div className="ev2-session-meta">
        <span className="ev2-session-numeral">{session.numeral}</span>
        <div className="ev2-session-info">
          <div className="ev2-session-date">{session.date[lang]}</div>
          <div className="ev2-session-loc">{session.location[lang]}</div>
          {session.context[lang] !== session.location[lang] && (
            <div className="ev2-session-context">{session.context[lang]}</div>
          )}
        </div>
      </div>
      <div className="ev2-session-theme-block">
        <h2 className="ev2-session-theme">{session.theme[lang]}</h2>
        <p className="ev2-session-desc">{session.desc[lang]}</p>
      </div>
    </div>
  )
}
