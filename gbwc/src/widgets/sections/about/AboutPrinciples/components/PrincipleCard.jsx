import { useLang } from '../../../../../shared/hooks/useLang'

export default function PrincipleCard({ n, title, desc }) {
  const { resolveCMS } = useLang();
  return (
    <div className="ab2-pcard">
      <div className="ab2-pcard-num">{n}</div>
      <div className="ab2-pcard-title">{resolveCMS(title)}</div>
      <p className="ab2-pcard-desc">{resolveCMS(desc)}</p>
      <div className="ab2-pcard-bar" />
    </div>
  )
}
