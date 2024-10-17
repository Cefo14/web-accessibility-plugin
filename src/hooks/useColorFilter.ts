import { useCallback, useState } from 'react';

import { type MouseEventButton } from '@/types/MouseEventButton';
import { ACCESSIBILITY_CLASS_NAMES, type AccessibilityClassNamesKeys } from '@/constants/AccessibilityClassNames';

export const useColorFilter = () => {
  const [currentClassName, setCurrentClassName] = useState<string>('');

  const toggleColorFilter = useCallback((event: MouseEventButton) => {
    const { name } = event.currentTarget;
    const className: string = ACCESSIBILITY_CLASS_NAMES[name as AccessibilityClassNamesKeys];

    if (currentClassName === className) {
      document.documentElement.classList.toggle(className);
    }

    else {
      if (currentClassName) document.documentElement.classList.remove(currentClassName);
      document.documentElement.classList.add(className);
    }

    setCurrentClassName((prev) => {
      if (prev === className) return '';
      return className;
    });
  }, [currentClassName]);

  const isActiveColorFilter = useCallback((name: string) => (
    currentClassName === name
  ), [currentClassName]);

  const resetColorFilter = useCallback(() => {
    if (!currentClassName) return;
    document.documentElement.classList.remove(currentClassName);
    setCurrentClassName('');
  }, [currentClassName]);

  return {
    toggleColorFilter,
    isActiveColorFilter,
    resetColorFilter,
  };
};
