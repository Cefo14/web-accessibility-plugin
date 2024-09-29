import { type Translations } from './Translations';

export type Languages = {
  en: Translations
  zh: Translations
  hi: Translations
  es: Translations
  fr: Translations
};

export type LanguagesKeys = keyof Languages;
