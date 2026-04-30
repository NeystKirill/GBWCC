import { useState, useEffect } from 'react'
import { useResource } from '../hooks/useResource'
import LangTabs from '../components/LangTabs'
import SlugInput from '../components/SlugInput'
import ImageUpload from '../components/ImageUpload'
import Pagination from '../components/Pagination'
import ConfirmModal from '../components/ConfirmModal'

function LeaderForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || {
    slug: '', name: {}, role: {}, bio: {}, quote: {},
    photo: null, social: {}, published: true, sort_order: 0,
    initials: '', index: '', positions: {}, decree: {},
    competenciesLabel: {}, competencies: {},
    gbwcLabel: {}, gbwc: {}
  })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  // Helper for comma-separated array fields
  const getArray = (val) => Array.isArray(val) ? val.join(', ') : ''
  const setArray = (lang, field, str) => {
    const arr = str.split(',').map(s => s.trim()).filter(Boolean)
    const current = form[field] || {}
    set(field, { ...current, [lang]: arr })
  }

  return (
    <div className="adm-form">
      <div className="adm-form-body">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <SlugInput value={form.slug} onChange={v => set('slug', v)} sourceText={form.name?.ru || ''} />
          <div className="adm-field">
            <label className="adm-field-label">Индексация (Инициалы / Индекс)</label>
            <div style={{ display: 'flex', gap: 10 }}>
              <input className="adm-input" placeholder="Инициалы (ЖБ)" value={form.initials || ''} onChange={e => set('initials', e.target.value)} />
              <input className="adm-input" placeholder="Индекс (01)" value={form.index || ''} onChange={e => set('index', e.target.value)} />
            </div>
          </div>
        </div>

        <LangTabs label="Имя" value={form.name || {}} onChange={v => set('name', v)} />
        <LangTabs label="Должность" value={form.role || {}} onChange={v => set('role', v)} />
        
        <div className="adm-field">
          <label className="adm-field-label">Позиции (через запятую)</label>
          <LangTabs 
            value={form.positions || {}} 
            onChange={v => set('positions', v)} 
            multiline 
            rows={2}
          />
        </div>

        <div className="adm-field">
          <label className="adm-field-label">Биография (поддерживает HTML)</label>
          <LangTabs value={form.bio || {}} onChange={v => set('bio', v)} multiline rows={8} />
        </div>

        <LangTabs label="Указ / Цитата президента" value={form.decree || {}} onChange={v => set('decree', v)} multiline rows={3} />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: 10 }}>
          <div className="adm-col">
            <LangTabs label="Лейбл компетенций" value={form.competenciesLabel || {}} onChange={v => set('competenciesLabel', v)} />
            <div className="adm-field" style={{marginTop: 8}}>
              <label className="adm-field-label">Компетенции (через запятую)</label>
              <LangTabs value={form.competencies || {}} onChange={v => set('competencies', v)} multiline rows={4} />
            </div>
          </div>
          <div className="adm-col">
            <LangTabs label="Лейбл направлений GBWC" value={form.gbwcLabel || {}} onChange={v => set('gbwcLabel', v)} />
            <div className="adm-field" style={{marginTop: 8}}>
              <label className="adm-field-label">Направления (через запятую)</label>
              <LangTabs value={form.gbwc || {}} onChange={v => set('gbwc', v)} multiline rows={4} />
            </div>
          </div>
        </div>

        <ImageUpload label="Главное Фото" value={form.photo} onChange={v => set('photo', v)} />
        
        <div className="adm-field">
          <label className="adm-field-label">Социальные сети</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <input className="adm-input" placeholder="LinkedIn" value={form.social?.linkedin || ''} onChange={e => set('social', { ...form.social, linkedin: e.target.value })} />
            <input className="adm-input" placeholder="Instagram" value={form.social?.instagram || ''} onChange={e => set('social', { ...form.social, instagram: e.target.value })} />
            <input className="adm-input" placeholder="Telegram" value={form.social?.telegram || ''} onChange={e => set('social', { ...form.social, telegram: e.target.value })} />
          </div>
        </div>

        <div className="adm-field adm-field--row">
          <label className="adm-toggle">
            <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />
            <span>Опубликовано</span>
          </label>
          <div>
            <label className="adm-field-label">Порядок сортировки</label>
            <input className="adm-input adm-input--sm" type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value)||0)} />
          </div>
        </div>
      </div>
      <div className="adm-form-footer">
        <button className="adm-btn adm-btn--ghost" onClick={onCancel}>Отмена</button>
        <button className="adm-btn adm-btn--primary" onClick={async () => { setSaving(true); try { await onSave(form) } finally { setSaving(false) } }} disabled={saving}>
          {saving ? 'Сохранение…' : 'Сохранить'}
        </button>
      </div>
    </div>
  )
}

export default function LeadersSection() {
  const { items, loading, pagination, list, create, update, remove } = useResource('/leaders')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => { list({ page, limit: 20, published: '' }) }, [page, list])

  const handleCreate = async (data) => { await create(data); setCreating(false); list({ page, limit: 20, published: '' }) }
  const handleUpdate = async (data) => { await update(editing.id, data); setEditing(null); list({ page, limit: 20, published: '' }) }
  const handleDelete = async () => { await remove(deleting); setDeleting(null); list({ page, limit: 20, published: '' }) }

  if (creating) return <LeaderForm onSave={handleCreate} onCancel={() => setCreating(false)} />
  if (editing) return <LeaderForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />

  return (
    <>
      <div className="adm-section-header">
        <button className="adm-btn adm-btn--primary" onClick={() => setCreating(true)}>+ Добавить лидера</button>
      </div>
      {loading ? <div className="adm-loading">Загрузка…</div> : items.length === 0 ? <div className="adm-empty">Нет лидеров</div> : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>#</th><th>Фото</th><th>Имя</th><th>Должность</th><th>Порядок</th><th>Статус</th><th>Действия</th></tr></thead>
            <tbody>
              {items.map(l => (
                <tr key={l.id} className="adm-row">
                  <td className="adm-cell-id">{l.index || '—'}</td>
                  <td>{l.photo ? <img src={l.photo} alt="" className="adm-thumb" /> : '—'}</td>
                  <td><strong>{l.name?.ru || l.slug}</strong></td>
                  <td className="adm-cell-date">{l.role?.ru || '—'}</td>
                  <td>{l.sort_order}</td>
                  <td>{l.published ? <span className="adm-badge" style={{background:'#4bbc7a22',color:'#4bbc7a'}}>Опубл.</span> : <span className="adm-badge" style={{background:'#88888822',color:'#888'}}>Черновик</span>}</td>
                  <td className="adm-cell-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setEditing(l)}>✏️</button>
                    <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => setDeleting(l.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination pagination={pagination} page={page} onPageChange={setPage} />
      {deleting && <ConfirmModal title="Удаление лидера" message="Удалить этого лидера?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  )
}
