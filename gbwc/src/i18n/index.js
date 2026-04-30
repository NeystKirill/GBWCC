import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { translations } from './translations'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: translations.ru },
      en: { translation: translations.en },
      kk: { translation: translations.kk },
    },
    lng: localStorage.getItem('gbwc_lang') || 'ru',
    fallbackLng: 'ru',
    interpolation: { escapeValue: false },
  })

export default i18n
