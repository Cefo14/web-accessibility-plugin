export const hasOwnProperty = <T extends object>(obj: T, prop: PropertyKey): prop is keyof T => (
  Object.prototype.hasOwnProperty.call(obj, prop)
);
