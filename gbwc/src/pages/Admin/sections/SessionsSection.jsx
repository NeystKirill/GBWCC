import { useState, useEffect, useCallback } from 'react'
import { useResource } from '../hooks/useResource'
import LangTabs from '../components/LangTabs'
import SlugInput from '../components/SlugInput'
import ImageUpload from '../components/ImageUpload'
import DynamicList from '../components/DynamicList'
import Pagination from '../components/Pagination'
import ConfirmModal from '../components/ConfirmModal'

const TABS = ['Основное', 'Контент', 'Участники', 'Галерея', 'Итоги']

function SessionForm({ initial, onSave, onCancel }) {
  const [tab, setTab] = useState(0)
  const [form, setForm] = useState(initial || {
    slug: '', numeral: '', year: 2025, theme: {}, description: {},
    date: {}, location: {}, context: {},
    members: [], guests: [], results: {},
    cover: null, gallery: [], localPhotos: [],
    published: true, sort_order: 0,
  })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const handleSave = async () => {
    let data = { ...form }
    if (!data.slug && data.theme?.ru) {
      data.slug = data.theme.ru.toLowerCase()
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
      <div className="adm-form-tabs">
        {TABS.map((t, i) => (
          <button key={t} className={`adm-form-tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
        ))}
      </div>

      <div className="adm-form-body">
        {tab === 0 && (
          <>
            <div className="adm-field-group">
              <div className="adm-field">
                <label className="adm-field-label">Номер (I, II, III)</label>
                <input className="adm-input adm-input--sm" value={form.numeral} onChange={e => set('numeral', e.target.value)} />
              </div>
              <div className="adm-field">
                <label className="adm-field-label">Год</label>
                <input className="adm-input adm-input--sm" type="number" value={form.year} onChange={e => set('year', parseInt(e.target.value)||2025)} />
              </div>
              <SlugInput value={form.slug} onChange={v => set('slug', v)} sourceText={form.theme?.ru || ''} />
            </div>
            
            <LangTabs label="Тема заседания" value={form.theme || {}} onChange={v => set('theme', v)} />
            <LangTabs label="Дата (текст)" value={form.date || {}} onChange={v => set('date', v)} />
            <LangTabs label="Локация" value={form.location || {}} onChange={v => set('location', v)} />
            
            <ImageUpload label="Обложка" value={form.cover} onChange={v => set('cover', v)} folder="covers" />
            
            <div className="adm-field adm-field--row">
              <label className="adm-toggle">
                <input type="checkbox" checked={form.published} onChange={e => set('published', e.target.checked)} />
                <span>Опубликовано</span>
              </label>
              <div>
                <label className="adm-field-label">Порядок</label>
                <input className="adm-input adm-input--sm" type="number" value={form.sort_order} onChange={e => set('sort_order', parseInt(e.target.value)||0)} />
              </div>
            </div>
          </>
        )}

        {tab === 1 && (
          <>
            <LangTabs label="Краткое описание" value={form.description || {}} onChange={v => set('description', v)} multiline rows={4} />
            <LangTabs label="Контекст" value={form.context || {}} onChange={v => set('context', v)} multiline rows={8} />
            
            <div className="adm-field">
              <label className="adm-field-label">Темы / Вопросы (один на строку)</label>
              <div className="adm-lang-grid">
                {['ru', 'en', 'kk'].map(l => (
                  <div key={l} className="adm-lang-col">
                    <span className="adm-lang-tag">{l.toUpperCase()}</span>
                    <textarea 
                      className="adm-input adm-textarea" 
                      rows={5}
                      value={(form.topics?.[l] || []).join('\n')}
                      onChange={e => {
                        const lines = e.target.value.split('\n').filter(Boolean)
                        set('topics', { ...form.topics, [l]: lines })
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 2 && (
          <div className="adm-members-editor">
            <h3 className="adm-subheading">Основные участники</h3>
            <DynamicList
              items={form.members || []}
              onChange={v => set('members', v)}
              defaultItem={() => ({ name: '', role: {}, photo: null })}
              renderItem={(item, onChange) => (
                <div className="adm-participant-card">
                  <input className="adm-input" placeholder="Имя" value={item.name || ''} onChange={e => onChange({ ...item, name: e.target.value })} />
                  <LangTabs label="Должность" value={item.role || {}} onChange={v => onChange({ ...item, role: v })} />
                  <ImageUpload label="Фото" value={item.photo} onChange={v => onChange({ ...item, photo: v })} folder="members" />
                </div>
              )}
            />
            <hr />
            <h3 className="adm-subheading">Приглашенные гости</h3>
            <DynamicList
              items={form.guests || []}
              onChange={v => set('guests', v)}
              defaultItem={() => ({ name: '', role: {}, photo: null })}
              renderItem={(item, onChange) => (
                <div className="adm-participant-card">
                  <input className="adm-input" placeholder="Имя" value={item.name || ''} onChange={e => onChange({ ...item, name: e.target.value })} />
                  <LangTabs label="Должность" value={item.role || {}} onChange={v => onChange({ ...item, role: v })} />
                  <ImageUpload label="Фото" value={item.photo} onChange={v => onChange({ ...item, photo: v })} folder="guests" />
                </div>
              )}
            />
          </div>
        )}

        {tab === 3 && (
          <>
            <div className="adm-field">
              <label className="adm-field-label">Локальные фото (пути к файлам /img/...)</label>
              <DynamicList
                items={form.localPhotos || []}
                onChange={v => set('localPhotos', v)}
                defaultItem=""
                renderItem={(item, onChange) => (
                  <input className="adm-input" value={item} onChange={e => onChange(e.target.value)} placeholder="/img/..." />
                )}
              />
            </div>
            <hr />
            <div className="adm-field">
              <label className="adm-field-label">Загруженная галерея</label>
              <ImageUpload multiple label="Загрузить фото" value={form.gallery} onChange={v => set('gallery', v)} folder="sessions" />
            </div>
          </>
        )}

        {tab === 4 && (
          <div className="adm-field">
            <label className="adm-field-label">Ключевые итоги (один на строку)</label>
            <div className="adm-lang-grid">
              {['ru', 'en', 'kk'].map(l => (
                <div key={l} className="adm-lang-col">
                  <span className="adm-lang-tag">{l.toUpperCase()}</span>
                  <textarea 
                    className="adm-input adm-textarea" 
                    rows={10}
                    value={(form.results?.[l] || []).join('\n')}
                    onChange={e => {
                      const lines = e.target.value.split('\n').filter(Boolean)
                      set('results', { ...form.results, [l]: lines })
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
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

export default function SessionsSection() {
  const { items, loading, pagination, list, create, update, remove } = useResource('/sessions')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => { list({ page, limit: 20, published: '' }) }, [page, list])

  const handleCreate = async (data) => {
    await create(data)
    setCreating(false)
    list({ page, limit: 20, published: '' })
  }

  const handleUpdate = async (data) => {
    await update(editing.id, data)
    setEditing(null)
    list({ page, limit: 20, published: '' })
  }

  const handleDelete = async () => {
    await remove(deleting)
    setDeleting(null)
    list({ page, limit: 20, published: '' })
  }

  if (creating) return <SessionForm onSave={handleCreate} onCancel={() => setCreating(false)} />
  if (editing) return <SessionForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />

  return (
    <>
      <div className="adm-section-header">
        <button className="adm-btn adm-btn--primary" onClick={() => setCreating(true)}>+ Новое заседание</button>
      </div>

      {loading ? <div className="adm-loading">Загрузка…</div> : items.length === 0 ? <div className="adm-empty">Нет заседаний</div> : (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead><tr><th>#</th><th>Название</th><th>Дата</th><th>Статус</th><th>Действия</th></tr></thead>
            <tbody>
              {items.map(s => (
                <tr key={s.id} className="adm-row">
                  <td className="adm-cell-id">{s.id}</td>
                  <td><strong>{s.theme?.ru || s.slug}</strong><div className="adm-company">/{s.slug}</div></td>
                  <td className="adm-cell-date">{s.date?.ru || '—'}</td>
                  <td>{s.published ? <span className="adm-badge" style={{background:'#4bbc7a22',color:'#4bbc7a'}}>Опубл.</span> : <span className="adm-badge" style={{background:'#88888822',color:'#888'}}>Черновик</span>}</td>
                  <td className="adm-cell-actions">
                    <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={() => setEditing(s)}>✏️</button>
                    <button className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => setDeleting(s.id)}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />
      {deleting && <ConfirmModal title="Удаление заседания" message="Удалить это заседание?" onConfirm={handleDelete} onCancel={() => setDeleting(null)} />}
    </>
  )
}
