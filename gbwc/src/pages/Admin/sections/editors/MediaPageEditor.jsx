import { useState } from 'react'
import LangTabs from '../../components/LangTabs'

export default function MediaPageEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    ru: { title: '', subtitle: '', all: '', international: '', national: '', kazakh: '', read: '' },
    en: { title: '', subtitle: '', all: '', international: '', national: '', kazakh: '', read: '' },
    kk: { title: '', subtitle: '', all: '', international: '', national: '', kazakh: '', read: '' },
  })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const getField = (field) => ({
    ru: form.ru?.[field] || '',
    en: form.en?.[field] || '',
    kk: form.kk?.[field] || ''
  })
  
  const setField = (field, valObj) => {
    setForm(f => ({
      ...f,
      ru: { ...f.ru, [field]: valObj.ru },
      en: { ...f.en, [field]: valObj.en },
      kk: { ...f.kk, [field]: valObj.kk },
    }))
  }

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
          Текст на странице «Медиа» (Media). Заголовки, категории фильтров и кнопки.
        </div>

        <h3 className="adm-form-subtitle">Блок Hero</h3>
        <LangTabs label="Заголовок" value={getField('title')} onChange={v => setField('title', v)} />
        <LangTabs label="Описание" value={getField('subtitle')} onChange={v => setField('subtitle', v)} multiline rows={3} />

        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Категории фильтров</h3>
        <LangTabs label="Все" value={getField('all')} onChange={v => setField('all', v)} />
        <LangTabs label="Международные издания" value={getField('international')} onChange={v => setField('international', v)} />
        <LangTabs label="Республиканские издания" value={getField('national')} onChange={v => setField('national', v)} />
        <LangTabs label="Казахоязычные издания" value={getField('kazakh')} onChange={v => setField('kazakh', v)} />
        
        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Интерфейс</h3>
        <LangTabs label="Кнопка «Читать»" value={getField('read')} onChange={v => setField('read', v)} />
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
