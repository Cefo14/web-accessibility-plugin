import { type LanguagesKeys } from "./Languages";
import { type Translations } from "./Translations";

import { en } from './en';
import { zh } from './zh';
import { hi } from './hi';
import { es } from './es';
import { fr } from './fr';

export type i18 = {
  [key in LanguagesKeys]: Translations;
};

export const translations: i18 = {
  en,
  zh,
  hi,
  es,
  fr
};