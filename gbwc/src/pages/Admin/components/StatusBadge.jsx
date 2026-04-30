const STATUS_MAP = {
  new:       { label: 'Новая',     color: '#e8b84b' },
  read:      { label: 'Прочитана', color: '#4b9ee8' },
  archived:  { label: 'В архиве',  color: '#888' },
  inprogress:{ label: 'В работе',  color: '#4b9ee8' },
  done:      { label: 'Завершена', color: '#4bbc7a' },
}

export default function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || { label: status, color: '#aaa' }
  return (
    <span
      className="adm-badge"
      style={{ background: s.color + '22', color: s.color, border: `1px solid ${s.color}55` }}
    >
      {s.label}
    </span>
  )
}
