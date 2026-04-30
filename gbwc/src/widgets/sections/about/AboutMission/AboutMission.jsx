import { useLang } from '../../../../shared/hooks/useLang'
import { ABOUT_CONTENT } from '../../../../entities/about/about.data'
import '../about.css'
import MissionCard from './components/MissionCard'
import ValuesCard  from './components/ValuesCard'

export default function AboutMission({ eyebrow, mission, vision, values }) {
  const { lang, resolveCMS } = useLang();
  const fallback = ABOUT_CONTENT[lang] || ABOUT_CONTENT.ru;

  const d = {
    eyebrow: eyebrow || fallback.mvvEye,
    mission: mission || fallback.mission,
    vision: vision || fallback.vision,
    values: (values && values.length > 0) ? values : fallback.values
  }

  return (
    <section className="ab2-mvv">
      <div className="ab2-inner">
        <div className="ab2-section-head">
          <div className="ab2-eyebrow-line"><span className="ab2-eyebrow-gem" />{resolveCMS(d.eyebrow)}</div>
        </div>
        <div className="ab2-mvv-grid">
          <MissionCard letter="М" tag="MISSION" text={d.mission} variant="mission" />
          <MissionCard letter="V" tag="VISION"  text={d.vision}  variant="vision"  />
          <ValuesCard  letter="C" values={d.values} />
        </div>
      </div>
    </section>
  )
}
