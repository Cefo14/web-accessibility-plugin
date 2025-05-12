import type { Mirror } from '@/types/Mirror';

import type { TranslationModel } from './translations/TranslationModel';
import { en } from './translations/en';
import { es } from './translations/es';
import { zh } from './translations/zh';

export type LanguageCode = 'en' | 'es' | 'zh';

export const LanguageCodes: Mirror<LanguageCode> = {
  en: 'en',
  es: 'es',
  zh: 'zh',
} as const;

export type Translation = Record<LanguageCode, TranslationModel>;

export const Translations: Translation = {
  [LanguageCodes.en]: en,
  [LanguageCodes.es]: es,
  [LanguageCodes.zh]: zh,
} as const;

export const LanguageCodeTranslations: Record<LanguageCode, string> = {
  en: 'English',
  es: 'Español',
  zh: '简体中文',
};
