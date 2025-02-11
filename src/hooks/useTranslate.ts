import { useCallback, useContext, useMemo } from 'react';
import {
  type TranslationModel,
  Translations,
  LanguageCodes,
  I18nContext,
  getSystemLanguage,
} from '@/i18n';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';

export const useTranslate = () => {
  const { language, setLanguage } = useContext(I18nContext);

  const translations = useMemo(() => Translations[language], [language]);

  const t = useCallback((key: keyof TranslationModel) => {
    if (!hasOwnProperty(translations, key)) throw new Error(`Translation for ${key} not found in ${key}`);
    return translations[key];
  }, [translations]);

  const changeLanguage = useCallback((lang: string) => {
    if (!hasOwnProperty(LanguageCodes, lang)) throw new Error(`Language ${lang} not supported`);
    setLanguage(lang);
  }, [setLanguage]);

  const resetLanguage = useCallback(() => {
    setLanguage(getSystemLanguage());
  }, [setLanguage]);

  return {
    t,
    language,
    changeLanguage,
    resetLanguage,
  };
};
