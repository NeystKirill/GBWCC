import { useState } from 'react'
import LangTabs from '../../components/LangTabs'
import DynamicList from '../../components/DynamicList'

export default function HomePlenaryEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    sectionLabel: {}, sectionTitle: {}, more: {},
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
          Виджет «Пленарные заседания» — карточки заседаний на главной странице.
        </div>

        <LangTabs label="Лейбл секции" value={form.sectionLabel || {}} onChange={v => set('sectionLabel', v)} />
        <LangTabs label="Заголовок секции" value={form.sectionTitle || {}} onChange={v => set('sectionTitle', v)} multiline rows={2} />
        <LangTabs label="Кнопка 'Подробнее'" value={form.more || {}} onChange={v => set('more', v)} />

        <h3 style={{ margin: '24px 0 12px', fontSize: 15, color: 'var(--adm-navy)' }}>Заседания</h3>
        <DynamicList
          items={form.items || []}
          onChange={v => set('items', v)}
          defaultItem={() => ({ year: '', num: {}, title: {}, desc: {} })}
          renderItem={(item, onChange, idx) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 12, color: 'var(--adm-gold)' }}>Заседание {idx + 1}</div>
              <div className="adm-field" style={{ margin: 0 }}>
                <label className="adm-field-label">Год</label>
                <input className="adm-input adm-input--sm" value={item.year || ''} onChange={e => onChange({ ...item, year: e.target.value })} />
              </div>
              <LangTabs label="Номер (Первое заседание)" value={item.num || {}} onChange={v => onChange({ ...item, num: v })} />
              <LangTabs label="Название" value={item.title || {}} onChange={v => onChange({ ...item, title: v })} />
              <LangTabs label="Описание" value={item.desc || {}} onChange={v => onChange({ ...item, desc: v })} multiline rows={3} />
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
