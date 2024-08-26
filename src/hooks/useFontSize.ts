import { useCallback, useState } from 'react';

import { TextElements } from '@/helpers/TextElements';
import { modifyPixelProp } from '@/helpers/modifyPixelProp';
import { toFixed } from '@/helpers/toFixed';

const textElements = TextElements.instance;

const PERCENTAGE_STEP = 10;

export const useFontSize = () => {
  const [fontSizePercentage, setfontSizePercentage] = useState(100);

  const decrementFontSizePercentage = useCallback(() => {
    let currentFontSize = fontSizePercentage;
    if (currentFontSize <= 10) currentFontSize = 10;
    else currentFontSize -= PERCENTAGE_STEP;

    textElements.elements.forEach((element) => {
      modifyPixelProp(element, 'fontSize', toFixed(currentFontSize/100, 2));
    });

    setfontSizePercentage(currentFontSize);
  }, [fontSizePercentage]);

  const incrementFontSizePercentage = useCallback(() => {
    let currentFontSize = fontSizePercentage;
    if (currentFontSize >= 200) currentFontSize = 200;
    else currentFontSize += PERCENTAGE_STEP;

    textElements.elements.forEach((element) => {
      modifyPixelProp(element, 'fontSize', toFixed(currentFontSize/100, 2));
    });

    setfontSizePercentage(currentFontSize);
  }, [fontSizePercentage]);


  const resetFontSize = useCallback(() => {
    textElements.elements.forEach((element) => {
      modifyPixelProp(element, 'fontSize', 1);
    });
    setfontSizePercentage(100);
  }, []);

  return {
    fontSizePercentage,
    decrementFontSizePercentage,
    incrementFontSizePercentage,
    resetFontSize
  };
};