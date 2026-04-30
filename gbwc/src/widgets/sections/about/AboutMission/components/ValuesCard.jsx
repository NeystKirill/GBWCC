import { useLang } from '../../../../../shared/hooks/useLang'

export default function ValuesCard({ letter, values }) {
  const { resolveCMS } = useLang();
  return (
    <div className="ab2-mvv-card ab2-mvv-card--values">
      <span className="ab2-mvv-letter">{letter}</span>
      <div className="ab2-mvv-card-tag">VALUES</div>
      <ul className="ab2-values-list">
        {(values || []).map((v, i) => (
          <li key={i} className="ab2-values-item">
            <span className="ab2-val-dot" /><strong>{resolveCMS(v.title)}</strong>
            {v.text && <p style={{fontSize: '0.9em', opacity: 0.8, marginTop: 4}}>{resolveCMS(v.text)}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
