import { useEffect, useState } from 'react'
import PageLayout    from '../../shared/ui/PageLayout'
import { useLang }   from '../../shared/hooks/useLang'
import { pages } from '../../services/api'
import BlockRenderer from '../../shared/ui/BlockRenderer'
import '../../widgets/sections/initiatives/initiatives.css'

export default function Initiatives() {
  const { t, lang } = useLang()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = t.pages.initiatives
    pages.get('initiatives')
      .then(res => setContent(res.content))
      .catch(() => null)
      .finally(() => setLoading(false))
  }, [t])

  if (loading) return <div className="lyt-loading" style={{ height: '100vh' }} />

  return (
    <PageLayout>
      <BlockRenderer blocks={content} lang={lang} />
    </PageLayout>
  )
}
