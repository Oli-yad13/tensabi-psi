import Link from 'next/link';
import { ArrowLeft, ChevronRight, Star, Shield, Zap, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const STI_KEYS = ['chlamydia', 'gonorrhea', 'syphilis', 'hepatitisB', 'hpv', 'herpes'] as const;
const STI_SLUGS: Record<string, string> = {
  chlamydia: 'chlamydia',
  gonorrhea: 'gonorrhea',
  syphilis: 'syphilis',
  hepatitisB: 'hepatitis-b',
  hpv: 'hpv',
  herpes: 'herpes',
};
const STI_META: Record<string, { icon: string; iconBg: string; accent: string }> = {
  chlamydia:  { icon: '🦠', iconBg: 'bg-blue-50',   accent: 'border-blue-200'   },
  gonorrhea:  { icon: '⚠️', iconBg: 'bg-rose-50',   accent: 'border-rose-200'   },
  syphilis:   { icon: '🔬', iconBg: 'bg-amber-50',  accent: 'border-amber-200'  },
  hepatitisB: { icon: '💉', iconBg: 'bg-green-50',  accent: 'border-green-200'  },
  hpv:        { icon: '🛡️', iconBg: 'bg-violet-50', accent: 'border-violet-200' },
  herpes:     { icon: '💊', iconBg: 'bg-indigo-50', accent: 'border-indigo-200' },
};

export default function SexualHealthPage() {
  const t = useTranslations('sexualHealth');

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] px-4 pt-10 pb-6 relative overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/hiv-test"
              className="w-9 h-9 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </Link>
            <div>
              <h1 className="font-black text-white text-xl leading-none">{t('title')}</h1>
              <p className="text-[11px] text-white/60 mt-0.5 font-medium">{t('subtitle')}</p>
            </div>
          </div>
          <p className="text-[13px] text-white/60 leading-relaxed font-medium">
            {t('description')}
          </p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* STI Grid */}
        <div className="grid grid-cols-2 gap-3">
          {STI_KEYS.map((key) => {
            const meta = STI_META[key];
            return (
              <Link
                key={key}
                href={`/hiv-test/sexual-health/${STI_SLUGS[key]}`}
                className={`bg-white rounded-2xl shadow-sm p-4 border-b-2 ${meta.accent} hover:shadow-md active:scale-[0.97] transition-all`}
              >
                <div className={`w-10 h-10 ${meta.iconBg} rounded-xl flex items-center justify-center mb-3 text-lg`}>
                  {meta.icon}
                </div>
                <p className="font-extrabold text-gray-800 text-[14px] leading-snug">{t(`stis.${key}.name`)}</p>
                <p className="text-[11px] text-gray-400 mt-1 leading-snug">{t(`stis.${key}.desc`)}</p>
                <div className="flex items-center gap-1 mt-3">
                  <span className="text-[11px] font-bold text-[#037561]">{t('learnMore')}</span>
                  <ChevronRight className="w-3 h-3 text-[#037561]" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Key Facts */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
            <h2 className="font-extrabold text-gray-800 text-[14px]">{t('keyFactsTitle')}</h2>
          </div>
          <div className="space-y-4">
            {([
              { key: 'f1', icon: AlertCircle, iconBg: 'bg-teal-100',  iconColor: 'text-teal-600'  },
              { key: 'f2', icon: Shield,       iconBg: 'bg-green-100', iconColor: 'text-green-600' },
              { key: 'f3', icon: Zap,          iconBg: 'bg-rose-100',  iconColor: 'text-rose-600'  },
            ] as const).map(({ key, icon: Icon, iconBg, iconColor }) => (
              <div key={key} className="flex gap-3">
                <div className={`w-9 h-9 ${iconBg} rounded-xl flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div>
                  <p className="font-extrabold text-gray-700 text-[13px]">{t(`facts.${key}title`)}</p>
                  <p className="text-[12px] text-gray-400 mt-0.5 leading-relaxed">{t(`facts.${key}desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#E6F3F0] border border-[#037561]/15 rounded-2xl p-4">
          <p className="font-extrabold text-[#037561] text-[14px] mb-1">{t('getTestedTitle')}</p>
          <p className="text-[12px] text-gray-500 leading-relaxed mb-3">{t('getTestedDesc')}</p>
          <Link
            href="/hiv-test/find-kits"
            className="flex items-center justify-center gap-2 w-full bg-[#037561] text-white rounded-xl py-2.5 font-bold text-[13px] hover:bg-[#025a49] active:scale-[0.98] transition-all"
          >
            {t('getTestedCta')}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
