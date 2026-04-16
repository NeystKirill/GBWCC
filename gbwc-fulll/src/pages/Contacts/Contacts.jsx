import { useEffect } from 'react'
import PageLayout    from '../../shared/ui/PageLayout'
import { useLang }   from '../../shared/hooks/useLang'
import { CONTACTS_CONTENT } from '../../entities/contacts/contacts.data'
import PageHero      from '../../shared/layout/PageHero/PageHero'
import ContactsInfo  from '../../widgets/sections/contacts/ContactsInfo/ContactsInfo'
import ContactsForm  from '../../widgets/sections/contacts/ContactsForm/ContactsForm'
import '../../widgets/sections/contacts/contacts.css'

export default function Contacts() {
  const { t, lang } = useLang()
  const d = CONTACTS_CONTENT[lang] || CONTACTS_CONTENT.ru
  useEffect(() => { document.title = t.pages?.contacts || 'Contacts' }, [t])

  const stats = [
    { value: '3',          label: lang==='ru'?'Языка':lang==='en'?'Languages':'Тіл' },
    { value: '13+',        label: lang==='ru'?'Стран':lang==='en'?'Countries':'Ел' },
    { value: 'Астана',     label: lang==='ru'?'Штаб-квартира':lang==='en'?'Headquarters':'Штаб-пәтер' },
  ]

  return (
    <PageLayout>
      <PageHero
        label={d.eyebrow}
        title={d.titlePlain}
        titleEmphasis={d.titleItalic}
        desc={d.subtitle}
        stats={stats}
      />
      <section className="ct3-body">
        <div className="ct3-body-inner">
          <ContactsInfo d={d} />
          <ContactsForm d={d} />
        </div>
      </section>
    </PageLayout>
  )
}
