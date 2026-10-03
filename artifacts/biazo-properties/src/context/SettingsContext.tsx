import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import i18n from '@/i18n';

export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP' | 'SAR';
export type Language = 'en' | 'ar' | 'fr' | 'de' | 'ru' | 'zh';

interface SettingsContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
}

const SettingsContext = createContext<SettingsContextType>({
  currency: 'AED',
  setCurrency: () => {},
  language: 'en',
  setLanguage: () => {},
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem('bvh_currency') as Currency) ?? 'AED';
  });
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('bvh_language') as Language) ?? 'en';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('bvh_currency', c);
  };

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    localStorage.setItem('bvh_language', l);
    i18n.changeLanguage(l);
    // RTL support for Arabic
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  };

  useEffect(() => {
    // Apply persisted language on mount
    i18n.changeLanguage(language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, []);

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
