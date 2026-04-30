import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { authFetch } from '@/lib/auth-fetch'
import { Puck } from '@puckeditor/core'
import '@puckeditor/core/puck.css'
import { puckConfig } from '@/features/pages/puck-config'

export const Route = createFileRoute('/_authenticated/pages/$pageKey')({
  component: PageEditorPage,
})

function PageEditorPage() {
  const { pageKey } = Route.useParams()
  const [initialData, setInitialData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPage()
  }, [pageKey])

  const fetchPage = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/pages/${pageKey}`)
      if (res.ok) {
        const data = await res.json()
        if (data.content && data.content.puckData) {
          setInitialData(data.content.puckData)
        } else if (data.content && data.content.blocks) {
          // Automatic Migration from old format
          const migratedContent = data.content.blocks.map((block: any) => ({
            type: block.type,
            props: { ...block.data, id: `${block.type}-${block.id}` }
          }));
          setInitialData({ content: migratedContent, root: { props: { title: pageKey } }, zones: {} })
        } else {
          setInitialData({ content: [], root: { props: { title: pageKey } }, zones: {} })
        }
      } else {
        setInitialData({ content: [], root: { props: { title: pageKey } }, zones: {} })
      }
    } catch (err) {
      console.error(err)
      toast.error('Failed to load page')
      setInitialData({ content: [], root: {} })
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (data: any) => {
    try {
      const res = await authFetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key: pageKey,
          content: { puckData: data }
        })
      })
      if (!res.ok) throw new Error('Save failed')
      toast.success('Page published successfully!')
    } catch (err) {
      toast.error('Failed to publish page')
    }
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden">
      {loading || !initialData ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Puck
          config={puckConfig('ru', pageKey)}
          data={initialData}
          onPublish={handlePublish}
          iframe={{ enabled: true }}
          headerTitle={`${pageKey.charAt(0).toUpperCase() + pageKey.slice(1)} — Page Editor`}
        />
      )}

      {/* Global CSS fix for Puck sidebar scroll and UI collisions */}
      <style>{`
        .puck-sidebar-fields {
          max-height: calc(100vh - 120px);
          overflow-y: auto !important;
          padding-bottom: 40px;
        }
        /* Ensure the publish button is not hidden by other elements */
        .puck-header {
          z-index: 50 !important;
        }
        /* Fix for scrollable field containers */
        [class*=\"Puck-Sidebar\"] {
          scrollbar-width: thin;
        }
      `}</style>
    </div>
  )
}
