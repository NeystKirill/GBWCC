import '../about.css'
import MissionCard from './components/MissionCard'
import ValuesCard  from './components/ValuesCard'

export default function AboutMission({ eyebrow, mission, vision, values }) {
  return (
    <section className="ab2-mvv">
      <div className="ab2-inner">
        <div className="ab2-section-head">
          <div className="ab2-eyebrow-line"><span className="ab2-eyebrow-gem" />{eyebrow}</div>
        </div>
        <div className="ab2-mvv-grid">
          <MissionCard letter="М" tag="MISSION" text={mission} variant="mission" />
          <MissionCard letter="V" tag="VISION"  text={vision}  variant="vision"  />
          <ValuesCard  letter="C" values={values} />
        </div>
      </div>
    </section>
  )
}
