import '../media.css'
import MediaCard from '../MediaCard/MediaCard'

export default function MediaGrid({ articles, lang, readLabel }) {
  return (
    <div className="med-grid">
      {articles.map((article, idx) => (
        <MediaCard key={article.id} article={article} lang={lang}
          readLabel={readLabel} idx={idx} />
      ))}
    </div>
  )
}
