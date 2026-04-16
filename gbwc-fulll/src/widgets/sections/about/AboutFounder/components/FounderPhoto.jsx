export default function FounderPhoto({ initials, photo }) {
  return (
    <div className="ab2-founder-photo-col">
      <div className="ab2-founder-photo-frame">
        {photo
          ? <img src={photo} alt={initials} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }} />
          : (
            <div className="ab2-founder-photo-placeholder">
              <span className="ab2-founder-initials">{initials}</span>
            </div>
          )
        }
        <div className="ab2-founder-corner ab2-founder-corner--tl" />
        <div className="ab2-founder-corner ab2-founder-corner--br" />
      </div>
      <div className="ab2-founder-contact">
        <div className="ab2-founder-contact-label">info@gbwc.network</div>
        <div className="ab2-founder-contact-phone">+7 702 731 4400</div>
      </div>
    </div>
  )
}
