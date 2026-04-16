export default function PrincipleCard({ n, title, desc }) {
  return (
    <div className="ab2-pcard">
      <div className="ab2-pcard-num">{n}</div>
      <div className="ab2-pcard-title">{title}</div>
      <p className="ab2-pcard-desc">{desc}</p>
      <div className="ab2-pcard-bar" />
    </div>
  )
}
