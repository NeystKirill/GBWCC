import { useEffect, useState } from 'react'
import { useLang }   from '../../shared/hooks/useLang'
import { pages }    from '../../services/api'
import BlockRenderer from '../../shared/ui/BlockRenderer'
import './Home.css'

export default function Home() {
  const { lang } = useLang()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.body.classList.add('page-immersive')
    
    pages.get('home')
      .then((res) => {
        setContent(res?.content || null)
      })
      .finally(() => setLoading(false))

    return () => document.body.classList.remove('page-immersive')
  }, [])

  if (loading) return <div className="lyt-loading" style={{ height: '100vh' }} />

  return (
    <main>
      <BlockRenderer blocks={content} lang={lang} />
    </main>
  )
}
