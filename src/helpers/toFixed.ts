export const toFixed = (num: number, digits: number = 0): number => {
  const [integer, decimal] = num.toString().split('.');
  if (!decimal) return Number(integer);
  const currentDecimal = decimal.slice(0, digits);
  const result = `${integer}.${currentDecimal}`;
  return Number(result);
};
