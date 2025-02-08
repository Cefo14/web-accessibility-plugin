import type { TranslationModel } from './TranslationModel';

// Spanish translation
export const es: TranslationModel = {
  'menu.title': 'Accesibilidad',
  'menu.description': 'Configura las opciones de accesibilidad para una experiencia óptima.',
  'menu.openMenu': 'Abrir menú',
  'menu.reset': 'Reiniciar',
  'menu.close': 'Cerrar',

  'section.font.title': 'Ajustes de Texto',
  'section.font.fontStyle': 'Tamaño',
  'section.font.letterSpacing': 'Espaciado',
  'section.font.lineHeight': 'Altura',
  'section.font.fontWeight': 'Peso',
  'section.font.fontFamily': 'Fuente',

  'section.colorFilter.title': 'Filtros de Color',
  'section.colorFilter.brightness': 'Brillo',
  'section.colorFilter.contrast': 'Contraste',
  'section.colorFilter.saturation': 'Saturación',
  'section.colorFilter.sepia': 'Sepia',
  'section.colorFilter.hue': 'Rotación del tono',
  'section.colorFilter.warm': 'Calido',
  'section.colorFilter.blue': 'Azul',
  'section.colorFilter.red': 'Rojo',
  'section.colorFilter.green': 'Verde',
  'section.colorFilter.monochrome': 'Monocromo',
  'section.colorFilter.reset': 'Reiniciar',

  'section.tools.title': 'Herramientas',
  'section.tools.highlightTitles': 'Resaltar Títulos',
  'section.tools.highlightLinks': 'Resaltar enlaces',
  'section.tools.highlightCursor': 'Resaltar cursor',
  'section.tools.hideImages': 'Ocultar imágenes',
} as const;
