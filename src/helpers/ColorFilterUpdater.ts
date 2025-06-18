import type { Mirror } from '@/types/Mirror';
import type { StyleUpdater } from './StyleUpdater';

export type ColorFilter = 'brightness' | 'contrast' | 'saturate' | 'sepia' | 'hue-rotate';

export type ColorFilterUnit = '%' | 'deg';

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
    let { filter } = element.style;
    if (!filter.includes(this.name)) {
      element.style.setProperty('filter', `${filter} ${this.name}(${value}${this.unit})`);
      return;
    }
    filter = filter.replace(new RegExp(`${this.name}\\(-?\\d+${this.unit}?\\)`), `${this.name}(${value}${this.unit})`);
    element.style.setProperty('filter', filter);
  }
}

export const brightnessUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS.brightness, '%'));

export const contrastUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS.contrast, '%'));

export const saturateUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS.saturate, '%'));

export const sepiaUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS.sepia, '%'));

export const hueRotateUpdater = Object.freeze(new ColorFilterUpdater(COLOR_FILTERS['hue-rotate'], 'deg'));
