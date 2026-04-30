import { useLang } from '../../../../shared/hooks/useLang'
import '../contacts.css'

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.8 11.3 19.79 19.79 0 01.72 2.73 2 2 0 012.69.52h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.16a16 16 0 006 6l1-1.02a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)
const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
)

export default function ContactsInfo({ d }) {
  const { resolveCMS } = useLang();
  return (
    <div className="ct3-info">
      <h2 className="ct3-info-title">{resolveCMS(d.infoTitle)}</h2>
      <p className="ct3-info-desc">{resolveCMS(d.infoDesc)}</p>

      {/* Address */}
      <div className="ct3-info-row">
        <span className="ct3-info-icon"><IconPin /></span>
        <div><p className="ct3-info-label">{resolveCMS(d.addressLabel)}</p><p className="ct3-info-val">{resolveCMS(d.addressVal)}</p></div>
      </div>

      {/* Dynamic Persons list */}
      {(d.persons || []).map((p, idx) => (
        <div key={idx} className="ct3-contact-person">
          <div className="ct3-contact-name">{resolveCMS(p.name)}</div>
          {p.phone && (
            <div className="ct3-info-row">
              <span className="ct3-info-icon"><IconPhone /></span>
              <div><p className="ct3-info-label">{resolveCMS(d.phoneLabel)}</p>
                <a href={`tel:${p.phone.replace(/\s/g, '')}`} className="ct3-info-link">{p.phone}</a>
              </div>
            </div>
          )}
          {p.email && (
            <div className="ct3-info-row">
              <span className="ct3-info-icon"><IconMail /></span>
              <div><p className="ct3-info-label">{resolveCMS(d.emailLabel)}</p>
                <a href={`mailto:${p.email}`} className="ct3-info-link">{p.email}</a>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Fallback Static list if empty */}
      {(!d.persons || d.persons.length === 0) && (
        <>
          <div className="ct3-contact-person">
            <div className="ct3-contact-name">Масербаева Бибигуль Аманбаевна</div>
            <div className="ct3-info-row">
              <span className="ct3-info-icon"><IconPhone /></span>
              <div><p className="ct3-info-label">{d.phoneLabel}</p>
                <a href="tel:+77027314400" className="ct3-info-link">+7 702 731 4400</a>
              </div>
            </div>
            <div className="ct3-info-row">
              <span className="ct3-info-icon"><IconMail /></span>
              <div><p className="ct3-info-label">{d.emailLabel}</p>
                <a href="mailto:bibigul.maserbaeva@gbwc.network" className="ct3-info-link">bibigul.maserbaeva@gbwc.network</a>
              </div>
            </div>
          </div>

          <div className="ct3-contact-person">
            <div className="ct3-contact-name">Құмарғазы Сана Еркінқызы</div>
            <div className="ct3-info-row">
              <span className="ct3-info-icon"><IconPhone /></span>
              <div><p className="ct3-info-label">{d.phoneLabel}</p>
                <a href="tel:+77781247054" className="ct3-info-link">+7 778 124 70 54</a>
              </div>
            </div>
            <div className="ct3-info-row">
              <span className="ct3-info-icon"><IconMail /></span>
              <div><p className="ct3-info-label">{d.emailLabel}</p>
                <a href="mailto:sana.kumargazy@gbwc.network" className="ct3-info-link">sana.kumargazy@gbwc.network</a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* General info email */}
      <div className="ct3-info-row ct3-info-row--highlight">
        <span className="ct3-info-icon"><IconMail /></span>
        <div><p className="ct3-info-label">ПОЧТА GBWC</p>
          <a href="mailto:info@gbwc.network" className="ct3-info-link">info@gbwc.network</a>
        </div>
      </div>

      {/* Socials */}
      <div className="ct3-info-row">
        <span className="ct3-info-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
        </span>
        <div>
          <p className="ct3-info-label">{resolveCMS(d.socialLabel)}</p>
          <div className="ct3-socials">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="ct3-social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="ct3-social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
