export const GLOBALS = {
  ACCESSIBILITY_ID: 'accessibility-id',
} as const;

export type GlobalsType = typeof GLOBALS[keyof typeof GLOBALS];
