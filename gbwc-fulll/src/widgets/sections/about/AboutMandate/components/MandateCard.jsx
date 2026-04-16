export default function MandateCard({ label, num, sub, text, gold }) {
  return (
    <div className={`ab2-aside-card${gold ? ' ab2-aside-card--gold' : ''}`}>
      <div className="ab2-aside-card-label">{label}</div>
      {num
        ? <><div className="ab2-aside-num">{num}</div><div className="ab2-aside-card-sub">{sub}</div></>
        : <div className="ab2-aside-card-text">{text}</div>
      }
    </div>
  )
}
