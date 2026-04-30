import { useLang } from '../../../../../shared/hooks/useLang'

export default function FounderPoints({ points }) {
  const { resolveCMS } = useLang();
  return (
    <div className="ab2-founder-points">
      {(points || []).map((pt, i) => (
        <div key={i} className="ab2-founder-point">
          <span className="ab2-val-dot" />{resolveCMS(pt)}
        </div>
      ))}
    </div>
  )
}

