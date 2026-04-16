/**
 * shared/ui/StatItem
 * Single stat: value + label. Used in hero belts and section stats.
 */
import './StatItem.css'
export default function StatItem({ value, label, light = false }) {
  return (
    <div className={`stat-item${light ? ' stat-item--light' : ''}`}>
      <span className="stat-item-n">{value}</span>
      <span className="stat-item-l">{label}</span>
    </div>
  )
}
