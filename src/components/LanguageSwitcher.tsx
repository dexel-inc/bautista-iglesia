import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language;

  const otherLang = currentLang === 'en' ? 'es' : 'en';
  const langLabel = otherLang.toUpperCase();

  const handleChangeLanguage = () => {
    i18n.changeLanguage(otherLang).then(() => {
      document.title = 'IBF - ' + t('siteTitle', { lng: otherLang });
    });
  };

  return (
    <button className="btn" onClick={handleChangeLanguage}>
      {langLabel}
    </button>
  );
};

export default LanguageSwitcher;