import { hasOwnProperty } from '@/helpers/hasOwnProperty';
import { LanguageCodes, type LanguageCode } from './i18n';

const DEFAULT_LANGUAGE = LanguageCodes.es;

export const getSystemLanguage = (): LanguageCode => {
  const { language } = navigator;
  const [lang] = language.split('-');
  if (!lang) return DEFAULT_LANGUAGE;
  if (hasOwnProperty(LanguageCodes, lang)) return LanguageCodes[lang];
  return DEFAULT_LANGUAGE;
};
