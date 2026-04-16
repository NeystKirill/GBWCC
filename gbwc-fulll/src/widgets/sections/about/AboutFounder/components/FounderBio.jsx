export default function FounderBio({ paragraphs }) {
  return <div>{paragraphs.map((p, i) => <p key={i} className="ab2-mandate-p">{p}</p>)}</div>
}
