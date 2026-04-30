import MandateCard from './MandateCard'
export default function MandateCards({ cards }) {
  return (
    <div>
      {cards.map((card, i) => <MandateCard key={i} {...card} gold={i === 0} />)}
    </div>
  )
}
