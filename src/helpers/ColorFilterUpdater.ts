import type { Mirror } from '@/types/Mirror';
import type { StyleUpdater } from './StyleUpdater';
import { colorFilterStringBuilder, type ColorFilterUnit } from './ColorFilterStringBuilder';

export type ColorFilter = 'brightness' | 'contrast' | 'saturate' | 'sepia' | 'hue-rotate';

export type { ColorFilterUnit };

export const COLOR_FILTERS: Mirror<ColorFilter> = {
  brightness: 'brightness',
  contrast: 'contrast',
  saturate: 'saturate',
  sepia: 'sepia',
  'hue-rotate': 'hue-rotate',
} as const;

export class ColorFilterUpdater implements StyleUpdater<number> {
  private readonly name: ColorFilter;

  private readonly unit: ColorFilterUnit;

  constructor(name: ColorFilter, unit: ColorFilterUnit = '%') {
    this.name = name;
    this.unit = unit;
  }

  public update(element: HTMLElement, value: number): void {
    const currentFilter = element.style.filter;
    const newFilter = colorFilterStringBuilder.updateFilterString(
      currentFilter,
      this.name,
      value,
      this.unit,
    );
    element.style.setProperty('filter', newFilter);
  }
}

export const brightnessUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS.brightness, '%'));

export const contrastUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS.contrast, '%'));

export const saturateUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS.saturate, '%'));

export const sepiaUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS.sepia, '%'));

export const hueRotateUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS['hue-rotate'], 'deg'));
