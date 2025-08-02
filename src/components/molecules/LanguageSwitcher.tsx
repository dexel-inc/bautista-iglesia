import { useTranslation } from 'react-i18next';

const LANGUAGE_KEY = 'app_language';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  const otherLang = currentLang === 'en' ? 'es' : 'en';
  const langLabel = otherLang.toUpperCase();

  const handleChangeLanguage = () => {
    i18n.changeLanguage(otherLang).then(() => {
      localStorage.setItem(LANGUAGE_KEY, otherLang);
      document.title = 'IBF - ' + t('siteTitle', { lng: otherLang });
    });
  };

  return (
    <li>
      <a 
        href="#" 
        onClick={handleChangeLanguage}
        aria-label={t(`accessibility.buttons.language_switch`, { language: t(`common.languages.${langLabel}`) })}
      >
        {langLabel + ' - ' + t(`common.languages.${langLabel}`)}
      </a>
    </li>
  );
};

export default LanguageSwitcher;