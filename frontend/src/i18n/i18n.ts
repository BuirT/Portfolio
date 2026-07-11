import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enJSON from './locales/en.json'
import viJSON from './locales/vi.json'
import koJSON from './locales/ko.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enJSON },
      vi: { translation: viJSON },
      ko: { translation: koJSON }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  })

export default i18n
