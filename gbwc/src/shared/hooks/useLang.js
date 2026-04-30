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

  const resolveCMS = (val) => {
    if (!val) return ''
    if (typeof val === 'string') return val
    
    // Handle array of strings or objects
    if (Array.isArray(val)) {
      if (val.length === 0) return ''
      const first = val[0]
      if (typeof first === 'string') {
        // Character-splitting bug prevention: 
        // If it's a list where every item is a single character, it's almost certainly a string treated as array
        if (val.length > 2 && val.every(item => typeof item === 'string' && item.length === 1)) {
          return val.join('')
        }
        return val.join(', ')
      }
      return resolveCMS(first)
    }
    
    if (typeof val === 'object') {
      // 1. Prioritize current language
      if (val[lang] !== undefined) return resolveCMS(val[lang])
      // 2. Fallbacks for other languages
      if (val.ru !== undefined) return resolveCMS(val.ru)
      if (val.en !== undefined) return resolveCMS(val.en)
      if (val.kk !== undefined) return resolveCMS(val.kk)
      // 3. Nested text/value properties
      if (val.text !== undefined) return resolveCMS(val.text)
      if (val.value !== undefined) return resolveCMS(val.value)

      // 4. Return first string value found
      const values = Object.values(val).filter(v => typeof v === 'string')
      if (values.length > 0) return values[0]
      
      return ''
    }
    return String(val)
  }

  const resolveWithFallback = (val, fb) => {
    const res = resolveCMS(val);
    if (res && res !== 'undefined' && res !== 'null' && res.trim() !== '') return res;
    return resolveCMS(fb);
  }

  return { lang, t, resolveCMS, resolveWithFallback, switchLang }
}
