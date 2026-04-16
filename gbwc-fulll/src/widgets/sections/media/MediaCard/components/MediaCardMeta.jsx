export default function MediaCardMeta({ source, date, title, readLabel }) {
  return (
    <>
      <div className="med-card-top">
        <span className="med-card-source">{source}</span>
        <span className="med-card-date">{date}</span>
      </div>
      <h3 className="med-card-title">{title}</h3>
      <span className="med-card-read">{readLabel}</span>
    </>
  )
}
