import { useCallback, useEffect, useState } from 'react';

import { fontFamilyAdjuster, type FontFamily, FONT_FAMILY } from '@/helpers/FontFamilyAdjuster';
import { hasOwnProperty } from '@/helpers/hasOwnProperty';

export const useAdjustFontFamily = () => {
  const [selected, setSelected] = useState<FontFamily>(
    fontFamilyAdjuster.default,
  );

  const update = useCallback((elements: HTMLElement[], value: string) => {
    if (!hasOwnProperty(FONT_FAMILY, value)) throw new Error('Invalid font family value');

    elements.forEach((element) => {
      fontFamilyAdjuster.update(element, value);
    });
    setSelected(value);
  }, []);

  const reset = useCallback(() => {
    setSelected(fontFamilyAdjuster.default);
  }, []);

  useEffect(() => {
    const STYLE_ID = 'WAP-open-dyslexic';
    const style = document.getElementById(STYLE_ID);

    if (style) return;

    const fragment = document.createDocumentFragment();

    const link = document.createElement('link');
    link.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
    link.rel = 'stylesheet';
    link.id = STYLE_ID;

    fragment.append(link);

    const preloadBold = document.createElement('link');
    preloadBold.href = 'https://fonts.cdnfonts.com/s/19808/OpenDyslexic-Bold.woff';
    preloadBold.rel = 'preload';
    preloadBold.as = 'font';
    preloadBold.type = 'font/woff';
    preloadBold.crossOrigin = 'anonymous';

    fragment.append(preloadBold);

    const preloadRegular = document.createElement('link');
    preloadRegular.href = 'https://fonts.cdnfonts.com/s/19808/OpenDyslexic-Regular.woff';
    preloadRegular.rel = 'preload';
    preloadRegular.as = 'font';
    preloadRegular.type = 'font/woff';
    preloadRegular.crossOrigin = 'anonymous';

    fragment.append(preloadRegular);

    document.head.append(fragment);
  }, []);

  return {
    update,
    reset,
    selected,
  };
};
