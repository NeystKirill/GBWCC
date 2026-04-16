export default function TeamCard({ name, role, phone, email, points }) {
  return (
    <div className="ab2-secret-card">
      <div className="ab2-secret-initials">
        {name.split(' ').slice(0, 2).map(w => w[0]).join('')}
      </div>
      <div className="ab2-secret-info">
        <div className="ab2-secret-name">{name}</div>
        <div className="ab2-secret-role">{role}</div>
        <div className="ab2-secret-contacts">
          <a href={`tel:${phone}`} className="ab2-secret-contact">{phone}</a>
          <a href={`mailto:${email}`} className="ab2-secret-contact">{email}</a>
        </div>
        <ul className="ab2-secret-points">
          {points.map((pt, j) => (
            <li key={j} className="ab2-secret-point"><span className="ab2-val-dot" />{pt}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
