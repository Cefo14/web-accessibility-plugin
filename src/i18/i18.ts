import { en } from './en';
import { es } from './es';

export const translations = {
  en,
  es,
} as const;

export type Translation = typeof translations;

export type LanguageCode = keyof Translation;
