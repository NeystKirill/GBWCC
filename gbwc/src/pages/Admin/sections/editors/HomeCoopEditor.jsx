import { useState } from 'react'
import LangTabs from '../../components/LangTabs'

export default function HomeCoopEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    label: {}, title: {}, text: {}, btn1: {}, btn2: {},
    tags: {},
  })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const save = async () => {
    setSaving(true); setMsg('')
    try { await onSave(form); setMsg('✅ Сохранено') }
    catch { setMsg('❌ Ошибка') }
    finally { setSaving(false) }
  }

  return (
    <div className="adm-form">
      <div className="adm-form-body">
        <div className="adm-section-info" style={{ marginBottom: 20 }}>
          Блок «Сотрудничество» (CTA) — финальный блок главной страницы с призывом к взаимодействию.
        </div>

        <LangTabs label="Лейбл" value={form.label || {}} onChange={v => set('label', v)} />
        <LangTabs label="Заголовок" value={form.title || {}} onChange={v => set('title', v)} />
        <LangTabs label="Текст" value={form.text || {}} onChange={v => set('text', v)} multiline rows={3} />
        <LangTabs label="Кнопка 1" value={form.btn1 || {}} onChange={v => set('btn1', v)} />
        <LangTabs label="Кнопка 2" value={form.btn2 || {}} onChange={v => set('btn2', v)} />

        <div className="adm-field">
          <label className="adm-field-label">Теги (через запятую)</label>
          <div className="adm-lang-grid">
            {['ru', 'en', 'kk'].map(l => (
              <div key={l} className="adm-lang-col">
                <span className="adm-lang-tag">{l.toUpperCase()}</span>
                <textarea
                  className="adm-input adm-textarea"
                  rows={3}
                  value={Array.isArray(form.tags?.[l]) ? form.tags[l].join(', ') : (form.tags?.[l] || '')}
                  onChange={e => {
                    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    set('tags', { ...form.tags, [l]: arr })
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="adm-form-footer">
        {msg && <span style={{ fontSize: 13 }}>{msg}</span>}
        <button className="adm-btn adm-btn--primary" onClick={save} disabled={saving}>
          {saving ? 'Сохранение…' : 'Сохранить'}
        </button>
      </div>
    </div>
  )
}
