import { useNavigate, useLocation } from 'react-router-dom'
import { translations, LANGS } from '../../i18n/translations'

export function useLang() {
  const navigate = useNavigate()
  const location = useLocation()

  // Extract lang from path: /ru/about → 'ru'
  const pathParts = location.pathname.split('/').filter(Boolean)
  const lang = LANGS.includes(pathParts[0]) ? pathParts[0] : 'ru'
  const t = translations[lang]

  const switchLang = (newLang) => {
    const rest = pathParts.slice(1).join('/')
    const newPath = `/${newLang}${rest ? '/' + rest : ''}`
    navigate(newPath)
  }

  return { lang, t, switchLang }
}
