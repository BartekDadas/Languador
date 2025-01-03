import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { translations, type Locale, type TranslationKeys } from '../i18n/translations';

type Path<T> = T extends object 
  ? { [K in keyof T]: K extends string ? K | `${K}.${Path<T[K]>}` : never }[keyof T]
  : never;

type TranslationPath = Path<TranslationKeys>;

interface LocaleState {
  locale: Locale;
  timestamp: number;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationPath) => string;
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: 'en',
      timestamp: Date.now(),
      setLocale: (locale) => set({ 
        locale,
        timestamp: Date.now() // Force re-render by updating timestamp
      }),
      t: (key: TranslationPath) => {
        const locale = get().locale;
        const keys = key.split('.');
        let value: any = translations[locale];
        
        for (const k of keys) {
          value = value?.[k];
          if (!value) break;
        }
        
        return value || key;
      },
    }),
    {
      name: 'languador-locale',
    }
  )
);