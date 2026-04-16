import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import { useLang } from '../../shared/hooks/useLang'
import { LANGS, LANG_NAMES } from '../../i18n/translations'

export default function Header() {
  const { lang, t, switchLang } = useLang()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setLangOpen(false)
  }, [location.pathname])

  const navLinks = [
    { key: 'home',        label: t.nav.home,        path: `/${lang}` },
    { key: 'about',       label: t.nav.about,       path: `/${lang}/about` },
    { key: 'founders',    label: t.nav.founders,    path: `/${lang}/founders` },
    { key: 'events',      label: t.nav.events,      path: `/${lang}/events` },
    { key: 'initiatives', label: t.nav.initiatives, path: `/${lang}/initiatives` },
    { key: 'partners',    label: t.nav.partners,    path: `/${lang}/partners` },
    { key: 'media',       label: t.nav.media,       path: `/${lang}/media` },
    { key: 'contacts',    label: t.nav.contacts,    path: `/${lang}/contacts` },
  ]

  const isActive = (path) => {
    if (path === `/${lang}`) return location.pathname === `/${lang}` || location.pathname === `/${lang}/`
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* ── Logo ── */}
      <nav className="logo-nav">
        <Link to={`/${lang}`} className="logo-circle" aria-label="GBWC">
          <img src="/img/own/logo.svg" alt="GBWC" />
        </Link>
      </nav>

      {/* ── Header row: nav pill + CTA pill + lang pill ── */}
      <div className="header-row">

        {/* 1. Nav links pill */}
        <nav className="nav-pill">
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.key}>
                <Link
                  to={link.path}
                  className={isActive(link.path) ? 'active' : ''}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Burger (mobile) */}
          <button
            className={`nav-burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>

          {/* Mobile dropdown */}
          <div className={`nav-mobile${menuOpen ? ' open' : ''}`}>
            <div className="nav-mobile-inner">
              {navLinks.map(link => (
                <Link key={link.key} to={link.path}>{link.label}</Link>
              ))}
              <div className="nav-mobile-divider" />
              <Link to={`/${lang}/contacts`}>{t.nav.cta}</Link>
              <div className="nav-mobile-divider" />
              {LANGS.filter(c => c !== lang).map(code => (
                <a key={code} href="#"
                  onClick={(e) => { e.preventDefault(); switchLang(code) }}>
                  <span className="mobile-lang-code">{code.toUpperCase()}</span>
                  {LANG_NAMES[code]}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* 2. CTA pill — separate, same height */}
        <Link to={`/${lang}/contacts`} className="cta-pill">
          {t.nav.cta}
        </Link>

        {/* 3. Lang pill — separate, same height */}
        <div className={`lang-pill${langOpen ? ' open' : ''}`} ref={langRef}>
          <button
            className="lang-pill-btn"
            onClick={(e) => { e.stopPropagation(); setLangOpen(v => !v) }}
          >
            <img src="/img/globe-solid.svg" alt="" className="globe-img" aria-hidden="true" />
            <span>{lang.toUpperCase()}</span>
            <span className="lang-arrow">▾</span>
          </button>
          <div className="lang-dropdown">
            {LANGS.map(code => (
              <a key={code} href="#"
                className={code === lang ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); switchLang(code); setLangOpen(false) }}
              >
                <span className="lang-code">{code.toUpperCase()}</span>
                {LANG_NAMES[code]}
              </a>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
