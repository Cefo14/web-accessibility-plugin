import { useCallback, useContext, useMemo } from 'react';

import { hasOwnProperty } from '@/helpers/hasOwnProperty';
import { InvalidPropError } from '@/errors/InvalidPropError';

import type { TranslationModel } from './translations/TranslationModel';
import { Translations, LanguageCodes } from './i18n';
import { I18nContext } from './I18nContext';
import { getSystemLanguage } from './getSystemLanguage';

export const useI18n = () => {
  const { language, setLanguage } = useContext(I18nContext);

  const translations = useMemo(() => Translations[language], [language]);

  const t = useCallback((key: keyof TranslationModel) => {
    if (!hasOwnProperty(translations, key)) throw new InvalidPropError(`Translation "${key}" not found`);
    return translations[key];
  }, [translations]);

  const changeLanguage = useCallback((lang: string) => {
    if (!hasOwnProperty(LanguageCodes, lang)) throw new InvalidPropError(`Language "${lang}" is not supported`);
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
