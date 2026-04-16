import '../founders.css'
import FounderCard from '../FounderCard/FounderCard'

export default function FoundersList({ leaders, lang }) {
  return (
    <section className="ldr-section">
      {leaders.map((leader, idx) => (
        <FounderCard key={leader.id} leader={leader} lang={lang} idx={idx} />
      ))}
    </section>
  )
}
