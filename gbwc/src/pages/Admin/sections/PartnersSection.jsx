import { useState, useEffect } from 'react'
import { useResource } from '../hooks/useResource'
import LangTabs from '../components/LangTabs'
import SlugInput from '../components/SlugInput'
import ImageUpload from '../components/ImageUpload'
import Pagination from '../components/Pagination'
import ConfirmModal from '../components/ConfirmModal'

const TYPES = [
  { key: 'intl', label: 'Международные' },
  { key: 'corp', label: 'Корпоративные' },
  { key: 'natl', label: 'Национальные' },
  { key: 'inst', label: 'Институты' },
]

function PartnerForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? {
    ...initial,
    // map logo_url → logo for the ImageUpload component
    logo: initial.logo_url || initial.logo || '',
  } : {
    slug: '', name: '', full: {}, type: 'intl', logo: '', url: '', 
    rep: {}, sessions: [], published: true, sort_order: 0,
  })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const handleSave = async () => {
    let data = { ...form }
    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase()
        .replace(/[^а-яёa-z0-9\s]/gi, '')
        .replace(/\s+/g, '-')
        .slice(0, 50)
    }
    if (!data.slug) return alert('Пожалуйста, заполните поле SLUG (адрес ссылки)')

    setSaving(true)
    try {
      // rename logo → logo_url before sending to API
      const { logo, ...rest } = data
      await onSave({ ...rest, logo_url: logo })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="adm-form">
      <div className="adm-form-body">
        <div className="adm-field-group">
          <SlugInput value={form.slug} onChange={v => set('slug', v)} sourceText={form.name || ''} />
          <div className="adm-field">
            <label className="adm-field-label">Краткое имя (лого)</label>
            <input className="adm-input" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
        </div>

        <LangTabs label="Полное название" value={form.full || {}} onChange={v => set('full', v)} />
        
        <div className="adm-field">
          <label className="adm-field-label">Тип партнёра</label>
          <select className="adm-input adm-select" value={form.type} onChange={e => set('type', e.target.value)}>
            {TYPES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
          </select>
        </div>

        <LangTabs label="Представитель / Цитата" value={form.rep || {}} onChange={v => set('rep', v)} multiline rows={3} />

        <div className="adm-field">
          <label className="adm-field-label">Сайт</label>
          <input className="adm-input" placeholder="https://..." value={form.url || ''} onChange={e => set('url', e.target.value)} />
        </div>

        <ImageUpload label="Логотип" value={form.logo} onChange={v => set('logo', v)} folder="logos" />

        <div className="adm-field">
          <label className="adm-field-label">ID Заседаний (через запятую)</label>
          <input 
            className="adm-input" 
            value={(form.sessions || []).join(', ')} 
            onChange={e => set('sessions', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} 
          />
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

export default function PartnersSection() {
  const { items, loading, pagination, list, create, update, remove } = useResource('/partners')
  const [page, setPage] = useState(1)
  const [typeFilter, setTypeFilter] = useState('')
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => { list({ page, limit: 20, ...(typeFilter && { type: typeFilter }) }) }, [page, typeFilter, list])

  const handleCreate = async (data) => { await create(data); setCreating(false); list({ page, limit: 20 }) }
  const handleUpdate = async (data) => { await update(editing.id, data); setEditing(null); list({ page, limit: 20 }) }
  const handleDelete = async () => { await remove(deleting); setDeleting(null); list({ page, limit: 20 }) }

  if (creating) return <PartnerForm onSave={handleCreate} onCancel={() => setCreating(false)} />
  if (editing) return <PartnerForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />

  return (
    <>
      <div className="adm-section-header">
        <div className="adm-filter-tabs">
          {TYPES.map(t => (
            <button key={t.key} className={`adm-filter-tab ${typeFilter === t.key ? 'active' : ''}`} onClick={() => { setTypeFilter(t.key); setPage(1) }}>
              {t.label}
            </button>
          ))}
        </div>
        <button className="adm-btn adm-btn--primary" onClick={() => setCreating(true)}>+ Новый партнёр</button>
      </div>
      {loading ? <div className="adm-loading">Загрузка…</div> : items.length === 0 ? <div className="adm-empty">Нет партнёров</div> : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>#</th><th>Лого</th><th>Название</th><th>Тип</th><th>Действия</th></tr></thead>
            <tbody>
              {items.map(p => (
                <tr key={p.id} className="adm-row">
                  <td className="adm-cell-id">{p.id}</td>
                  <td>{p.logo_url ? <img src={p.logo_url} alt="" className="adm-thumb" /> : '—'}</td>
                  <td><strong>{p.name}</strong>{p.url && <div className="adm-company">{p.url}</div>}</td>
                  <td><span className="adm-badge">{p.type}</span></td>
                  <td className="adm-cell-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setEditing(p)}>✏️</button>
                    <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => setDeleting(p.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination pagination={pagination} page={page} onPageChange={setPage} />
      {deleting && <ConfirmModal title="Удаление партнёра" message="Удалить?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  )
}
