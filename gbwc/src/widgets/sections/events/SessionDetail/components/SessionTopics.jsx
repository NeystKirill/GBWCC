export default function SessionTopics({ topics, results, lang, labels }) {
  return (
    <div className="ev2-details-col">
      <div className="ev2-topics">
        <div className="ev2-col-label">{labels.topics}</div>
        <ul className="ev2-topics-list">
          {topics[lang].map((t, i) => (
            <li key={i} className="ev2-topic-item"><span className="ev2-topic-dot" />{t}</li>
          ))}
        </ul>
      </div>
      {results && (
        <div className="ev2-results">
          <div className="ev2-col-label">{labels.results}</div>
          <ul className="ev2-results-list">
            {results[lang].map((r, i) => (
              <li key={i} className="ev2-result-item"><span className="ev2-result-check">✓</span>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
