export type ColorFilterUnit = '%' | 'deg';

export class ColorFilterStringBuilder {
  buildFilter(name: string, value: number, unit: ColorFilterUnit): string {
    return `${name}(${value}${unit})`;
  }

  updateFilterString(currentFilter: string, name: string, value: number, unit: ColorFilterUnit): string {
    const newFilter = this.buildFilter(name, value, unit);
    
    if (!currentFilter.includes(name)) {
      return `${currentFilter} ${newFilter}`.trim();
    }

    const pattern = new RegExp(`${name}\\(-?\\d+${unit}?\\)`);
    return currentFilter.replace(pattern, newFilter);
  }
}

export const colorFilterStringBuilder = Object.freeze(new ColorFilterStringBuilder());
