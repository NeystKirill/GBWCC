import { useEffect, useState } from 'react'
import PageLayout        from '../../shared/ui/PageLayout'
import { useLang }       from '../../shared/hooks/useLang'
import { pages }         from '../../services/api'
import BlockRenderer     from '../../shared/ui/BlockRenderer'
import '../../widgets/sections/about/about.css'

export default function About() {
  const { t, lang } = useLang()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = t.pages.about
    pages.get('about')
      .then(res => setContent(res.content))
      .catch(err => console.error('Failed to load about content:', err))
      .finally(() => setLoading(false))
  }, [t])

  if (loading) return <div className="lyt-loading" style={{ height: '100vh' }} />

  return (
    <PageLayout>
      <BlockRenderer blocks={content} lang={lang} />
    </PageLayout>
  )
}
