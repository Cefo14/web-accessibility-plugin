import { CSSUnitError } from '@/errors/CSSUnitError';

export const getCSSUnitValue = (pixel: string): number | null => {
  const regex = /^(-?[0-9]+.?[0-9]+)([a-z]*)$/;
  const match = pixel.match(regex);

  if (match === null) throw new CSSUnitError('Invalid CSS unit');

  const group = match.at(1);
  return group ? Number(group) : null;
};
