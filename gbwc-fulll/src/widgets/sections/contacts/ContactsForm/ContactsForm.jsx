import '../contacts.css'
import { useState } from 'react'
import InputField   from './components/InputField'
import MessageField from './components/MessageField'
import SubmitButton from './components/SubmitButton'
import { contact }  from '../../../../services/api'

export default function ContactsForm({ d }) {
  const [form, setForm]     = useState({ name:'', company:'', email:'', subject:'', message:'' })
  const [status, setStatus] = useState('idle')
  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault(); setStatus('loading')
    try {
      await contact.submit({ ...form, organization: form.company })
      setStatus('success')
      setForm({ name:'', company:'', email:'', subject:'', message:'' })
    } catch { setStatus('error') }
  }

  return (
    <div className="ct3-form-wrap">
      <h2 className="ct3-form-title">{d.formTitle}</h2>
      <form className="ct3-form" onSubmit={onSubmit} noValidate>
        <InputField   label={d.fields.name}    name="name"    placeholder={d.fields.namePh}    value={form.name}    onChange={onChange} required />
        <InputField   label={d.fields.company} name="company" placeholder={d.fields.companyPh} value={form.company} onChange={onChange} />
        <InputField   label={d.fields.email}   name="email"   type="email" placeholder={d.fields.emailPh} value={form.email} onChange={onChange} required />
        <InputField   label={d.fields.subject} name="subject" placeholder={d.fields.subjectPh} value={form.subject} onChange={onChange} required />
        <MessageField label={d.fields.message} name="message" placeholder={d.fields.messagePh} value={form.message} onChange={onChange} required />
        {status === 'success' && <p className="ct3-msg ct3-msg--ok">✓ {d.success}</p>}
        {status === 'error'   && <p className="ct3-msg ct3-msg--err">⚠ {d.error}</p>}
        <SubmitButton label={status === 'loading' ? d.sending : d.send} loading={status === 'loading'} />
      </form>
    </div>
  )
}
