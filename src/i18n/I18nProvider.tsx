import {
  type ReactNode,
  useMemo,
  useState,
} from 'react';
import type { LanguageCode } from './i18n';
import { I18nContext } from './I18nContext';
import { getSystemLanguage } from './getSystemLanguage';

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguage] = useState<LanguageCode>(getSystemLanguage());

  const value = useMemo(() => ({
    language,
    setLanguage,
  }), [language]);

  return (
    <I18nContext.Provider value={value}>
      { children }
    </I18nContext.Provider>
  );
};
