import '../initiatives.css'
import InitiativeCard from '../InitiativeCard/InitiativeCard'

export default function InitiativesList({ items, tasksLabel }) {
  return (
    <section className="init2-section">
      {items.map((item, idx) => (
        <InitiativeCard key={item.id} item={item} idx={idx} tasksLabel={tasksLabel} />
      ))}
    </section>
  )
}
