export default function PersonCard({ person, lang }) {
  return (
    <div className="ev2-person-card">
      <div className="ev2-person-photo">
        {person.photo
          ? <img src={person.photo} alt={person.name} />
          : <div className="ev2-person-initials">{person.name.split(' ').slice(0,2).map(w=>w[0]).join('')}</div>
        }
      </div>
      <div className="ev2-person-info">
        <div className="ev2-person-name">{person.name}</div>
        <div className="ev2-person-title">{person.title[lang] || person.title.ru}</div>
      </div>
    </div>
  )
}
