import { useState } from 'react'
import LangTabs from '../../components/LangTabs'
import DynamicList from '../../components/DynamicList'

export default function HomeQuoteEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    eyebrow: {}, title: {}, lead: {}, quote: {}, author: {}, role: {},
    pillars: [],
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
          Блок «Наша миссия» на главной — цитата основателя и три столпа деятельности.
        </div>

        <LangTabs label="Eyebrow (НАША МИССИЯ)" value={form.eyebrow || {}} onChange={v => set('eyebrow', v)} />
        <LangTabs label="Заголовок" value={form.title || {}} onChange={v => set('title', v)} />
        <LangTabs label="Вводный текст" value={form.lead || {}} onChange={v => set('lead', v)} multiline rows={3} />
        <LangTabs label="Цитата" value={form.quote || {}} onChange={v => set('quote', v)} multiline rows={3} />
        <LangTabs label="Автор цитаты" value={form.author || {}} onChange={v => set('author', v)} />
        <LangTabs label="Должность автора" value={form.role || {}} onChange={v => set('role', v)} />

        <h3 style={{ margin: '24px 0 12px', fontSize: 15, color: 'var(--adm-navy)' }}>Столпы (pillars)</h3>
        <DynamicList
          items={form.pillars || []}
          onChange={v => set('pillars', v)}
          defaultItem={() => ({ icon: '◆', label: {}, text: {} })}
          renderItem={(item, onChange) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="adm-field" style={{ margin: 0 }}>
                <label className="adm-field-label">Иконка (символ)</label>
                <input className="adm-input adm-input--sm" value={item.icon || ''} onChange={e => onChange({ ...item, icon: e.target.value })} />
              </div>
              <LangTabs label="Название" value={item.label || {}} onChange={v => onChange({ ...item, label: v })} />
              <LangTabs label="Описание" value={item.text || {}} onChange={v => onChange({ ...item, text: v })} multiline rows={2} />
            </div>
          )}
        />
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
