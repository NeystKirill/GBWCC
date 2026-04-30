import { useState } from 'react'
import LangTabs from '../../components/LangTabs'
import DynamicList from '../../components/DynamicList'

export default function HomeDirectionsEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    sectionLabel: {}, sectionTitle: {}, sectionSubtext: {},
    items: [],
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
          Блок «Направления деятельности» — четыре ключевых направления работы GBWC.
        </div>

        <LangTabs label="Лейбл секции" value={form.sectionLabel || {}} onChange={v => set('sectionLabel', v)} />
        <LangTabs label="Заголовок секции" value={form.sectionTitle || {}} onChange={v => set('sectionTitle', v)} multiline rows={2} />
        <LangTabs label="Подтекст секции" value={form.sectionSubtext || {}} onChange={v => set('sectionSubtext', v)} multiline rows={3} />

        <h3 style={{ margin: '24px 0 12px', fontSize: 15, color: 'var(--adm-navy)' }}>Направления</h3>
        <DynamicList
          items={form.items || []}
          onChange={v => set('items', v)}
          defaultItem={() => ({ title: {}, desc: {} })}
          renderItem={(item, onChange, idx) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--adm-gold)' }}>Направление {idx + 1}</div>
              <LangTabs label="Название" value={item.title || {}} onChange={v => onChange({ ...item, title: v })} />
              <LangTabs label="Описание" value={item.desc || {}} onChange={v => onChange({ ...item, desc: v })} multiline rows={2} />
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
