import PersonCard from './PersonCard'
export default function SessionParticipants({ members, guests, lang, labels }) {
  return (
    <div className="ev2-participants-col">
      {members?.length > 0 && (
        <div className="ev2-part-group">
          <div className="ev2-part-group-label">{labels.members}</div>
          <div className="ev2-persons-grid">
            {members.map((p, i) => <PersonCard key={i} person={p} lang={lang} />)}
          </div>
        </div>
      )}
      {guests?.length > 0 && (
        <div className="ev2-part-group">
          <div className="ev2-part-group-label">{labels.guests}</div>
          <div className="ev2-persons-grid">
            {guests.map((p, i) => <PersonCard key={i} person={p} lang={lang} />)}
          </div>
        </div>
      )}
    </div>
  )
}
