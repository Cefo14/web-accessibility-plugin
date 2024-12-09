import { type Translations } from './Translations';

import { en } from './en';
import { zh } from './zh';
import { hi } from './hi';
import { es } from './es';
import { fr } from './fr';

export const translations = {
  en,
  zh,
  hi,
  es,
  fr,
} satisfies Record<PropertyKey, Translations>;

export type I18 = typeof translations;

export type Languages = keyof I18;
