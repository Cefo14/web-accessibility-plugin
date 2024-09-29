export const GLOBALS = {
  ACCESSIBILITY_ID: 'accessibility-id',
} as const;

export type GLOBALSTYPE = typeof GLOBALS[keyof typeof GLOBALS];
