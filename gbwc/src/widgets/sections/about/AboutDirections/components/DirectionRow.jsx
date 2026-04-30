import { useLang } from '../../../../../shared/hooks/useLang'

export default function DirectionRow({ n, title, desc }) {
  const { resolveCMS } = useLang();
  return (
    <div className="ab2-dir-row">
      <span className="ab2-dir-n">{n}</span>
      <div className="ab2-dir-body">
        <div className="ab2-dir-title">{resolveCMS(title)}</div>
        <div className="ab2-dir-desc">{resolveCMS(desc)}</div>
      </div>
      <span className="ab2-dir-arrow">→</span>
    </div>
  )
}
