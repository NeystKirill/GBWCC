export default function FounderPoints({ points }) {
  return (
    <div className="ab2-founder-points">
      {points.map((pt, i) => (
        <div key={i} className="ab2-founder-point">
          <span className="ab2-val-dot" />{pt}
        </div>
      ))}
    </div>
  )
}
