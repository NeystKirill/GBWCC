import { Link } from 'react-router-dom'
import './Footer.css'
import { useLang } from '../../shared/hooks/useLang'

export default function Footer() {
  const { lang, t } = useLang()
  const f = t.footer

  const navLinks = [
    { to: `/${lang}/`, label: { ru:'Главная', en:'Home', kk:'Басты' }[lang] || 'Home' },
    { to: `/${lang}/about`, label: { ru:'О нас', en:'About', kk:'Біз туралы' }[lang] || 'About' },
    { to: `/${lang}/founders`, label: { ru:'Руководство', en:'Founders', kk:'Басшылық' }[lang] || 'Founders' },
    { to: `/${lang}/events`, label: { ru:'Пленарные заседания', en:'Events', kk:'Іс-шаралар' }[lang] || 'Events' },
    { to: `/${lang}/initiatives`, label: { ru:'Инициативы', en:'Initiatives', kk:'Бастамалар' }[lang] || 'Initiatives' },
    { to: `/${lang}/partners`, label: { ru:'Участники', en:'Participants', kk:'Қатысушылар' }[lang] || 'Participants' },
    { to: `/${lang}/media`, label: { ru:'СМИ', en:'Media', kk:'БАҚ' }[lang] || 'Media' },
    { to: `/${lang}/contacts`, label: { ru:'Контакты', en:'Contacts', kk:'Байланыс' }[lang] || 'Contacts' },
  ]

  const gbwcLinks = [
    { to: `/${lang}/about`, label: { ru:'О нас', en:'About', kk:'Біз туралы' }[lang] || 'About' },
    { to: `/${lang}/founders`, label: { ru:'Руководство', en:'Founders', kk:'Басшылық' }[lang] || 'Founders' },
    { to: `/${lang}/partners`, label: { ru:'Участники', en:'Participants', kk:'Қатысушылар' }[lang] || 'Participants' },
    { to: `/${lang}/contacts`, label: t.nav.cta },
  ]

  const navLabel   = { ru:'НАВИГАЦИЯ',   en:'NAVIGATION',   kk:'НАВИГАЦИЯ' }[lang] || 'NAVIGATION'
  const ctLabel    = { ru:'КОНТАКТЫ',    en:'CONTACTS',     kk:'БАЙЛАНЫС'  }[lang] || 'CONTACTS'
  const gbwcLabel  = 'GBWC'
  const copyText   = { ru:`© ${new Date().getFullYear()} Global Businesswomen Council. Все права защищены.`, en:`© ${new Date().getFullYear()} Global Businesswomen Council. All rights reserved.`, kk:`© ${new Date().getFullYear()} Global Businesswomen Council. Барлық құқықтар қорғалған.` }[lang]

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo-wrap">
              <img src="/img/own/logo.svg" alt="GBWC" className="footer-logo-img" />
              <span className="footer-logo-name">GLOBAL<br/>BUSINESSWOMEN<br/>COUNCIL</span>
            </div>
            <p className="footer-desc">{f.desc}</p>
            <div className="footer-socials">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social" aria-label="YouTube">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <p className="footer-col-title">{navLabel}</p>
            <ul className="footer-links">
              {navLinks.map(l => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </div>

          {/* Contacts */}
          <div className="footer-col">
            <p className="footer-col-title">{ctLabel}</p>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="footer-contact-icon"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
              <span className="footer-contact-val">16 Dostyk St., Talan Towers, Astana</span>
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="footer-contact-icon"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.8 11.3 19.79 19.79 0 01.72 2.73 2 2 0 012.69.52h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.16a16 16 0 006 6l1-1.02a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <a href="tel:+77027314400" className="footer-contact-val">+7 702 731 4400</a>
            </div>
            <div className="footer-contact-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" className="footer-contact-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:info@gbwc.network" className="footer-contact-val">info@gbwc.network</a>
            </div>
          </div>

          {/* GBWC */}
          <div className="footer-col">
            <p className="footer-col-title">{gbwcLabel}</p>
            <ul className="footer-links">
              {gbwcLinks.map(l => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </div>

        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span className="footer-copy">{copyText}</span>
          <div className="footer-langs">
            {['ru','en','kk'].map(l => (
              <Link key={l} to={`/${l}/`} className={`footer-lang${lang===l?' footer-lang--active':''}`}>
                <span className="footer-lang-flag">{l==='ru'?'RU':l==='en'?'GB':l==='kk'?'KZ':''}</span>
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
