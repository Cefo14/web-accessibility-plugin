import { createContext } from 'react';
import { LanguageCodes, type LanguageCode } from './i18n';

type I18nContextProps = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
};

const DEFAULT_CONTEXT = {
  language: LanguageCodes.en,
  setLanguage: () => {},
};

export const I18nContext = createContext<I18nContextProps>(DEFAULT_CONTEXT);
