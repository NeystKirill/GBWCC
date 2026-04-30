import { useEffect, useState } from 'react'
import PageLayout   from '../../shared/ui/PageLayout'
import { useLang }  from '../../shared/hooks/useLang'
import api from '../../services/api'
import BlockRenderer from '../../shared/ui/BlockRenderer'
import '../../widgets/sections/founders/founders.css'

export default function Founders() {
  const { t, lang } = useLang()
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = t.pages?.founders || 'Founders'
    api.pages.get('founders')
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

