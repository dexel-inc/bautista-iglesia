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
    <li>
      <a href="#" onClick={handleChangeLanguage}>
        {langLabel + ' - ' + t(`common.languages.${langLabel}`)}
      </a>
    </li>
  );
};

export default LanguageSwitcher;