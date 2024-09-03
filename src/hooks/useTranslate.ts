import { useCallback, useState } from "react";

type MenuTranslation = {
  OPEN_MENU: string;
  TITLE: string;
  TEXT_ADJUSTMENTS: string;
  TEXT_SIZE: string;
  TEXT_SPACE: string;
  TEXT_HEIGHT: string;
  TEXT_WEIGHT: string;
  HIGHLIGHTS: string;
  HIGHLIGHT_TITLES: string;
  HIGHLIGHT_LINKS: string;
  HIGHLIGHT_CURSOR: string;
  COLOR_FILTERS: string;
  HIGH_CONTRAST: string;
  HIGH_SATURATION: string;
  INVERT_COLORS: string;
  PROTANOPIA: string;
  DEUTERANOPIA: string;
  TRITANOPIA: string;
  ACHROMATOPSIA: string;
  ACHROMATOMALY: string;
  RESET: string;
  CLOSE_MENU: string;
}

// English translation
const en: MenuTranslation = {
  OPEN_MENU: 'Open Accessibility Menu',
  TITLE: 'Accessibility Menu',
  TEXT_ADJUSTMENTS: 'Text Adjustments',
  TEXT_SIZE: 'Text Size',
  TEXT_SPACE: 'Text Space',
  TEXT_HEIGHT: 'Text Height',
  TEXT_WEIGHT: 'Text Weight',
  HIGHLIGHTS: 'Highlights',
  HIGHLIGHT_TITLES: 'Highlight Title',
  HIGHLIGHT_LINKS: 'Highlight Links',
  HIGHLIGHT_CURSOR: 'Highlight Cursor',
  COLOR_FILTERS: 'Color Filters',
  HIGH_CONTRAST: 'High Contrast',
  HIGH_SATURATION: 'High Saturation',
  INVERT_COLORS: 'Invert Colors',
  PROTANOPIA: 'Protanopia',
  DEUTERANOPIA: 'Deuteranopia',
  TRITANOPIA: 'Tritanopia',
  ACHROMATOPSIA: 'Achromatopsia',
  ACHROMATOMALY: 'Achromatomaly',
  RESET: 'Reset',
  CLOSE_MENU: 'Close Menu',
};

// Chinese (Simplified) translation
const zh: MenuTranslation = {
  OPEN_MENU: '打开无障碍菜单',
  TITLE: '无障碍菜单',
  TEXT_ADJUSTMENTS: '文字调整',
  TEXT_SIZE: '文字大小',
  TEXT_SPACE: '文字间距',
  TEXT_HEIGHT: '文字高度',
  TEXT_WEIGHT: '文字粗细',
  HIGHLIGHTS: '高亮',
  HIGHLIGHT_TITLES: '标题高亮',
  HIGHLIGHT_LINKS: '链接高亮',
  HIGHLIGHT_CURSOR: '光标高亮',
  COLOR_FILTERS: '颜色滤镜',
  HIGH_CONTRAST: '高对比度',
  HIGH_SATURATION: '高饱和度',
  INVERT_COLORS: '反色',
  PROTANOPIA: '红绿色盲',
  DEUTERANOPIA: '蓝黄色盲',
  TRITANOPIA: '紫蓝色盲',
  ACHROMATOPSIA: '全色盲',
  ACHROMATOMALY: '全色弱',
  RESET: '重置',
  CLOSE_MENU: '关闭菜单',
};

const hi: MenuTranslation = {
  OPEN_MENU: 'अकेस्बिलिटी मेनु खोलें',
  TITLE: 'अकेस्बिलिटी मेनु',
  TEXT_ADJUSTMENTS: 'पाठ समायोजन',
  TEXT_SIZE: 'पाठ आकार',
  TEXT_SPACE: 'पाठ अंतराल',
  TEXT_HEIGHT: 'पाठ ऊँचाई',
  TEXT_WEIGHT: 'पाठ मोटाई',
  HIGHLIGHTS: 'हाइलाइट',
  HIGHLIGHT_TITLES: 'शीर्षक हाइलाइट',
  HIGHLIGHT_LINKS: 'लिंक हाइलाइट',
  HIGHLIGHT_CURSOR: 'कुर्सर हाइलाइट',
  COLOR_FILTERS: 'रंग फ़िल्‌तर',
  HIGH_CONTRAST: 'उच्च समाश्रयण',
  HIGH_SATURATION: 'उच्च संतृप्ति',
  INVERT_COLORS: 'रंग उलटा',
  PROTANOPIA: 'प्रोटोनॉपिया',
  DEUTERANOPIA: 'ड्यूटरोनॉपिया',
  TRITANOPIA: 'त्रीटोनॉपिया',
  ACHROMATOPSIA: 'अक्रोमेटॉपसिया',
  ACHROMATOMALY: 'अक्रोमेटोमली',
  RESET: 'रीसेट',
  CLOSE_MENU: 'मेनु बंद करें',
};


// Spanish translation
const es: MenuTranslation = {
  OPEN_MENU: 'Abrir menú',
  TITLE: 'Accesibilidad',
  TEXT_ADJUSTMENTS: 'Ajustes de Texto',
  TEXT_SIZE: 'Tamaño del Texto',
  TEXT_SPACE: 'Espacio del Texto',
  TEXT_HEIGHT: 'Altura del Texto',
  TEXT_WEIGHT: 'Peso del Texto',
  HIGHLIGHTS: 'Resaltado',
  HIGHLIGHT_TITLES: 'Resaltar Título',
  HIGHLIGHT_LINKS: 'Resaltar Enlaces',
  HIGHLIGHT_CURSOR: 'Resaltar Cursor',
  COLOR_FILTERS: 'Filtros de Color',
  HIGH_CONTRAST: 'Contraste Alto',
  HIGH_SATURATION: 'Saturación Alta',
  INVERT_COLORS: 'Invertir Colores',
  PROTANOPIA: 'Protanopia',
  DEUTERANOPIA: 'Deuteranopia',
  TRITANOPIA: 'Tritanopia',
  ACHROMATOPSIA: 'Achromatopsia',
  ACHROMATOMALY: 'Achromatomaly',
  RESET: 'Reiniciar',
  CLOSE_MENU: 'Cerrar Menú',
};

const fr: MenuTranslation = {
  OPEN_MENU: 'Ouvrir le menu',
  TITLE: 'Menu d\'accessibilité',
  TEXT_ADJUSTMENTS: 'Réglages de texte',
  TEXT_SIZE: 'Taille du texte',
  TEXT_SPACE: 'Espacement du texte',
  TEXT_HEIGHT: 'Hauteur du texte',
  TEXT_WEIGHT: 'Poids du texte',
  HIGHLIGHTS: 'Surlignages',
  HIGHLIGHT_TITLES: 'Surligner le titre',
  HIGHLIGHT_LINKS: 'Surligner les liens',
  HIGHLIGHT_CURSOR: 'Surligner le curseur',
  COLOR_FILTERS: 'Filtres de couleurs',
  HIGH_CONTRAST: 'Contraste élevé',
  HIGH_SATURATION: 'Saturation élevée',
  INVERT_COLORS: 'Inverser les couleurs',
  PROTANOPIA: 'Protanopie',
  DEUTERANOPIA: 'Deuteranopie',
  TRITANOPIA: 'Tritanopie',
  ACHROMATOPSIA: 'Achromatopsie',
  ACHROMATOMALY: 'Achromatomaly',
  RESET: 'Réinitialiser',
  CLOSE_MENU: 'Fermer le menu',
};

type Languages = {
  en: MenuTranslation
  zh: MenuTranslation
  hi: MenuTranslation
  es: MenuTranslation
  fr: MenuTranslation
}

const languages: Languages = {
  en,
  zh,
  hi,
  es,
  fr,
};

const getLanguage = (): keyof Languages => {
  const { language } = navigator;
  const [lang] = language.split('-');
  if (!lang) return 'en';
  if (lang in languages) return lang as keyof Languages;
  return 'en';
}

export const useTranslate = () => {
  const [language, setLanguage] = useState(getLanguage());
  console.log(setLanguage);
  
  const t = useCallback((key: keyof MenuTranslation) => {
    if (!languages[language]) return en[key];
    const locale = languages[language];
    if (!locale[key]) throw new Error(`Translation for ${key} not found in ${locale}`);
    return locale[key];
  }, [language]);

  const changeLanguage = useCallback((lang: keyof Languages) => {
    setLanguage(lang);
  }, []);

  return {
    t,
    language,
    changeLanguage
  };
};