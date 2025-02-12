import { useCallback, useContext, useMemo } from 'react';

import type { TranslationModel } from './translations/TranslationModel';
import { Translations, LanguageCodes } from './i18n';
import { I18nContext } from './I18nContext';
import { getSystemLanguage } from './getSystemLanguage';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';

export const useI18n = () => {
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
