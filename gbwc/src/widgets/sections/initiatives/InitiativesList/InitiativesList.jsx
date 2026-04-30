import '../initiatives.css'
import InitiativeCard from '../InitiativeCard/InitiativeCard'

export default function InitiativesList({ items, tasksLabel, lang }) {
  return (
    <section className="init2-section">
      {items.map((item, idx) => (
        <InitiativeCard key={item.id || idx} item={item} idx={idx} tasksLabel={tasksLabel} lang={lang} />
      ))}
    </section>
  )
}
