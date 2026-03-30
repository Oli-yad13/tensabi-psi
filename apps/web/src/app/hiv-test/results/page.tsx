'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, ShieldCheck, Heart, ChevronRight } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';

type ResultType = 'NEGATIVE' | 'POSITIVE' | 'INVALID';

export default function ResultsPage() {
  const t = useTranslations('results');
  const tc = useTranslations('common');
  const [active, setActive] = useState<ResultType>('NEGATIVE');

  const { mutate: logResult } = useMutation({
    mutationFn: (result: ResultType) =>
      api.post('/results', { result }).then((r) => r.data),
  });

  const tabKey = active.toLowerCase() as 'negative' | 'positive' | 'invalid';

  const TABS: { id: ResultType; dotColor: string; activeClass: string; inactiveClass: string }[] = [
    { id: 'NEGATIVE', dotColor: 'bg-green-500',  activeClass: 'bg-green-100 text-green-700 ring-1 ring-green-200',    inactiveClass: 'bg-slate-100 text-slate-400 hover:bg-slate-200'  },
    { id: 'POSITIVE', dotColor: 'bg-red-500',    activeClass: 'bg-red-100 text-red-600 ring-1 ring-red-200',          inactiveClass: 'bg-slate-100 text-slate-400 hover:bg-slate-200'  },
    { id: 'INVALID',  dotColor: 'bg-amber-400',  activeClass: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',    inactiveClass: 'bg-slate-100 text-slate-400 hover:bg-slate-200'  },
  ];

  const iconSvgs: Record<ResultType, React.ReactNode> = {
    NEGATIVE: (
      <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 40 40">
        <path d="M10 20l7 7 13-13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    POSITIVE: (
      <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 40 40">
        <path d="M12 12l16 16M28 12L12 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    INVALID: (
      <svg className="w-12 h-12 text-amber-600" fill="none" viewBox="0 0 40 40">
        <path d="M20 12v10M20 27v2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  };

  const iconBgs: Record<ResultType, string> = {
    NEGATIVE: 'bg-green-50 ring-green-100',
    POSITIVE: 'bg-red-50 ring-red-100',
    INVALID:  'bg-amber-50 ring-amber-100',
  };

  const meaningBorders: Record<ResultType, string> = {
    NEGATIVE: 'border-green-400 bg-green-50',
    POSITIVE: 'border-red-400 bg-red-50',
    INVALID:  'border-amber-400 bg-amber-50',
  };

  const steps: Record<ResultType, { icon: React.ReactNode; iconBg: string }[]> = {
    NEGATIVE: [
      { icon: <RefreshCw className="w-4 h-4 text-[#037561]" />,    iconBg: 'bg-[#E6F3F0]'  },
      { icon: <ShieldCheck className="w-4 h-4 text-[#037561]" />,  iconBg: 'bg-[#E6F3F0]'  },
      { icon: <Heart className="w-4 h-4 text-green-600" />,         iconBg: 'bg-green-50'    },
    ],
    POSITIVE: [
      { icon: <ShieldCheck className="w-4 h-4 text-[#037561]" />,  iconBg: 'bg-[#E6F3F0]'  },
      { icon: <Heart className="w-4 h-4 text-red-500" />,           iconBg: 'bg-red-50'      },
      { icon: <RefreshCw className="w-4 h-4 text-[#037561]" />,    iconBg: 'bg-[#E6F3F0]'  },
    ],
    INVALID: [
      { icon: <RefreshCw className="w-4 h-4 text-amber-600" />,    iconBg: 'bg-amber-50'    },
      { icon: <ShieldCheck className="w-4 h-4 text-[#037561]" />,  iconBg: 'bg-[#E6F3F0]'  },
      { icon: <Heart className="w-4 h-4 text-[#037561]" />,         iconBg: 'bg-[#E6F3F0]'  },
    ],
  };

  const ctaColors: Record<ResultType, string> = {
    NEGATIVE: '',
    POSITIVE: 'from-red-600 to-red-500',
    INVALID:  'from-amber-500 to-amber-400',
  };

  const ctaHrefs: Record<ResultType, string> = {
    NEGATIVE: '',
    POSITIVE: '/hiv-test/testing-centers',
    INVALID:  '/hiv-test/how-to-use',
  };

  return (
    <div className="pb-8">
      {/* Sticky header + tabs */}
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] px-4 pt-12 pb-4 sticky top-0 z-10 overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/hiv-test" className="w-9 h-9 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors">
              <ArrowLeft className="w-4 h-4 text-white" />
            </Link>
            <div>
              <h1 className="font-black text-white text-[17px] leading-tight">{t('title')}</h1>
              <p className="text-[11px] text-white/60 font-medium">{t('subtitle')}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActive(tab.id); logResult(tab.id); }}
                className={`flex-1 py-2.5 rounded-2xl text-[13px] font-black transition-all flex items-center justify-center gap-1.5 active:scale-[0.97] ${
                  active === tab.id ? tab.activeClass : tab.inactiveClass
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 transition-colors ${active === tab.id ? tab.dotColor : 'bg-slate-300'}`} />
                {t(`tabs.${tab.id.toLowerCase() as 'negative' | 'positive' | 'invalid'}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-3">
        {/* Result icon + title */}
        <div className="bg-white rounded-3xl px-6 py-8 shadow-card text-center">
          <div className={`w-28 h-28 rounded-full ${iconBgs[active]} ring-8 flex items-center justify-center mx-auto mb-5`}>
            {iconSvgs[active]}
          </div>
          <h2 className="text-[1.4rem] font-black text-slate-800 mb-2 tracking-tight">{t(`${tabKey}.title`)}</h2>
          <p className="text-[13px] text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">{t(`${tabKey}.subtitle`)}</p>
        </div>

        {/* What this means */}
        <div className="bg-white rounded-3xl p-4 shadow-card">
          <div className={`border-l-4 pl-4 ${meaningBorders[active]} rounded-r-2xl py-3`}>
            <p className="text-[13px] text-slate-700 leading-relaxed">
              <span className="font-black text-slate-800">{t('whatThisMeans')} </span>
              {t(`${tabKey}.meaning`)}
            </p>
          </div>
        </div>

        {/* Next steps */}
        <div>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 mb-2">{t('nextSteps')}</p>
          <div className="space-y-2">
            {steps[active].map((step, i) => (
              <div key={i} className="bg-white rounded-3xl p-4 shadow-card flex items-start gap-3">
                <div className={`w-10 h-10 rounded-2xl ${step.iconBg} flex items-center justify-center shrink-0`}>
                  {step.icon}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-black text-slate-300 shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-[13px] text-slate-700 leading-snug font-medium">
                      {t(`${tabKey}.step${i + 1}` as Parameters<typeof t>[0])}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA for positive/invalid */}
        {active !== 'NEGATIVE' && (
          <Link
            href={ctaHrefs[active]}
            className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${ctaColors[active]} text-white rounded-3xl py-4 font-black text-[15px] active:scale-[0.98] transition-all shadow-md`}
          >
            {t(`${tabKey}.cta` as Parameters<typeof t>[0])}
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}

        {/* Privacy note */}
        <div className="flex items-start gap-3 bg-gradient-to-br from-[#037561] to-[#025a49] rounded-3xl p-4">
          <ShieldCheck className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <p className="text-[12px] text-white/70 leading-relaxed">
            <span className="font-black text-white">{tc('privacyNote')} </span>
            {t('privacyNote')}
          </p>
        </div>
      </div>
    </div>
  );
}
