export const camelCaseToKebabCase = (text: string) => {
  const isUpperCase = /[A-Z]/;
  return Array
    .from(text).map((word, index) => {
      const wordIsUpperCase = isUpperCase.test(word);
      if (index === 0) return word.toLowerCase();
      if (wordIsUpperCase) return ['-', word.toLowerCase()];
      return word.toLowerCase();
    })
    .flat()
    .join('');
};
