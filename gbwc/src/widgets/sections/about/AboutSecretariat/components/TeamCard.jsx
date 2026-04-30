import { useLang } from '../../../../../shared/hooks/useLang'

export default function TeamCard({ name, role, phone, email, points }) {
  const { resolveCMS } = useLang();
  const resName = resolveCMS(name);
  const initials = resName ? resName.split(' ').slice(0, 2).map(w => w[0]).join('') : '';

  return (
    <div className="ab2-secret-card">
      <div className="ab2-secret-initials">{initials}</div>
      <div className="ab2-secret-info">
        <div className="ab2-secret-name">{resName}</div>
        <div className="ab2-secret-role">{resolveCMS(role)}</div>
        <div className="ab2-secret-contacts">
          {phone && <a href={`tel:${phone}`} className="ab2-secret-contact">{phone}</a>}
          {email && <a href={`mailto:${email}`} className="ab2-secret-contact">{email}</a>}
        </div>
        <ul className="ab2-secret-points">
          {(points || []).map((pt, j) => (
            <li key={j} className="ab2-secret-point"><span className="ab2-val-dot" />{resolveCMS(pt.text || pt)}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
