import { useCallback, useState } from 'react';

import { FontWeightAdjuster, type FontWeight, FONT_WEIGHT } from '@/helpers/FontWeightAdjuster';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';

const fontWeightAdjuster = new FontWeightAdjuster();

export const useAdjustFontWeight = () => {
  const [selected, setSelected] = useState<FontWeight>(fontWeightAdjuster.default);

  const update = useCallback((elements: HTMLElement[], value: string) => {
    if (!hasOwnProperty(FONT_WEIGHT, value)) throw new Error('Invalid font weight value');

    elements.forEach((element) => {
      fontWeightAdjuster.update(element, value);
    });
    setSelected(value);
  }, []);

  const resetElement = useCallback((element: HTMLElement) => {
    fontWeightAdjuster.update(element, fontWeightAdjuster.default);
  }, []);

  const resetSelected = useCallback(() => {
    setSelected(fontWeightAdjuster.default);
  }, []);

  return {
    update,
    resetElement,
    resetSelected,
    selected,
  };
};
