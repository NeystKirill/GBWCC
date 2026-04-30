import { useState } from 'react'
import LangTabs from '../../components/LangTabs'

export default function FoundersPageEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    ru: { label: '', title: '', desc: '' },
    en: { label: '', title: '', desc: '' },
    kk: { label: '', title: '', desc: '' },
  })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  // To match the LangTabs structure, we need to extract field-based objects
  // LangTabs expects: value={{ ru: '...', en: '...' }}
  // We must map our form state to this format and back.
  
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
          Текст на странице «Руководство» (Founders). Заголовок и описание.
        </div>

        <LangTabs label="Лейбл (надзаголовок)" value={getField('label')} onChange={v => setField('label', v)} />
        <LangTabs label="Заголовок" value={getField('title')} onChange={v => setField('title', v)} />
        <LangTabs label="Описание" value={getField('desc')} onChange={v => setField('desc', v)} multiline rows={3} />
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
