import { useLang } from '../../../../../shared/hooks/useLang'

export default function MandateCard({ label, num, sub, text, gold }) {
  const { resolveCMS } = useLang();
  return (
    <div className={`ab2-aside-card${gold ? ' ab2-aside-card--gold' : ''}`}>
      <div className="ab2-aside-card-label">{resolveCMS(label)}</div>
      {num
        ? <><div className="ab2-aside-num">{resolveCMS(num)}</div><div className="ab2-aside-card-sub">{resolveCMS(sub)}</div></>
        : <div className="ab2-aside-card-text">{resolveCMS(text)}</div>
      }
    </div>
  )
}
