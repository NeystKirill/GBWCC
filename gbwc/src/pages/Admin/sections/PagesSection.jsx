import { useState, useEffect, useCallback } from 'react'

// Editors
import HomeHeroEditor from './editors/HomeHeroEditor'
import HomeAboutEditor from './editors/HomeAboutEditor'
import HomeQuoteEditor from './editors/HomeQuoteEditor'
import HomeDirectionsEditor from './editors/HomeDirectionsEditor'
import HomePlenaryEditor from './editors/HomePlenaryEditor'
import HomeInitiativesEditor from './editors/HomeInitiativesEditor'
import HomePartnersEditor from './editors/HomePartnersEditor'
import HomeCoopEditor from './editors/HomeCoopEditor'
import AboutPageEditor from './editors/AboutPageEditor'
import ContactsPageEditor from './editors/ContactsPageEditor'

import FoundersPageEditor from './editors/FoundersPageEditor'
import EventsPageEditor from './editors/EventsPageEditor'
import InitiativesPageEditor from './editors/InitiativesPageEditor'
import MediaPageEditor from './editors/MediaPageEditor'
import PartnersPageEditor from './editors/PartnersPageEditor'

const PAGE_TREE = [
  {
    group: '🏠 Главная страница',
    pages: [
      { key: 'home/hero',        label: 'Hero (Видео-слайдер)',     editor: HomeHeroEditor },
      { key: 'home/about',       label: 'О платформе',              editor: HomeAboutEditor },
      { key: 'home/quote',       label: 'Миссия / Цитата',          editor: HomeQuoteEditor },
      { key: 'home/directions',  label: 'Направления',              editor: HomeDirectionsEditor },
      { key: 'home/plenary',     label: 'Пленарные заседания',      editor: HomePlenaryEditor },
      { key: 'home/initiatives', label: 'Инициативы',               editor: HomeInitiativesEditor },
      { key: 'home/partners',    label: 'Участники / Партнёры',     editor: HomePartnersEditor },
      { key: 'home/coop',        label: 'Сотрудничество (CTA)',     editor: HomeCoopEditor },
    ],
  },
  {
    group: '📖 Внутренние страницы',
    pages: [
      { key: 'about', label: 'О Совете', editor: AboutPageEditor },
      { key: 'founders', label: 'Руководство', editor: FoundersPageEditor },
      { key: 'events', label: 'Мероприятия', editor: EventsPageEditor },
      { key: 'initiatives', label: 'Инициативы', editor: InitiativesPageEditor },
      { key: 'media', label: 'Медиа', editor: MediaPageEditor },
      { key: 'partners', label: 'Партнёры', editor: PartnersPageEditor },
      { key: 'contacts', label: 'Контакты', editor: ContactsPageEditor },
    ],
  },
]

const ALL_PAGES = PAGE_TREE.flatMap(g => g.pages)

export default function PagesSection() {
  const [selectedKey, setSelectedKey] = useState(ALL_PAGES[0].key)
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(false)

  const token = localStorage.getItem('gbwc_token')

  const loadPage = useCallback(async (key) => {
    setLoading(true)
    setContent(null)
    try {
      const res = await fetch(`/api/pages/${key}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setContent(data.content || {})
      } else {
        setContent({})
      }
    } catch {
      setContent({})
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => { loadPage(selectedKey) }, [selectedKey, loadPage])

  const handleSave = async (newContent) => {
    const res = await fetch('/api/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ key: selectedKey, content: newContent }),
    })
    if (!res.ok) throw new Error('Save failed')
    setContent(newContent)
  }

  const currentPage = ALL_PAGES.find(p => p.key === selectedKey)
  const EditorComponent = currentPage?.editor

  return (
    <div className="adm-pages-layout">
      <div className="adm-pages-sidebar">
        {PAGE_TREE.map(group => (
          <div key={group.group}>
            <div className="adm-nav-label">{group.group}</div>
            {group.pages.map(p => (
              <button
                key={p.key}
                className={`adm-nav-item ${selectedKey === p.key ? 'active' : ''}`}
                onClick={() => setSelectedKey(p.key)}
              >
                {p.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="adm-pages-content">
        {loading ? (
          <div className="adm-loading">Загрузка…</div>
        ) : EditorComponent ? (
          <EditorComponent content={content} onSave={handleSave} />
        ) : (
          <div className="adm-empty">Выберите раздел для редактирования</div>
        )}
      </div>
    </div>
  )
}
