import { useLang } from '../../../../../shared/hooks/useLang'

export default function FounderBio({ paragraphs }) {
  const { resolveCMS } = useLang();
  return <div>{(paragraphs || []).map((p, i) => <p key={i} className="ab2-mandate-p">{resolveCMS(p)}</p>)}</div>
}
