import { useEffect } from 'react';

export const useExternalFonts = () => {
  useEffect(() => {
    const STYLE_ID = 'WAP-open-dyslexic';
    const style = document.getElementById(STYLE_ID);

    if (style) return;

    const fragment = document.createDocumentFragment();

    const link = document.createElement('link');
    link.id = STYLE_ID;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.cdnfonts.com/css/opendyslexic';
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };

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
};
