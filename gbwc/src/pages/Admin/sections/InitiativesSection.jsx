import { useState, useEffect } from 'react'
import { useResource } from '../hooks/useResource'
import LangTabs from '../components/LangTabs'
import SlugInput from '../components/SlugInput'
import ImageUpload from '../components/ImageUpload'
import DynamicList from '../components/DynamicList'
import Pagination from '../components/Pagination'
import ConfirmModal from '../components/ConfirmModal'

function InitiativeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    slug: '', num: '', tag: {}, title: {}, description: {}, details: {}, tasks: { ru: [], en: [], kk: [] },
    published: true, sort_order: 0,
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
        <div className="adm-field-group">
          <div className="adm-field">
            <label className="adm-field-label">Номер (напр. 01)</label>
            <input className="adm-input adm-input--sm" value={form.num} onChange={e => set('num', e.target.value)} />
          </div>
          <SlugInput value={form.slug} onChange={v => set('slug', v)} sourceText={form.title?.ru || ''} />
        </div>
        
        <LangTabs label="Тег / Категория" value={form.tag || {}} onChange={v => set('tag', v)} />
        <LangTabs label="Заголовок" value={form.title || {}} onChange={v => set('title', v)} />
        <LangTabs label="Краткое описание" value={form.description || {}} onChange={v => set('description', v)} multiline rows={3} />
        <LangTabs label="Детальное описание" value={form.details || {}} onChange={v => set('details', v)} multiline rows={6} />
        
        <div className="adm-field">
          <label className="adm-field-label">Задачи (одна на строку)</label>
          <div className="adm-lang-grid">
            {['ru', 'en', 'kk'].map(l => (
              <div key={l} className="adm-lang-col">
                <span className="adm-lang-tag">{l.toUpperCase()}</span>
                <textarea 
                  className="adm-input adm-textarea" 
                  rows={5}
                  value={(form.tasks?.[l] || []).join('\n')}
                  onChange={e => {
                    const lines = e.target.value.split('\n').filter(Boolean)
                    set('tasks', { ...form.tasks, [l]: lines })
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="adm-field adm-field--row">
          <label className="adm-toggle">
            <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />
            <span>Опубликовано</span>
          </label>
          <div><label className="adm-field-label">Порядок</label>
          <input className="adm-input adm-input--sm" type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value)||0)} /></div>
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

export default function InitiativesSection() {
  const { items, loading, pagination, list, create, update, remove } = useResource('/initiatives')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => { list({ page, limit: 20, published: '' }) }, [page, list])

  const handleCreate = async (data) => { await create(data); setCreating(false); list({ page, limit: 20, published: '' }) }
  const handleUpdate = async (data) => { await update(editing.id, data); setEditing(null); list({ page, limit: 20, published: '' }) }
  const handleDelete = async () => { await remove(deleting); setDeleting(null); list({ page, limit: 20, published: '' }) }

  if (creating) return <InitiativeForm onSave={handleCreate} onCancel={() => setCreating(false)} />
  if (editing) return <InitiativeForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />

  return (
    <>
      <div className="adm-section-header">
        <button className="adm-btn adm-btn--primary" onClick={() => setCreating(true)}>+ Новая инициатива</button>
      </div>
      {loading ? <div className="adm-loading">Загрузка…</div> : items.length === 0 ? <div className="adm-empty">Нет инициатив</div> : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>#</th><th>Название</th><th>Статус</th><th>Действия</th></tr></thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id} className="adm-row">
                  <td className="adm-cell-id">{i.id}</td>
                  <td><strong>{i.title?.ru || i.slug}</strong></td>
                  <td>{i.published ? <span className="adm-badge" style={{background:'#4bbc7a22',color:'#4bbc7a'}}>Опубл.</span> : <span className="adm-badge" style={{background:'#88888822',color:'#888'}}>Черновик</span>}</td>
                  <td className="adm-cell-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setEditing(i)}>✏️</button>
                    <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => setDeleting(i.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination pagination={pagination} page={page} onPageChange={setPage} />
      {deleting && <ConfirmModal title="Удаление инициативы" message="Удалить?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  )
}
