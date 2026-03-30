import Link from 'next/link';
import { ChevronRight, ShieldCheck, MapPin, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const t = useTranslations('home');
  const headline = t('headline').split('\n');

  return (
    <div className="min-h-screen flex flex-col bg-[#025a49]">
      <div className="max-w-sm mx-auto w-full flex flex-col min-h-screen relative">

        {/* Content */}
        <div className="relative flex-1 flex flex-col px-6 pt-14 pb-8">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-white/50">
                {t('tagline')}
              </p>
            </div>
            <LanguageSwitcher variant="compact" />
          </div>

          {/* Headline */}
          <div className="mb-8">
            <h1 className="text-[3rem] font-black text-white leading-[1.05] tracking-tight mb-4">
              {headline.map((line, i) => (
                <span key={i}>{line}{i < headline.length - 1 && <br />}</span>
              ))}
            </h1>
            <p className="text-[14px] text-white/55 leading-relaxed font-medium max-w-[240px]">
              {t('description')}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mb-8">
            {[
              { value: '120+', labelKey: 'locations',  icon: MapPin  },
              { value: '99%',  labelKey: 'accurate',   icon: Zap     },
              { value: '0',    labelKey: 'dataStored', icon: ShieldCheck },
            ].map((s) => (
              <div key={s.labelKey} className="flex-1 bg-white/10 rounded-2xl px-3 py-3 text-center backdrop-blur-sm">
                <p className="text-[1.2rem] font-black text-white leading-none">{s.value}</p>
                <p className="text-[9px] text-white/40 font-bold mt-1 uppercase tracking-wider leading-tight">
                  {t(`stats.${s.labelKey}`)}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/hiv-test"
            className="flex items-center justify-between w-full bg-white text-[#025a49] px-6 py-4 rounded-2xl font-black text-[15px] shadow-brand hover:bg-white/95 active:scale-[0.98] transition-all"
          >
            {t('cta')}
            <div className="w-8 h-8 bg-[#037561] rounded-xl flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-white" />
            </div>
          </Link>
        </div>

        {/* Bottom strip */}
        <div className="relative bg-white/[0.06] backdrop-blur-sm px-6 py-4 border-t border-white/10">
          <div className="flex items-center justify-center gap-3">
            {[
              { icon: ShieldCheck, label: t('footer').split(' · ')[0] },
              { icon: ShieldCheck, label: t('footer').split(' · ')[1] },
              { icon: ShieldCheck, label: t('footer').split(' · ')[2] },
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-1.5 text-[11px] font-bold text-white/40">
                {i > 0 && <span className="text-white/20">·</span>}
                {item.label}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
