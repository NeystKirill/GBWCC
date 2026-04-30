import { useLang } from '../../../../../shared/hooks/useLang'

export default function TimelineItem({ year, title, desc }) {
  const { resolveCMS } = useLang();
  return (
    <div className="ab2-tl-item">
      <div className="ab2-tl-year">{year}</div>
      <div className="ab2-tl-dot" />
      <div className="ab2-tl-body">
        <div className="ab2-tl-title">{resolveCMS(title)}</div>
        <p className="ab2-tl-desc">{resolveCMS(desc)}</p>
      </div>
    </div>
  )
}
