export const GLOBALS = {
  WAP_ID: 'web-accessibility-plugin-id',
} as const;

export type GlobalsType = typeof GLOBALS[keyof typeof GLOBALS];
