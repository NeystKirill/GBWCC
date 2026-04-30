import { useState, useEffect } from 'react'
import { useResource } from '../hooks/useResource'
import LangTabs from '../components/LangTabs'
import SlugInput from '../components/SlugInput'
import ImageUpload from '../components/ImageUpload'
import Pagination from '../components/Pagination'
import ConfirmModal from '../components/ConfirmModal'

function NewsForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    slug: '', title: {}, excerpt: {}, body: {}, cover: null,
    source: '', source_url: '', published_at: '', published: false,
  })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const handleSave = async () => {
    let data = { ...form }
    if (!data.slug && data.title?.ru) {
      data.slug = data.title.ru.toLowerCase()
        .replace(/[^а-яёa-z0-9\s]/gi, '')
        .replace(/\s+/g, '-')
        .slice(0, 50)
    }
    if (!data.slug) return alert('Пожалуйста, заполните поле SLUG (адрес ссылки)')

    setSaving(true)
    try { await onSave(data) } finally { setSaving(false) }
  }

  return (
    <div className="adm-form">
      <div className="adm-form-body">
        <SlugInput value={form.slug} onChange={v => set('slug', v)} sourceText={form.title?.ru || ''} />
        <LangTabs label="Заголовок" value={form.title || {}} onChange={v => set('title', v)} />
        <LangTabs label="Краткое описание" value={form.excerpt || {}} onChange={v => set('excerpt', v)} multiline rows={3} />
        <LangTabs label="Полный текст" value={form.body || {}} onChange={v => set('body', v)} multiline rows={10} />
        <ImageUpload label="Обложка" value={form.cover} onChange={v => set('cover', v)} folder="covers" />
        <div className="adm-field">
          <label className="adm-field-label">Источник</label>
          <input className="adm-input" value={form.source || ''} onChange={e => set('source', e.target.value)} placeholder="Название СМИ" />
        </div>
        <div className="adm-field">
          <label className="adm-field-label">Ссылка на источник</label>
          <input className="adm-input" value={form.source_url || ''} onChange={e => set('source_url', e.target.value)} placeholder="https://..." />
        </div>
        <div className="adm-field">
          <label className="adm-field-label">Дата публикации</label>
          <input className="adm-input" type="datetime-local" value={form.published_at ? form.published_at.slice(0,16) : ''} onChange={e => set('published_at', e.target.value)} />
        </div>
        <div className="adm-field">
          <label className="adm-toggle">
            <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />
            <span>Опубликовано</span>
          </label>
        </div>
      </div>
      <div className="adm-form-footer">
        <button className="adm-btn adm-btn--ghost" onClick={onCancel}>Отмена</button>
        <button className="adm-btn adm-btn--primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Сохранение…' : 'Сохранить'}
        </button>
      </div>
    </div>
  )
}

export default function NewsSection() {
  const { items, loading, pagination, list, create, update, remove } = useResource('/news')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => { list({ page, limit: 20, published: '' }) }, [page, list])

  const handleCreate = async (data) => { await create(data); setCreating(false); list({ page, limit: 20, published: '' }) }
  const handleUpdate = async (data) => { await update(editing.id, data); setEditing(null); list({ page, limit: 20, published: '' }) }
  const handleDelete = async () => { await remove(deleting); setDeleting(null); list({ page, limit: 20, published: '' }) }

  const fmt = s => s ? new Date(s).toLocaleDateString('ru-RU') : '—'

  if (creating) return <NewsForm onSave={handleCreate} onCancel={() => setCreating(false)} />
  if (editing) return <NewsForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />

  return (
    <>
      <div className="adm-section-header">
        <button className="adm-btn adm-btn--primary" onClick={() => setCreating(true)}>+ Новая новость</button>
      </div>
      {loading ? <div className="adm-loading">Загрузка…</div> : items.length === 0 ? <div className="adm-empty">Нет новостей</div> : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>#</th><th>Заголовок</th><th>Источник</th><th>Дата</th><th>Статус</th><th>Действия</th></tr></thead>
            <tbody>
              {items.map(n => (
                <tr key={n.id} className="adm-row">
                  <td className="adm-cell-id">{n.id}</td>
                  <td><strong>{n.title?.ru || n.slug}</strong></td>
                  <td className="adm-cell-date">{n.source || '—'}</td>
                  <td className="adm-cell-date">{fmt(n.published_at)}</td>
                  <td>{n.published ? <span className="adm-badge" style={{background:'#4bbc7a22',color:'#4bbc7a'}}>Опубл.</span> : <span className="adm-badge" style={{background:'#e8b84b22',color:'#e8b84b'}}>Черновик</span>}</td>
                  <td className="adm-cell-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setEditing(n)}>✏️</button>
                    <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => setDeleting(n.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination pagination={pagination} page={page} onPageChange={setPage} />
      {deleting && <ConfirmModal title="Удаление новости" message="Удалить?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  )
}
