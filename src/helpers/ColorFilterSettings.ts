import type { ColorFilter } from './ColorFilterUpdater';
import type { Mirror } from '@/types/Mirror';

export type ColorFilterSettings = Record<ColorFilter, number>;

const BASE: ColorFilterSettings = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  sepia: 0,
  'hue-rotate': 0,
};

const RED: ColorFilterSettings = {
  ...BASE,
  sepia: 100,
  saturate: 500,
  'hue-rotate': -50,
};

const GREEN: ColorFilterSettings = {
  ...BASE,
  sepia: 100,
  saturate: 500,
  'hue-rotate': 50,
};

const BLUE: ColorFilterSettings = {
  ...BASE,
  sepia: 100,
  saturate: 500,
  'hue-rotate': 150,
};

const WARM: ColorFilterSettings = {
  ...BASE,
  brightness: 90,
  sepia: 50,
  saturate: 125,
};

const MONOCHROME: ColorFilterSettings = {
  ...BASE,
  saturate: 0,
};

export type ColorFilterSetting = 'base' | 'red' | 'green' | 'blue' | 'warm' | 'monochrome';

export const COLOR_FILTER_SETTING_NAMES: Mirror<ColorFilterSetting> = {
  base: 'base',
  red: 'red',
  green: 'green',
  blue: 'blue',
  warm: 'warm',
  monochrome: 'monochrome',
} as const;

export const COLOR_FILTER_SETTINGS: Record<ColorFilterSetting, ColorFilterSettings> = {
  base: BASE,
  red: RED,
  green: GREEN,
  blue: BLUE,
  warm: WARM,
  monochrome: MONOCHROME,
} as const;
