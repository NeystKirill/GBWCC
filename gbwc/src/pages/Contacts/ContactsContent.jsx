import { useEffect } from 'react'
import { useLang }   from '../../shared/hooks/useLang'
import { CONTACTS_CONTENT } from '../../entities/contacts/contacts.data'
import ContactsInfo  from '../../widgets/sections/contacts/ContactsInfo/ContactsInfo'
import ContactsForm  from '../../widgets/sections/contacts/ContactsForm/ContactsForm'
import '../../widgets/sections/contacts/contacts.css'

export default function ContactsContent({ data }) {
  const { t, lang, resolveWithFallback } = useLang()

  const fb = CONTACTS_CONTENT[lang] || CONTACTS_CONTENT.ru
  
  useEffect(() => { document.title = t.pages?.contacts || 'Contacts' }, [t])

  return (
    <section className="ct3-body">
      <div className="ct3-body-inner">
        <ContactsInfo d={{
          ...fb,
          infoTitle: resolveWithFallback(data?.infoTitle, fb.infoTitle),
          infoDesc: resolveWithFallback(data?.infoDesc, fb.infoDesc),
          addressLabel: resolveWithFallback(data?.addressLabel, fb.addressLabel),
          addressVal: resolveWithFallback(data?.addressVal, fb.addressVal),
          persons: (data?.persons && data?.persons.length > 0) ? data.persons : fb.persons,
          phoneLabel: resolveWithFallback(data?.phoneLabel, fb.phoneLabel),
          emailLabel: resolveWithFallback(data?.emailLabel, fb.emailLabel),
          socialLabel: resolveWithFallback(data?.socialLabel, fb.socialLabel),
        }} />
        <ContactsForm d={{
          ...fb,
          formTitle: resolveWithFallback(data?.formTitle, fb.formTitle),
          success: resolveWithFallback(data?.success, fb.success),
          error: resolveWithFallback(data?.error, fb.error),
          sending: resolveWithFallback(data?.sending, fb.sending),
          send: resolveWithFallback(data?.send, fb.send),
          fields: {
            name: resolveWithFallback(data?.fields?.name, fb.fields.name),
            namePh: resolveWithFallback(data?.fields?.namePh, fb.fields.namePh),
            company: resolveWithFallback(data?.fields?.company, fb.fields.company),
            companyPh: resolveWithFallback(data?.fields?.companyPh, fb.fields.companyPh),
            email: resolveWithFallback(data?.fields?.email, fb.fields.email),
            emailPh: resolveWithFallback(data?.fields?.emailPh, fb.fields.emailPh),
            subject: resolveWithFallback(data?.fields?.subject, fb.fields.subject),
            subjectPh: resolveWithFallback(data?.fields?.subjectPh, fb.fields.subjectPh),
            message: resolveWithFallback(data?.fields?.message, fb.fields.message),
            messagePh: resolveWithFallback(data?.fields?.messagePh, fb.fields.messagePh),
          }
        }} />
      </div>
    </section>
  )
}
