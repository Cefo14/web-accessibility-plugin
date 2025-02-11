import type { Mirror } from '@/types/Mirror';

import type { TranslationModel } from './translations/TranslationModel';
import { en } from './translations/en';
import { es } from './translations/es';

export type LanguageCode = 'en' | 'es';

export const LanguageCodes: Mirror<LanguageCode> = {
  en: 'en',
  es: 'es',
} as const;

export type Translation = Record<LanguageCode, TranslationModel>;

export const Translations: Translation = {
  [LanguageCodes.en]: en,
  [LanguageCodes.es]: es,
} as const;

export const LanguageCodeTranslations: Record<LanguageCode, string> = {
  en: 'English',
  es: 'Español',
};
