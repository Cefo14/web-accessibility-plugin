import { useCallback, useState } from 'react';
import { translations, type Languages, type TranslationsKeys } from '@/i18';

const getLanguage = (): Languages => {
  const { language } = navigator;
  const [lang] = language.split('-');
  if (!lang) return 'en';
  if (lang in translations) return lang as Languages;
  return 'en';
};

export const useTranslate = () => {
  const [language, setLanguage] = useState(getLanguage());

  const t = useCallback((key: TranslationsKeys) => {
    if (!translations[language]) return translations.en[key];
    const locale = translations[language];
    if (!locale[key]) throw new Error(`Translation for ${key} not found in ${locale}`);
    return locale[key];
  }, [language]);

  const changeLanguage = useCallback((lang: Languages) => {
    setLanguage(lang);
  }, []);

  return {
    t,
    language,
    changeLanguage,
  };
};
