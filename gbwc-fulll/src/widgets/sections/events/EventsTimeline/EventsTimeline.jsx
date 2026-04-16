import '../events.css'
import TimelineTab from './components/TimelineTab'

export default function EventsTimeline({ sessions, activeId, onSelect }) {
  return (
    <div className="ev2-tabs-bar">
      <div className="ev2-tabs-inner">
        {sessions.map(s => (
          <TimelineTab key={s.id} session={s} isActive={activeId === s.id} onClick={() => onSelect(s.id)} />
        ))}
      </div>
    </div>
  )
}
