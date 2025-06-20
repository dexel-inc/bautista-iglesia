import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en.json';
import es from '../locales/es.json';

const LANGUAGE_KEY = 'app_language';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es }
    },
    lng: localStorage.getItem(LANGUAGE_KEY) || 'es',
    fallbackLng: 'es',
    interpolation: { escapeValue: false }
  });

export default i18n;