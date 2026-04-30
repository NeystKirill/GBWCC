import { useState, useEffect, useRef } from 'react'
import { useResource } from '../hooks/useResource'
import LangTabs from '../components/LangTabs'
import Pagination from '../components/Pagination'
import ConfirmModal from '../components/ConfirmModal'

function MediaEditModal({ item, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: item.title || {},
    description: item.description || {},
    type: item.type || 'photo',
    tags: item.tags || '',
  })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = async () => {
    setSaving(true)
    try { await onSave(form) } finally { setSaving(false) }
  }

  return (
    <div className="adm-modal-overlay" onClick={onCancel}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <div className="adm-modal-header">
          <div className="adm-modal-title">Редактирование медиа</div>
          <button className="adm-modal-close" onClick={onCancel}>✕</button>
        </div>
        <div style={{ padding: '0 24px 16px' }}>
          {item.url && <img src={item.thumb || item.url} alt="" style={{ maxHeight: 120, borderRadius: 8, marginBottom: 12 }} />}
          <LangTabs label="Заголовок" value={form.title || {}} onChange={v => set('title', v)} />
          <LangTabs label="Описание" value={form.description || {}} onChange={v => set('description', v)} multiline rows={3} />
          <div className="adm-field">
            <label className="adm-field-label">Тип</label>
            <select className="adm-input adm-select" value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="photo">Фото</option>
              <option value="video">Видео</option>
            </select>
          </div>
          <div className="adm-field">
            <label className="adm-field-label">Теги (через запятую)</label>
            <input className="adm-input" value={form.tags || ''} onChange={e => set('tags', e.target.value)} />
          </div>
        </div>
        <div className="adm-modal-actions">
          <button className="adm-btn adm-btn--ghost" onClick={onCancel}>Отмена</button>
          <button className="adm-btn adm-btn--primary" onClick={save} disabled={saving}>
            {saving ? 'Сохранение…' : 'Сохранить'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MediaSection() {
  const { items, loading, pagination, list, update, remove } = useResource('/media')
  const [page, setPage] = useState(1)
  const [typeFilter, setTypeFilter] = useState('')
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  useEffect(() => { list({ page, limit: 24, ...(typeFilter && { type: typeFilter }) }) }, [page, typeFilter, list])

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    try {
      const token = localStorage.getItem('gbwc_token')
      const form = new FormData()
      files.forEach(f => form.append('files', f))
      form.append('type', 'photo')
      await fetch('/api/media', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      list({ page, limit: 24 })
    } catch (err) {
      alert('Upload error: ' + err.message)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleEdit = async (data) => {
    await update(editing.id, data)
    setEditing(null)
    list({ page, limit: 24, ...(typeFilter && { type: typeFilter }) })
  }

  const handleDelete = async () => { await remove(deleting); setDeleting(null) }

  return (
    <>
      <div className="adm-section-header">
        <div className="adm-filter-tabs">
          {[{key:'',label:'Все'},{key:'photo',label:'Фото'},{key:'video',label:'Видео'}].map(t => (
            <button key={t.key} className={`adm-filter-tab ${typeFilter === t.key ? 'active' : ''}`} onClick={() => { setTypeFilter(t.key); setPage(1) }}>
              {t.label}
            </button>
          ))}
        </div>
        <div>
          <input ref={fileRef} type="file" multiple accept="image/*" hidden onChange={handleUpload} />
          <button className="adm-btn adm-btn--primary" onClick={() => fileRef.current?.click()} disabled={uploading}>
            {uploading ? 'Загрузка…' : '+ Загрузить фото'}
          </button>
        </div>
      </div>

      {loading ? <div className="adm-loading">Загрузка…</div> : items.length === 0 ? <div className="adm-empty">Нет медиа</div> : (
        <div className="adm-media-grid">
          {items.map(m => (
            <div key={m.id} className="adm-media-card">
              <div className="adm-media-img">
                <img src={m.thumb || m.url} alt="" />
              </div>
              <div className="adm-media-info">
                <span className="adm-badge">{m.type}</span>
                <div className="adm-media-btns">
                  <button className="adm-btn-icon" onClick={() => setEditing(m)} title="Редактировать">✏️</button>
                  <button className="adm-btn-icon adm-btn-icon--danger" onClick={() => setDeleting(m.id)}>🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />
      {editing && <MediaEditModal item={editing} onSave={handleEdit} onCancel={() => setEditing(null)} />}
      {deleting && <ConfirmModal title="Удаление медиа" message="Удалить этот файл?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  )
}
