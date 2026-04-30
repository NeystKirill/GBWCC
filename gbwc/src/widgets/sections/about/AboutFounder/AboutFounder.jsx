import { useLang } from '../../../../shared/hooks/useLang'
import { ABOUT_CONTENT } from '../../../../entities/about/about.data'
import '../about.css'
import FounderPhoto  from './components/FounderPhoto'
import FounderBio    from './components/FounderBio'
import FounderPoints from './components/FounderPoints'

export default function AboutFounder({ eyebrow, name, role, bio, points, photo, contactEmail, contactPhone }) {
  const { lang, resolveCMS, resolveWithFallback } = useLang();
  const fallback = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru;

  const resName  = resolveWithFallback(name, fallback.founderTitle);
  const initials = resName ? resName.split(' ').slice(0, 2).map(w => w[0]).join('') : '';
  const itms_bio = (bio && bio.length > 0) ? bio : fallback.founderBio.map(p => ({ text: p }));
  const itms_pts = (points && points.length > 0) ? points : (fallback.founderPoints || []).map(p => ({ text: p }));

  const resolvedEmail = resolveCMS(contactEmail) || 'info@gbwc.network';
  const resolvedPhone = resolveCMS(contactPhone) || '+7 702 731 4400';

  return (
    <section className="ab2-founder">
      <div className="ab2-inner">
        <div className="ab2-founder-grid">
          <FounderPhoto
            initials={initials}
            photo={photo || fallback.founderPhoto}
            contactEmail={resolvedEmail}
            contactPhone={resolvedPhone}
          />
          <div className="ab2-founder-text-col">
            <div className="ab2-eyebrow-line"><span className="ab2-eyebrow-gem" />{resolveWithFallback(eyebrow, fallback.founderEye)}</div>
            <h2 className="ab2-founder-name">{resName}</h2>
            <div className="ab2-founder-role">{resolveWithFallback(role, fallback.founderRole)}</div>
            <div className="ab2-ornament"><span className="ab2-ornament-gem" /></div>
            <FounderBio paragraphs={itms_bio} />
            <FounderPoints points={itms_pts} />
          </div>
        </div>
      </div>
    </section>
  )
}
