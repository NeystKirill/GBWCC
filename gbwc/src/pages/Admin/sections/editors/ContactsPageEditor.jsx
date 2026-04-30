import { useState } from 'react'
import LangTabs from '../../components/LangTabs'

export default function ContactsPageEditor({ content, onSave }) {
  const [form, setForm] = useState(content || {
    eyebrow: {}, titlePlain: {}, titleItalic: {}, subtitle: {},
    infoTitle: {}, infoDesc: {},
    addressLabel: {}, addressVal: {},
    phoneLabel: {}, phoneVal: {},
    emailLabel: {}, emailVal: {},
    phone2Label: {}, phone2Val: {},
    email2Label: {}, email2Val: {},
    name2: {},
    infoEmail: {},
    socialLabel: {},
    formTitle: {},
    fieldName: {}, fieldNamePh: {},
    fieldCompany: {}, fieldCompanyPh: {},
    fieldEmail: {}, fieldEmailPh: {},
    fieldSubject: {}, fieldSubjectPh: {},
    fieldMessage: {}, fieldMessagePh: {},
    send: {}, sending: {}, success: {}, error: {},
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
          Полное редактирование страницы «Контакты и сотрудники».
        </div>

        <h3 style={{ margin: '0 0 16px', fontSize: 15, color: 'var(--adm-navy)', borderBottom: '2px solid var(--adm-border)', paddingBottom: 8 }}>🏠 Hero секция</h3>
        <LangTabs label="Eyebrow" value={form.eyebrow || {}} onChange={v => set('eyebrow', v)} />
        <LangTabs label="Заголовок (основной)" value={form.titlePlain || {}} onChange={v => set('titlePlain', v)} />
        <LangTabs label="Заголовок (курсив)" value={form.titleItalic || {}} onChange={v => set('titleItalic', v)} />
        <LangTabs label="Подзаголовок" value={form.subtitle || {}} onChange={v => set('subtitle', v)} multiline rows={2} />

        <h3 style={{ margin: '24px 0 16px', fontSize: 15, color: 'var(--adm-navy)', borderBottom: '2px solid var(--adm-border)', paddingBottom: 8 }}>📋 Контактная информация</h3>
        <LangTabs label="Заголовок блока" value={form.infoTitle || {}} onChange={v => set('infoTitle', v)} />
        <LangTabs label="Описание блока" value={form.infoDesc || {}} onChange={v => set('infoDesc', v)} multiline rows={2} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <LangTabs label="Лейбл: Адрес" value={form.addressLabel || {}} onChange={v => set('addressLabel', v)} />
          <LangTabs label="Адрес" value={form.addressVal || {}} onChange={v => set('addressVal', v)} />
        </div>

        <h4 style={{ margin: '16px 0 8px', fontSize: 13, color: 'var(--adm-muted)' }}>Контакт 1</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <LangTabs label="Лейбл: Телефон" value={form.phoneLabel || {}} onChange={v => set('phoneLabel', v)} />
          <LangTabs label="Телефон" value={form.phoneVal || {}} onChange={v => set('phoneVal', v)} />
          <LangTabs label="Лейбл: Email" value={form.emailLabel || {}} onChange={v => set('emailLabel', v)} />
          <LangTabs label="Email" value={form.emailVal || {}} onChange={v => set('emailVal', v)} />
        </div>

        <h4 style={{ margin: '16px 0 8px', fontSize: 13, color: 'var(--adm-muted)' }}>Контакт 2</h4>
        <LangTabs label="Имя" value={form.name2 || {}} onChange={v => set('name2', v)} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <LangTabs label="Лейбл: Телефон 2" value={form.phone2Label || {}} onChange={v => set('phone2Label', v)} />
          <LangTabs label="Телефон 2" value={form.phone2Val || {}} onChange={v => set('phone2Val', v)} />
          <LangTabs label="Лейбл: Email 2" value={form.email2Label || {}} onChange={v => set('email2Label', v)} />
          <LangTabs label="Email 2" value={form.email2Val || {}} onChange={v => set('email2Val', v)} />
        </div>

        <LangTabs label="Общий Email (info@)" value={form.infoEmail || {}} onChange={v => set('infoEmail', v)} />
        <LangTabs label="Лейбл: Соцсети" value={form.socialLabel || {}} onChange={v => set('socialLabel', v)} />

        <h3 style={{ margin: '24px 0 16px', fontSize: 15, color: 'var(--adm-navy)', borderBottom: '2px solid var(--adm-border)', paddingBottom: 8 }}>📝 Форма обратной связи</h3>
        <LangTabs label="Заголовок формы" value={form.formTitle || {}} onChange={v => set('formTitle', v)} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <LangTabs label="Поле: Имя (лейбл)" value={form.fieldName || {}} onChange={v => set('fieldName', v)} />
          <LangTabs label="Поле: Имя (placeholder)" value={form.fieldNamePh || {}} onChange={v => set('fieldNamePh', v)} />
          <LangTabs label="Поле: Организация (лейбл)" value={form.fieldCompany || {}} onChange={v => set('fieldCompany', v)} />
          <LangTabs label="Поле: Организация (placeholder)" value={form.fieldCompanyPh || {}} onChange={v => set('fieldCompanyPh', v)} />
          <LangTabs label="Поле: Email (лейбл)" value={form.fieldEmail || {}} onChange={v => set('fieldEmail', v)} />
          <LangTabs label="Поле: Email (placeholder)" value={form.fieldEmailPh || {}} onChange={v => set('fieldEmailPh', v)} />
          <LangTabs label="Поле: Тема (лейбл)" value={form.fieldSubject || {}} onChange={v => set('fieldSubject', v)} />
          <LangTabs label="Поле: Тема (placeholder)" value={form.fieldSubjectPh || {}} onChange={v => set('fieldSubjectPh', v)} />
          <LangTabs label="Поле: Сообщение (лейбл)" value={form.fieldMessage || {}} onChange={v => set('fieldMessage', v)} />
          <LangTabs label="Поле: Сообщение (placeholder)" value={form.fieldMessagePh || {}} onChange={v => set('fieldMessagePh', v)} />
        </div>

        <LangTabs label="Кнопка 'Отправить'" value={form.send || {}} onChange={v => set('send', v)} />
        <LangTabs label="Текст 'Отправка…'" value={form.sending || {}} onChange={v => set('sending', v)} />
        <LangTabs label="Сообщение об успехе" value={form.success || {}} onChange={v => set('success', v)} />
        <LangTabs label="Сообщение об ошибке" value={form.error || {}} onChange={v => set('error', v)} />
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
