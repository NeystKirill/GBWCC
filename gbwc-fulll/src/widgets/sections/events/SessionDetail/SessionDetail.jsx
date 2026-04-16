import '../events.css'

export default function SessionDetail({ session, lang, labels }) {
  const allPeople = [...(session.members || []), ...(session.guests || [])]
  const t = session.topics[lang] || session.topics.ru
  const r = session.results ? (session.results[lang] || session.results.ru) : null

  // Contextual stats per session
  const stats = {
    1: [{ val: '22', key: lang==='ru'?'участника':lang==='en'?'participants':'қатысушы' },
        { val: '8',  key: lang==='ru'?'организаций':lang==='en'?'organisations':'ұйым' },
        { val: '2023', key: lang==='ru'?'год':lang==='en'?'year':'жыл' }],
    2: [{ val: '50+', key: lang==='ru'?'участников':lang==='en'?'participants':'қатысушы' },
        { val: '12', key: lang==='ru'?'организаций':lang==='en'?'organisations':'ұйым' },
        { val: '2024', key: lang==='ru'?'год':lang==='en'?'year':'жыл' }],
    3: [{ val: '60+', key: lang==='ru'?'участников':lang==='en'?'participants':'қатысушы' },
        { val: '4',   key: lang==='ru'?'меморандума':lang==='en'?'MoUs signed':'меморандум' },
        { val: '2025', key: lang==='ru'?'год':lang==='en'?'year':'жыл' }],
  }[session.id] || []

  return (
    <section className="ev2-session">
      <div className="ev2-inner">

        {/* ── Session header ── */}
        <div className="ev2-session-head">
          <div className="ev2-session-meta-row">
            <span className="ev2-session-numeral">{session.numeral}</span>
            <div className="ev2-session-meta-info">
              <div className="ev2-session-date">{session.date[lang] || session.date.ru}</div>
              <div className="ev2-session-loc">{session.location[lang] || session.location.ru}</div>
              {(session.context[lang] !== session.location[lang]) && (
                <div className="ev2-session-context">{session.context[lang] || session.context.ru}</div>
              )}
            </div>
          </div>
          <div className="ev2-session-theme-block">
            <h2 className="ev2-session-theme">{session.theme[lang] || session.theme.ru}</h2>
            <p className="ev2-session-desc">{session.desc[lang] || session.desc.ru}</p>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div className="ev2-body">

          {/* LEFT: People grid — large portrait cards */}
          <div className="ev2-people-col">
            <div className="ev2-people-eyebrow">
              <span className="ev2-people-dot"/>
              {labels.members}
            </div>
            <div className="ev2-people-grid">
              {allPeople.map((p, i) => (
                <PersonPortrait key={i} person={p} lang={lang} />
              ))}
            </div>
          </div>

          {/* RIGHT: Session info — stats, topics, results, links */}
          <div className="ev2-info-col">

            {/* Stats */}
            {stats.length > 0 && (
              <div className="ev2-stats-belt">
                {stats.map((s, i) => (
                  <div key={i} className="ev2-stat">
                    <span className="ev2-stat-val">{s.val}</span>
                    <span className="ev2-stat-key">{s.key}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Topics */}
            <div className="ev2-info-block">
              <div className="ev2-info-label">
                <span className="ev2-info-gem"/>
                {labels.topics}
              </div>
              <ul className="ev2-topics-list">
                {t.map((topic, i) => (
                  <li key={i} className="ev2-topic-item">
                    <span className="ev2-topic-dot"/>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            {r && (
              <div className="ev2-info-block">
                <div className="ev2-info-label">
                  <span className="ev2-info-gem"/>
                  {labels.results}
                </div>
                <ul className="ev2-results-list">
                  {r.map((res, i) => (
                    <li key={i} className="ev2-result-item">
                      <span className="ev2-result-check">✓</span>
                      {res}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="ev2-links-row">
              {session.gallery && (
                <a href={session.gallery} target="_blank" rel="noopener noreferrer"
                  className="ev2-link-btn ev2-link-btn--gold">
                  {labels.gallery} ↗
                </a>
              )}
              {session.video && (
                <a href={session.video} target="_blank" rel="noopener noreferrer"
                  className="ev2-link-btn ev2-link-btn--outline">
                  {labels.video} ↗
                </a>
              )}
            </div>

          </div>
        </div>

        {/* ── Local photo strip ── */}
        {session.localPhotos?.length > 0 && (
          <div className="ev2-photo-strip">
            <div className="ev2-photo-strip-label">
              <span className="ev2-info-gem"/>
              {labels.photos}
            </div>
            <div className="ev2-photo-strip-track">
              {session.localPhotos.map((src, i) => (
                <div key={i} className="ev2-photo-strip-item">
                  <img src={src} alt={`${session.numeral} — ${i+1}`} loading="lazy"/>
                  <div className="ev2-photo-strip-overlay"/>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

function PersonPortrait({ person, lang }) {
  const initials = person.name.split(' ').slice(0, 2).map(w => w[0]).join('')
  return (
    <div className="ev2-portrait">
      <div className="ev2-portrait-photo">
        {person.photo
          ? <img src={person.photo} alt={person.name}/>
          : <div className="ev2-portrait-initials">{initials}</div>
        }
        <div className="ev2-portrait-overlay"/>
      </div>
      <div className="ev2-portrait-info">
        <div className="ev2-portrait-name">{person.name}</div>
        <div className="ev2-portrait-title">{person.title[lang] || person.title.ru}</div>
      </div>
    </div>
  )
}
