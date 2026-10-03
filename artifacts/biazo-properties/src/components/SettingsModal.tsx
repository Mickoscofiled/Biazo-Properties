import { useState, useEffect } from 'react';
import { useSettings, Currency, Language } from '@/context/SettingsContext';
import { X, Globe, DollarSign, Check, RefreshCw } from 'lucide-react';
import { ratesAreLive } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CURRENCIES: { code: Currency; name: string; symbol: string }[] = [
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼' },
];

const LANGUAGES: { code: Language; name: string; native: string; flag: string }[] = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇦🇪' },
  { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Russian', native: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳' },
];

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { currency, setCurrency, language, setLanguage } = useSettings();
  const { t } = useTranslation();
  const [isLive, setIsLive] = useState(ratesAreLive());
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Poll every 3s until live rates load (they fetch in background)
  useEffect(() => {
    if (isLive) return;
    const interval = setInterval(() => {
      if (ratesAreLive()) {
        setIsLive(true);
        setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isLive]);

  useEffect(() => {
    if (isLive && !lastUpdated) {
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [isLive]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={t('settings_title')}
    >
      <div className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl bg-[#fbf8f2] shadow-2xl text-[#263442]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#263442]/10 bg-[#263442] px-6 py-4 text-[#fbf8f2]">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-[#dbcdbb]" />
            <div>
              <p className="text-[10px] font-semibold tracking-widest text-[#dbcdbb] uppercase">{t('settings_preferences', 'PREFERENCES')}</p>
              <h3 className="font-serif text-base leading-tight">{t('settings_title')}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#fbf8f2]/70 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Language */}
          <div>
            <p className="eyebrow mb-3 text-[10px] text-[#c56749] flex items-center gap-1.5">
              <Globe size={12} /> {t('settings_language')}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs transition-all ${
                    language === lang.code
                      ? 'border-[#263442] bg-[#263442] text-[#fbf8f2]'
                      : 'border-[#263442]/15 bg-white hover:border-[#263442]/30 hover:bg-[#263442]/5'
                  }`}
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{lang.native}</p>
                    <p className={`text-[10px] truncate ${language === lang.code ? 'text-[#fbf8f2]/70' : 'text-[#263442]/50'}`}>{lang.name}</p>
                  </div>
                  {language === lang.code && <Check size={12} className="ml-auto shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Currency */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="eyebrow text-[10px] text-[#c56749] flex items-center gap-1.5">
                <DollarSign size={12} /> {t('settings_currency')}
              </p>
              {isLive ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t('settings_live', 'LIVE')} · {t('settings_updated', 'updated')} {lastUpdated}
                </span>
              ) : (
                <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-semibold text-amber-700">
                  <RefreshCw size={9} className="animate-spin" />
                  {t('settings_fetching', 'Fetching live rates…')}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              {CURRENCIES.map((cur) => (
                <button
                  key={cur.code}
                  onClick={() => setCurrency(cur.code)}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                    currency === cur.code
                      ? 'border-[#263442] bg-[#263442] text-[#fbf8f2]'
                      : 'border-[#263442]/15 bg-white hover:border-[#263442]/30 hover:bg-[#263442]/5'
                  }`}
                >
                  <span className={`w-8 text-center font-bold text-base ${currency === cur.code ? 'text-[#dbcdbb]' : 'text-[#c56749]'}`}>
                    {cur.symbol}
                  </span>
                  <div>
                    <p className="font-semibold text-xs">{cur.code}</p>
                    <p className={`text-[10px] ${currency === cur.code ? 'text-[#fbf8f2]/70' : 'text-[#263442]/50'}`}>{cur.name}</p>
                  </div>
                  {currency === cur.code && <Check size={14} className="ml-auto" />}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn-fill w-full py-3 text-xs font-semibold tracking-wider"
          >
            {t('settings_save')}
          </button>
        </div>
      </div>
    </div>
  );
}
