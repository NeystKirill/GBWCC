import { useEffect, useState } from 'react'
import { useLang }   from '../../shared/hooks/useLang'
import api           from '../../services/api'
import FoundersList  from '../../widgets/sections/founders/FoundersList/FoundersList'
import '../../widgets/sections/founders/founders.css'

export default function FoundersContent({ data }) {
  const { lang, resolveWithFallback } = useLang()
  const [leaders, setLeaders] = useState([])
  const [loading, setLoading] = useState(true)

  const title = resolveWithFallback(data?.title, {
    ru: 'Основатели Совета',
    en: 'Council Founders',
    kk: 'Кеңес құрылтайшылары'
  });

  const description = resolveWithFallback(data?.description, {
    ru: 'Выдающиеся лидеры и предприниматели, стоящие у истоков Global Businesswomen Council.',
    en: 'Distinguished leaders and entrepreneurs at the origins of Global Businesswomen Council.',
    kk: 'Global Businesswomen Council бастауында тұрған көрнекті көшбасшылар мен кәсіпкерлер.'
  });

  useEffect(() => {
    api.leaders.list({ published: 'true' })
      .then(res => setLeaders(Array.isArray(res) ? res : res?.items || []))
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="lyt-loading" style={{ height: '30vh' }} />

  return (
    <>
      <div className="founders-page-head" style={{ padding: '40px 0', textAlign: 'center' }}>
        <h1 className="ab2-section-title">{title}</h1>
        <p className="ab2-founder-role" style={{ maxWidth: '800px', margin: '10px auto' }}>{description}</p>
      </div>
      <FoundersList leaders={leaders} lang={lang} />
    </>
  )
}

