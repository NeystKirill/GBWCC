import { useState } from 'react'
import LangTabs from '../../components/LangTabs'

export default function EventsPageEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    ru: { eyebrow: '', heroTitle: '', heroDesc: '', members: '', guests: '', topics: '', results: '', gallery: '', video: '', photos: '', noPhoto: '' },
    en: { eyebrow: '', heroTitle: '', heroDesc: '', members: '', guests: '', topics: '', results: '', gallery: '', video: '', photos: '', noPhoto: '' },
    kk: { eyebrow: '', heroTitle: '', heroDesc: '', members: '', guests: '', topics: '', results: '', gallery: '', video: '', photos: '', noPhoto: '' },
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
          Текст на странице «Мероприятия» (Events). Заголовки секций и кнопок.
        </div>

        <h3 className="adm-form-subtitle">Блок Hero</h3>
        <LangTabs label="Надзаголовок" value={getField('eyebrow')} onChange={v => setField('eyebrow', v)} />
        <LangTabs label="Заголовок" value={getField('heroTitle')} onChange={v => setField('heroTitle', v)} />
        <LangTabs label="Описание" value={getField('heroDesc')} onChange={v => setField('heroDesc', v)} multiline rows={3} />

        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Разделы сессии</h3>
        <LangTabs label="Члены совета" value={getField('members')} onChange={v => setField('members', v)} />
        <LangTabs label="Приглашенные гости" value={getField('guests')} onChange={v => setField('guests', v)} />
        <LangTabs label="Темы обсуждения" value={getField('topics')} onChange={v => setField('topics', v)} />
        <LangTabs label="Ключевые результаты" value={getField('results')} onChange={v => setField('results', v)} />
        
        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Медиа</h3>
        <LangTabs label="Фотогалерея (Кнопка)" value={getField('gallery')} onChange={v => setField('gallery', v)} />
        <LangTabs label="Видео (Кнопка)" value={getField('video')} onChange={v => setField('video', v)} />
        <LangTabs label="Заголовок Фотографии" value={getField('photos')} onChange={v => setField('photos', v)} />
        <LangTabs label="Перейти в галерею (Кнопка)" value={getField('noPhoto')} onChange={v => setField('noPhoto', v)} />
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
