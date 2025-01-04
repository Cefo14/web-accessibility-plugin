import { useCallback, useState } from 'react';

import type { ChangeEventInput } from '@/types/ChangeEvent';
import filterStyles from '@/styles/filter.module.css';

const FILTERS_ID = {
  hightContrast: 'hightContrast',
  hightSaturation: 'hightSaturation',
  invertColors: 'invertColors',
  protanopia: 'protanopia',
  deuteranopia: 'deuteranopia',
  tritanopia: 'tritanopia',
  achromatopsia: 'achromatopsia',
  achromatomaly: 'achromatomaly',
  red: 'red',
  green: 'green',
  blue: 'blue',
} as const;

const FILTERS_CLASS_NAMES = {
  [FILTERS_ID.hightContrast]: filterStyles.hightContrast,
  [FILTERS_ID.hightSaturation]: filterStyles.hightSaturation,
  [FILTERS_ID.invertColors]: filterStyles.invertColors,
  [FILTERS_ID.protanopia]: filterStyles.protanopia,
  [FILTERS_ID.deuteranopia]: filterStyles.deuteranopia,
  [FILTERS_ID.tritanopia]: filterStyles.tritanopia,
  [FILTERS_ID.achromatopsia]: filterStyles.achromatopsia,
  [FILTERS_ID.achromatomaly]: filterStyles.achromatomaly,
  [FILTERS_ID.red]: filterStyles.red,
  [FILTERS_ID.green]: filterStyles.green,
  [FILTERS_ID.blue]: filterStyles.blue,
} as const;

type FiltersClassNames = keyof typeof FILTERS_CLASS_NAMES;

export const useColorFilter = () => {
  const [currentClassNameId, setCurrentClassNameId] = useState<string>('');

  const toggleColorFilter = useCallback((event: ChangeEventInput) => {
    const { name } = event.currentTarget;
    const newClassName: string = FILTERS_CLASS_NAMES[name as FiltersClassNames];
    const currentClassName = FILTERS_CLASS_NAMES[currentClassNameId as FiltersClassNames];

    if (!newClassName) return;

    if (currentClassName && newClassName !== currentClassName) {
      document.documentElement.classList.remove(currentClassName);
    }

    document.documentElement.classList.toggle(newClassName);

    setCurrentClassNameId((prev) => {
      if (prev === name) return '';
      return name;
    });
  }, [currentClassNameId]);

  const isActiveColorFilter = useCallback((name: string) => (
    currentClassNameId === name
  ), [currentClassNameId]);

  const resetColorFilter = useCallback(() => {
    if (!currentClassNameId) return;
    const currentClassName = FILTERS_CLASS_NAMES[currentClassNameId as FiltersClassNames];
    document.documentElement.classList.remove(currentClassName);
    setCurrentClassNameId('');
  }, [currentClassNameId]);

  return {
    id: FILTERS_ID,
    toggleColorFilter,
    isActiveColorFilter,
    resetColorFilter,
  };
};
