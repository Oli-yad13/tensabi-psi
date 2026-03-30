import Link from 'next/link';
import { ArrowLeft, FlaskConical, Target, BarChart3, CalendarClock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function HowItWorksPage() {
  const t = useTranslations('howItWorks');

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] text-white px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="relative">
          <Link
            href="/hiv-test"
            className="inline-flex items-center justify-center w-9 h-9 bg-white/20 rounded-2xl mb-5 hover:bg-white/30 transition-colors"
          >
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
          <p className="text-[13px] text-white/60 leading-relaxed font-medium">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <div className="px-4 py-5 space-y-4">

        {/* Section 1 — What is ORAQuick */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-slate-50">
            <div className="w-10 h-10 bg-[#E6F3F0] rounded-2xl flex items-center justify-center shrink-0">
              <FlaskConical style={{ width: 18, height: 18 }} className="text-[#037561]" />
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">01</span>
              <h2 className="font-black text-slate-800 text-[14px] leading-snug">{t('s1title')}</h2>
            </div>
          </div>
          <div className="px-5 py-4 space-y-3">
            <p className="text-[13px] text-slate-600 leading-relaxed">{t('s1content')}</p>
            <span className="inline-flex items-center text-xs px-3 py-1.5 rounded-full font-black bg-[#E6F3F0] text-[#037561]">
              {t('s1badge')}
            </span>
          </div>
        </div>

        {/* Section 2 — What does it detect */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-slate-50">
            <div className="w-10 h-10 bg-[#E6F3F0] rounded-2xl flex items-center justify-center shrink-0">
              <Target style={{ width: 18, height: 18 }} className="text-[#037561]" />
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">02</span>
              <h2 className="font-black text-slate-800 text-[14px] leading-snug">{t('s2title')}</h2>
            </div>
          </div>
          <div className="px-5 py-4 space-y-3">
            <p className="text-[13px] text-slate-600 leading-relaxed">{t('s2content')}</p>
            <div className="flex flex-wrap gap-2">
              {['HIV-1 Antibodies', 'HIV-2 Antibodies'].map((label) => (
                <span key={label} className="text-[13px] px-3 py-1.5 rounded-full font-black bg-[#E6F3F0] text-[#037561]">
                  {label}
                </span>
              ))}
            </div>
            <div className="flex items-start gap-2 bg-slate-50 rounded-2xl px-3.5 py-3">
              <span className="text-slate-400 text-xs shrink-0 mt-0.5">ℹ</span>
              <p className="text-xs text-slate-500 leading-relaxed italic">{t('s2note')}</p>
            </div>
          </div>
        </div>

        {/* Section 3 — Accuracy */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-slate-50">
            <div className="w-10 h-10 bg-[#E6F3F0] rounded-2xl flex items-center justify-center shrink-0">
              <BarChart3 style={{ width: 18, height: 18 }} className="text-[#037561]" />
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">03</span>
              <h2 className="font-black text-slate-800 text-[14px] leading-snug">{t('s3title')}</h2>
            </div>
          </div>
          <div className="px-5 py-4 space-y-4">
            {[
              { labelKey: 's3sensitivity', value: 99.3 },
              { labelKey: 's3specificity', value: 99.8 },
            ].map((a) => (
              <div key={a.labelKey}>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[13px] text-slate-500 font-medium leading-snug flex-1 pr-4">{t(a.labelKey)}</span>
                  <span className="text-lg font-black text-[#037561] shrink-0">{a.value}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-[#037561]" style={{ width: `${a.value}%` }} />
                </div>
              </div>
            ))}
            <div className="border-l-4 border-[#037561] pl-3 bg-[#E6F3F0] rounded-r-2xl py-2.5">
              <p className="text-[13px] text-[#037561] font-black leading-snug">{t('s3note')}</p>
            </div>
            <div className="flex items-start gap-2 bg-slate-50 rounded-2xl px-3.5 py-3">
              <span className="text-slate-400 text-xs shrink-0 mt-0.5">ℹ</span>
              <p className="text-xs text-slate-400 leading-relaxed italic">{t('s3subNote')}</p>
            </div>
          </div>
        </div>

        {/* Section 4 — Window Period */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
          <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-slate-50">
            <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center shrink-0">
              <CalendarClock style={{ width: 18, height: 18 }} className="text-amber-500" />
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">04</span>
              <h2 className="font-black text-slate-800 text-[14px] leading-snug">{t('s4title')}</h2>
            </div>
          </div>
          <div className="px-5 py-4 space-y-3">
            <p className="text-[13px] text-slate-600 leading-relaxed">{t('s4content')}</p>
            <div>
              <div className="flex items-start relative mt-1 mb-2">
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-gradient-to-r from-slate-200 via-[#037561]/40 to-[#037561] z-0" />
                {([
                  { label: 'D1',  subKey: 'exposure', active: false },
                  { label: 'Wk3', subKey: 'earliest', active: true  },
                  { label: 'Wk6', subKey: 'reliable', active: true  },
                  { label: 'D90', subKey: 'confirm',  active: true  },
                ] as const).map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center z-10">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
                      item.active
                        ? 'bg-[#037561] text-white shadow-md shadow-[#037561]/20'
                        : 'bg-white text-slate-400 border-2 border-slate-200'
                    }`}>
                      {item.label}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 text-center leading-tight font-medium">
                      {t(`timeline.${item.subKey}`)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-slate-400 leading-relaxed mt-2 px-2 font-medium">
                {t('s4timelineNote')}
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/hiv-test/how-to-use"
          className="flex items-center justify-center gap-2 w-full bg-[#037561] text-white rounded-3xl py-4 font-black text-[15px] hover:bg-[#025a49] active:scale-[0.98] transition-all shadow-brand"
        >
          {t('nextCta')}
        </Link>
      </div>
    </div>
  );
}
