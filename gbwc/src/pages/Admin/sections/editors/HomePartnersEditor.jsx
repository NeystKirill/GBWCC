import { useState } from 'react'
import LangTabs from '../../components/LangTabs'

export default function HomePartnersEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    sectionLabel: {}, sectionTitle: {}, sectionSubtext: {},
    intlLabel: {}, corpLabel: {}, natlLabel: {},
    intl: {}, corp: {}, natl: {},
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

  // Helper for comma-separated list per language
  const ListEditor = ({ label, value, onChange }) => (
    <div className="adm-field">
      <label className="adm-field-label">{label} (через запятую)</label>
      <div className="adm-lang-grid">
        {['ru', 'en', 'kk'].map(l => (
          <div key={l} className="adm-lang-col">
            <span className="adm-lang-tag">{l.toUpperCase()}</span>
            <textarea
              className="adm-input adm-textarea"
              rows={3}
              value={Array.isArray(value?.[l]) ? value[l].join(', ') : (value?.[l] || '')}
              onChange={e => {
                const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                onChange({ ...value, [l]: arr })
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="adm-form">
      <div className="adm-form-body">
        <div className="adm-section-info" style={{ marginBottom: 20 }}>
          Виджет «Участники пленарных заседаний» — списки партнёров по категориям.
        </div>

        <LangTabs label="Лейбл секции" value={form.sectionLabel || {}} onChange={v => set('sectionLabel', v)} />
        <LangTabs label="Заголовок секции" value={form.sectionTitle || {}} onChange={v => set('sectionTitle', v)} multiline rows={2} />
        <LangTabs label="Подтекст секции" value={form.sectionSubtext || {}} onChange={v => set('sectionSubtext', v)} multiline rows={2} />

        <hr style={{ margin: '24px 0', borderColor: 'var(--adm-border)' }} />

        <LangTabs label="Лейбл: Международные" value={form.intlLabel || {}} onChange={v => set('intlLabel', v)} />
        <ListEditor label="Международные организации" value={form.intl || {}} onChange={v => set('intl', v)} />

        <LangTabs label="Лейбл: Корпоративные" value={form.corpLabel || {}} onChange={v => set('corpLabel', v)} />
        <ListEditor label="Корпоративные участники" value={form.corp || {}} onChange={v => set('corp', v)} />

        <LangTabs label="Лейбл: Национальные" value={form.natlLabel || {}} onChange={v => set('natlLabel', v)} />
        <ListEditor label="Национальные институты" value={form.natl || {}} onChange={v => set('natl', v)} />
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
