import Link from 'next/link';
import { ArrowLeft, AlertTriangle, CheckCircle2 } from 'lucide-react';
import HowToUseVideos from '@/components/HowToUseVideos';
import GuidedTimer from '@/components/GuidedTimer';
import HowToUseStepIllustration from '@/components/HowToUseStepIllustration';
import { useTranslations } from 'next-intl';

export default function HowToUsePage() {
  const t = useTranslations('howToUse');

  const STEP_KEYS = ['s1', 's2', 's3', 's4', 's5'] as const;

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] text-white px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="relative">
          <Link href="/hiv-test" className="inline-flex items-center justify-center w-9 h-9 bg-white/20 rounded-2xl mb-5 hover:bg-white/30 transition-colors">
            <ArrowLeft className="w-4 h-4 text-white" />
          </Link>
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-[11px] font-black tracking-widest uppercase opacity-90">{t('badge')}</span>
          </div>
          <h1 className="text-[1.9rem] font-black leading-tight mb-2 tracking-tight">
            {t('title').split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </h1>
          <p className="text-[13px] text-white/60 leading-relaxed font-medium">{t('subtitle')}</p>
          <div className="flex gap-2 mt-5">
            {STEP_KEYS.map((sk) => (
              <div key={sk} className="flex-1">
                <div className="w-full h-1.5 rounded-full bg-white/25 mb-1.5" />
                <span className="text-[9px] text-white/50 leading-none block text-center truncate font-medium">
                  {t(`steps.${sk}title`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-5 space-y-4">
        <GuidedTimer />
        <HowToUseVideos />

        {STEP_KEYS.map((sk, idx) => {
          const checklist = ['c1', 'c2', 'c3'].map((c) => {
            try { return t(`steps.${sk}${c}` as Parameters<typeof t>[0]); } catch { return null; }
          }).filter(Boolean) as string[];

          let warning: string | null = null;
          let note: string | null = null;
          try { warning = t(`steps.${sk}warn` as Parameters<typeof t>[0]); } catch {}
          try { note = t(`steps.${sk}note` as Parameters<typeof t>[0]); } catch {}

          return (
            <div key={sk} className="bg-white rounded-2xl overflow-hidden shadow-sm">
              {/* Step header */}
              <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-gray-50">
                <div className="w-9 h-9 bg-[#037561] rounded-full flex items-center justify-center shrink-0 text-white text-sm font-black">
                  {idx + 1}
                </div>
                <h2 className="font-extrabold text-gray-800 text-[15px]">{t(`steps.${sk}title` as Parameters<typeof t>[0])}</h2>
              </div>

              <div className="p-5 space-y-3">
                <HowToUseStepIllustration step={sk} />

                <p className="text-sm text-gray-600 leading-relaxed">{t(`steps.${sk}desc` as Parameters<typeof t>[0])}</p>

                {checklist.length > 0 && (
                  <div className="space-y-2.5 pt-1">
                    {checklist.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#037561] shrink-0 mt-0.5" />
                        <span className="text-[13px] text-gray-700 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {note && (
                  <div className="flex items-start gap-2.5 bg-slate-50 rounded-xl px-3.5 py-3">
                    <span className="text-slate-400 text-sm shrink-0 mt-0.5">ℹ</span>
                    <span className="text-[13px] text-slate-500 leading-snug">{note}</span>
                  </div>
                )}

                {warning && (
                  <div className="flex items-start gap-2.5 bg-yellow-50 border border-yellow-200 rounded-xl px-3.5 py-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <p className="text-[13px] text-yellow-700 leading-snug font-medium">{warning}</p>
                  </div>
                )}

                {/* Step 5 — result lines */}
                {sk === 's5' && (
                  <div className="space-y-2 pt-1">
                    <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">{t('resultRef')}</p>
                    {([
                      { linesKey: 'r1lines', atKey: 'r1at', outcomeKey: 'r1outcome', detailKey: 'r1detail', bg: 'bg-green-50',  border: 'border-green-200',  dot: 'bg-green-500',  color: 'text-green-700'  },
                      { linesKey: 'r2lines', atKey: 'r2at', outcomeKey: 'r2outcome', detailKey: 'r2detail', bg: 'bg-red-50',    border: 'border-red-200',    dot: 'bg-red-500',    color: 'text-red-600'    },
                      { linesKey: 'r3lines', atKey: 'r3at', outcomeKey: 'r3outcome', detailKey: 'r3detail', bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-400', color: 'text-yellow-700' },
                    ] as const).map((r) => (
                      <div key={r.outcomeKey} className={`flex items-start gap-3 border rounded-xl p-3.5 ${r.bg} ${r.border}`}>
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${r.dot}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[13px] font-extrabold ${r.color}`}>{t(`steps.${r.linesKey}` as Parameters<typeof t>[0])}</span>
                            <span className="text-[11px] text-gray-400">({t(`steps.${r.atKey}` as Parameters<typeof t>[0])})</span>
                            <span className={`text-[11px] font-extrabold ${r.color} ml-auto`}>{t(`steps.${r.outcomeKey}` as Parameters<typeof t>[0])}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{t(`steps.${r.detailKey}` as Parameters<typeof t>[0])}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Quick reference */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <p className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">{t('quickRef')}</p>
          <div className="space-y-2.5">
            {STEP_KEYS.map((sk, i) => (
              <div key={sk} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#037561] rounded-full flex items-center justify-center shrink-0 text-white text-xs font-extrabold">{i + 1}</div>
                <span className="text-[13px] text-gray-700 font-medium">{t(`steps.${sk}title` as Parameters<typeof t>[0])}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-50">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="font-bold text-gray-500">{t('important')}</span>{' '}
              {t('importantNote')}
            </p>
          </div>
        </div>

        <Link
          href="/hiv-test/results"
          className="flex items-center justify-center gap-2 w-full bg-[#037561] text-white rounded-2xl py-4 font-bold text-[14px] hover:bg-[#025a49] active:scale-[0.98] transition-all"
        >
          {t('nextCta')}
        </Link>
      </div>
    </div>
  );
}
