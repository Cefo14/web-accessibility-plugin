import { useCallback, useState } from 'react';

import { fontWeightAdjuster, type FontWeight, FONT_WEIGHT } from '@/helpers/FontWeightAdjuster';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';

export const useAdjustFontWeight = () => {
  const [selected, setSelected] = useState<FontWeight>(fontWeightAdjuster.default);

  const update = useCallback((elements: HTMLElement[], value: string) => {
    if (!hasOwnProperty(FONT_WEIGHT, value)) throw new Error('Invalid font weight value');

    elements.forEach((element) => {
      fontWeightAdjuster.update(element, value);
    });
    setSelected(value);
  }, []);

  const reset = useCallback(() => {
    setSelected(fontWeightAdjuster.default);
  }, []);

  return {
    update,
    reset,
    selected,
  };
};
