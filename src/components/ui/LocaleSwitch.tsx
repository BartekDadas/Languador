import { Globe } from 'lucide-react';
import { Button } from './Button';
import { useLocaleStore } from '../../store/localeStore';
import type { Locale } from '../../i18n/translations';

const locales: { value: Locale; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'pl', label: 'Polski' },
];

export function LocaleSwitch() {
  const { locale, setLocale, timestamp } = useLocaleStore();

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    // Force a page refresh to update all components
    window.location.reload();
  };

  return (
    <div className="relative group">
      <Button
        variant="outline"
        size="sm"
        className="!p-2"
      >
        <Globe className="w-5 h-5" />
      </Button>
      
      <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {locales.map((l) => (
          <button
            key={l.value}
            onClick={() => handleLocaleChange(l.value)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition ${
              locale === l.value ? 'text-primary font-medium' : 'text-gray-700'
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}