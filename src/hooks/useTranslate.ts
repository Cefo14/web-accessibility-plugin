import { useCallback, useState } from 'react';
import { translations, type LanguageCode, type TranslationModel } from '@/i18';

const DEFAULT_LANGUAGE = 'en';

const getLanguage = (): LanguageCode => {
  const { language } = navigator;
  const [lang] = language.split('-');
  if (!lang) return DEFAULT_LANGUAGE;
  if (lang in translations) return lang as LanguageCode;
  return DEFAULT_LANGUAGE;
};

export const useTranslate = () => {
  const [language, setLanguage] = useState(getLanguage());

  const t = useCallback((key: keyof TranslationModel) => {
    const locale = translations[language];
    if (!locale[key]) throw new Error(`Translation for ${key} not found in ${locale}`);
    return locale[key];
  }, [language]);

  const changeLanguage = useCallback((lang: LanguageCode) => {
    if (!(lang in translations)) throw new Error(`Language ${lang} not supported`);
    setLanguage(lang);
  }, []);

  return {
    t,
    language,
    changeLanguage,
  };
};
