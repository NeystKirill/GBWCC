import { useState } from 'react'
import LangTabs from '../../components/LangTabs'

export default function InitiativesPageEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    ru: { eyebrow: '', heroTitle: '', heroDesc: '', intro: '', partnershipLabel: '', partnershipTitle: '', partnershipText: '', ctaTitle: '', ctaText: '', ctaEmail: '', ctaBtn: '', tasksLabel: '' },
    en: { eyebrow: '', heroTitle: '', heroDesc: '', intro: '', partnershipLabel: '', partnershipTitle: '', partnershipText: '', ctaTitle: '', ctaText: '', ctaEmail: '', ctaBtn: '', tasksLabel: '' },
    kk: { eyebrow: '', heroTitle: '', heroDesc: '', intro: '', partnershipLabel: '', partnershipTitle: '', partnershipText: '', ctaTitle: '', ctaText: '', ctaEmail: '', ctaBtn: '', tasksLabel: '' },
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

  // Fallback for non-localized field
  const handleCtaEmailChange = (e) => {
    const val = e.target.value
    setForm(f => ({
      ...f,
      ru: { ...f.ru, ctaEmail: val },
      en: { ...f.en, ctaEmail: val },
      kk: { ...f.kk, ctaEmail: val },
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
          Текст на странице «Инициативы» (Initiatives). Общие тексты и блок партнерства. Сами инициативы редактируются в разделе «Инициативы».
        </div>

        <h3 className="adm-form-subtitle">Блок Hero</h3>
        <LangTabs label="Надзаголовок" value={getField('eyebrow')} onChange={v => setField('eyebrow', v)} />
        <LangTabs label="Заголовок" value={getField('heroTitle')} onChange={v => setField('heroTitle', v)} />
        <LangTabs label="Описание" value={getField('heroDesc')} onChange={v => setField('heroDesc', v)} multiline rows={3} />
        
        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Вступление</h3>
        <LangTabs label="Вступительный текст" value={getField('intro')} onChange={v => setField('intro', v)} multiline rows={4} />
        <LangTabs label="Заголовок задач" value={getField('tasksLabel')} onChange={v => setField('tasksLabel', v)} />

        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Партнёрство</h3>
        <LangTabs label="Лейбл партнерства" value={getField('partnershipLabel')} onChange={v => setField('partnershipLabel', v)} />
        <LangTabs label="Заголовок" value={getField('partnershipTitle')} onChange={v => setField('partnershipTitle', v)} />
        <LangTabs label="Текст" value={getField('partnershipText')} onChange={v => setField('partnershipText', v)} multiline rows={3} />

        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Блок CTA (Стать участником)</h3>
        <LangTabs label="Заголовок CTA" value={getField('ctaTitle')} onChange={v => setField('ctaTitle', v)} />
        <LangTabs label="Текст CTA" value={getField('ctaText')} onChange={v => setField('ctaText', v)} multiline rows={2} />
        <LangTabs label="Кнопка" value={getField('ctaBtn')} onChange={v => setField('ctaBtn', v)} />
        
        <div className="adm-field" style={{ marginTop: 15 }}>
          <label className="adm-field-label">Email для связи</label>
          <input 
            type="email" 
            className="adm-input" 
            value={form.ru?.ctaEmail || ''} 
            onChange={handleCtaEmailChange} 
          />
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
