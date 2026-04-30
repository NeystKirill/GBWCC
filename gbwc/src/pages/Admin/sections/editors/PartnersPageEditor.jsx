import { useState } from 'react'
import LangTabs from '../../components/LangTabs'

export default function PartnersPageEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    ru: { eyebrow: '', heroTitle: '', heroDesc: '', filterAll: '', filterIntl: '', filterCorp: '', filterNatl: '', filterInst: '', intlTitle: '', intlDesc: '', corpTitle: '', corpDesc: '', natlTitle: '', natlDesc: '', instTitle: '', instDesc: '', coopLabel: '', coopTitle: '', ctaTitle: '', ctaText: '', ctaEmail: '', ctaBtn: '' },
    en: { eyebrow: '', heroTitle: '', heroDesc: '', filterAll: '', filterIntl: '', filterCorp: '', filterNatl: '', filterInst: '', intlTitle: '', intlDesc: '', corpTitle: '', corpDesc: '', natlTitle: '', natlDesc: '', instTitle: '', instDesc: '', coopLabel: '', coopTitle: '', ctaTitle: '', ctaText: '', ctaEmail: '', ctaBtn: '' },
    kk: { eyebrow: '', heroTitle: '', heroDesc: '', filterAll: '', filterIntl: '', filterCorp: '', filterNatl: '', filterInst: '', intlTitle: '', intlDesc: '', corpTitle: '', corpDesc: '', natlTitle: '', natlDesc: '', instTitle: '', instDesc: '', coopLabel: '', coopTitle: '', ctaTitle: '', ctaText: '', ctaEmail: '', ctaBtn: '' },
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
          Текст на странице «Партнёры» (Partners). Сами партнёры редактируются в разделе «Партнёры».
        </div>

        <h3 className="adm-form-subtitle">Блок Hero</h3>
        <LangTabs label="Надзаголовок" value={getField('eyebrow')} onChange={v => setField('eyebrow', v)} />
        <LangTabs label="Заголовок" value={getField('heroTitle')} onChange={v => setField('heroTitle', v)} />
        <LangTabs label="Описание" value={getField('heroDesc')} onChange={v => setField('heroDesc', v)} multiline rows={3} />

        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Фильтры (вкладки)</h3>
        <LangTabs label="Все" value={getField('filterAll')} onChange={v => setField('filterAll', v)} />
        <LangTabs label="Международные" value={getField('filterIntl')} onChange={v => setField('filterIntl', v)} />
        <LangTabs label="Корпоративные" value={getField('filterCorp')} onChange={v => setField('filterCorp', v)} />
        <LangTabs label="Национальные" value={getField('filterNatl')} onChange={v => setField('filterNatl', v)} />
        <LangTabs label="Институциональные" value={getField('filterInst')} onChange={v => setField('filterInst', v)} />

        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Описания категорий</h3>
        <LangTabs label="Международные (заголовок)" value={getField('intlTitle')} onChange={v => setField('intlTitle', v)} />
        <LangTabs label="Международные (текст)" value={getField('intlDesc')} onChange={v => setField('intlDesc', v)} multiline rows={2} />
        <LangTabs label="Корпоративные (заголовок)" value={getField('corpTitle')} onChange={v => setField('corpTitle', v)} />
        <LangTabs label="Корпоративные (текст)" value={getField('corpDesc')} onChange={v => setField('corpDesc', v)} multiline rows={2} />
        <LangTabs label="Национальные (заголовок)" value={getField('natlTitle')} onChange={v => setField('natlTitle', v)} />
        <LangTabs label="Национальные (текст)" value={getField('natlDesc')} onChange={v => setField('natlDesc', v)} multiline rows={2} />
        <LangTabs label="Институциональные (заголовок)" value={getField('instTitle')} onChange={v => setField('instTitle', v)} />
        <LangTabs label="Институциональные (текст)" value={getField('instDesc')} onChange={v => setField('instDesc', v)} multiline rows={2} />

        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>Сотрудничество (Форматы взаимодействия)</h3>
        <LangTabs label="Лейбл" value={getField('coopLabel')} onChange={v => setField('coopLabel', v)} />
        <LangTabs label="Заголовок" value={getField('coopTitle')} onChange={v => setField('coopTitle', v)} />
        {/* coopItems editing could be complex, omitting array inputs for simplicity or using JSON format */}

        <h3 className="adm-form-subtitle" style={{ marginTop: 30 }}>CTA (Стать партнером)</h3>
        <LangTabs label="Заголовок" value={getField('ctaTitle')} onChange={v => setField('ctaTitle', v)} />
        <LangTabs label="Текст" value={getField('ctaText')} onChange={v => setField('ctaText', v)} multiline rows={2} />
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
