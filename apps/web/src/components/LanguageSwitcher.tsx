'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Globe } from 'lucide-react';
import type { Locale } from '@/i18n/routing';

const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'om', label: 'Afaan Oromoo' },
  { code: 'so', label: 'Soomaali' },
  { code: 'ti', label: 'ትግርኛ' },
];

export default function LanguageSwitcher({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const locale = useLocale();
  const t = useTranslations('lang');
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const switchLocale = (next: Locale) => {
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000`;
    setOpen(false);
    router.refresh();
  };

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  if (variant === 'compact') {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 transition-colors text-white text-[12px] font-bold"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>{t(locale as Locale)}</span>
        </button>
        {open && (
          <div className="absolute right-0 top-full mt-1 bg-white shadow-lg border border-slate-100 z-50 min-w-[150px]">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                onClick={() => switchLocale(l.code)}
                className={`w-full text-left px-4 py-2.5 text-[13px] font-bold flex items-center gap-2.5 hover:bg-[#E6F3F0] transition-colors ${
                  l.code === locale ? 'text-[#037561] bg-[#F0F7F5]' : 'text-slate-700'
                }`}
              >
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 text-[13px] font-bold hover:bg-slate-50 transition-colors"
      >
        <Globe className="w-4 h-4 text-[#037561]" />
        <span>{t(locale as Locale)}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white shadow-lg border border-slate-100 z-50 min-w-[160px]">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => switchLocale(l.code)}
              className={`w-full text-left px-4 py-3 text-[13px] font-bold flex items-center gap-2.5 hover:bg-[#E6F3F0] transition-colors ${
                l.code === locale ? 'text-[#037561] bg-[#F0F7F5]' : 'text-slate-700'
              }`}
            >
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
