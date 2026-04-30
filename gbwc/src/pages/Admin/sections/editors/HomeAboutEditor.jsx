import { useState } from 'react'
import LangTabs from '../../components/LangTabs'
import DynamicList from '../../components/DynamicList'

export default function HomeAboutEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    label: {}, title: {}, p1: {}, p2: {}, p3: {}, cta: {}, quote: {},
    stats: [
      { num: '15+', label: {} },
      { num: '13+', label: {} },
      { num: '3', label: {} },
      { num: '5+', label: {} },
    ],
    slideshow: [],
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
          Виджет «О платформе» — первый блок после героя на главной странице.
        </div>

        <LangTabs label="Лейбл (маленький текст)" value={form.label || {}} onChange={v => set('label', v)} />
        <LangTabs label="Заголовок" value={form.title || {}} onChange={v => set('title', v)} multiline rows={2} />
        <LangTabs label="Абзац 1" value={form.p1 || {}} onChange={v => set('p1', v)} multiline rows={3} />
        <LangTabs label="Абзац 2" value={form.p2 || {}} onChange={v => set('p2', v)} multiline rows={3} />
        <LangTabs label="Абзац 3" value={form.p3 || {}} onChange={v => set('p3', v)} multiline rows={3} />
        <LangTabs label="Кнопка CTA" value={form.cta || {}} onChange={v => set('cta', v)} />
        <LangTabs label="Цитата (внизу)" value={form.quote || {}} onChange={v => set('quote', v)} multiline rows={2} />

        <h3 style={{ margin: '24px 0 12px', fontSize: 15, color: 'var(--adm-navy)' }}>Статистики</h3>
        <DynamicList
          items={form.stats || []}
          onChange={v => set('stats', v)}
          defaultItem={() => ({ num: '', label: {} })}
          renderItem={(item, onChange) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="adm-field" style={{ margin: 0 }}>
                <label className="adm-field-label">Число</label>
                <input className="adm-input adm-input--sm" value={item.num || ''} onChange={e => onChange({ ...item, num: e.target.value })} placeholder="напр. 15+" />
              </div>
              <LangTabs label="Подпись" value={item.label || {}} onChange={v => onChange({ ...item, label: v })} />
            </div>
          )}
        />

        <h3 style={{ margin: '24px 0 12px', fontSize: 15, color: 'var(--adm-navy)' }}>Слайдшоу (пути к фото)</h3>
        <DynamicList
          items={form.slideshow || []}
          onChange={v => set('slideshow', v)}
          defaultItem=""
          renderItem={(item, onChange) => (
            <input className="adm-input" value={item} onChange={e => onChange(e.target.value)} placeholder="/img/plenary/..." />
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
