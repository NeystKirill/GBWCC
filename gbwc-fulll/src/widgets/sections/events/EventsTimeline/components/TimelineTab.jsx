export default function TimelineTab({ session, isActive, onClick }) {
  return (
    <button
      className={`ev2-tab${isActive ? ' active' : ''}`}
      onClick={onClick}
    >
      <span className="ev2-tab-num">{session.numeral}</span>
      <span className="ev2-tab-year">{session.year}</span>
    </button>
  )
}
