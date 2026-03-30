import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, BookOpen, ClipboardList, FileText,
  ShieldCheck, ChevronRight, MessageCircle, Users, PlayCircle, FlaskConical,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HivTestHome() {
  const t = useTranslations('hivTest');
  const tc = useTranslations('common');
  const tt = useTranslations('testingCenters');
  const headline = t('headline').split('\n');

  return (
    <div className="pb-10">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#025a49] to-[#037561] px-5 pt-12 pb-10">
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-bold text-white/80 tracking-wide">{t('tagline')}</span>
          </div>
          <LanguageSwitcher variant="compact" />
        </div>

        <h1 className="text-[2.1rem] font-black text-white leading-[1.05] tracking-tight mb-3">
          {headline.map((line, i) => (
            <span key={i}>{line}{i < headline.length - 1 && <br />}</span>
          ))}
        </h1>
        <p className="text-[13px] text-white/50 mb-7 leading-relaxed font-medium max-w-[220px]">
          {t('description')}
        </p>

        <div className="flex gap-2">
          {[
            { value: '99%',  key: 'accuracy'   },
            { value: tc('free'), key: 'guidance' },
          ].map((s) => (
            <div key={s.key} className="flex-1 bg-white/10 rounded-xl px-2 py-2.5 text-center">
              <div className="text-[1rem] font-black text-white leading-none">{s.value}</div>
              <div className="text-[9px] text-white/40 mt-1 font-bold uppercase tracking-wider">
                {t(`stats.${s.key}`)}
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://zemengebeya.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-3 bg-white/15 border border-white/20 rounded-xl px-4 py-3 active:scale-[0.98] transition-all"
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
            <Image src="/zemen-gebya-logo.jpg" alt="Zemen Gebya" width={32} height={32} className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-white text-[13px] leading-none">{t('shopZemenGebya')}</p>
            <p className="text-[11px] text-white/50 mt-0.5 font-medium">zemengebeya.com</p>
          </div>
          <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />
        </a>
      </div>

      <div className="px-4 pt-5 space-y-3">

        {/* Primary actions */}
        <Link
          href="/hiv-test/find-kits"
          className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm active:scale-[0.98] transition-all"
        >
          <div className="w-10 h-10 bg-[#E6F3F0] rounded-lg flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[#037561]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 text-[15px] leading-snug">{t('primaryActions.findKits')}</p>
            <p className="text-[12px] text-slate-400 mt-0.5 font-medium">{t('primaryActions.findKitsSub')}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
        </Link>

        <Link
          href="/hiv-test/how-it-works"
          className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm active:scale-[0.98] transition-all"
        >
          <div className="w-10 h-10 bg-[#E6F3F0] rounded-lg flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-[#037561]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 text-[15px] leading-snug">{t('primaryActions.howItWorks')}</p>
            <p className="text-[12px] text-slate-400 mt-0.5 font-medium">{t('primaryActions.howItWorksSub')}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
        </Link>

        <Link
          href="/hiv-test/testing-centers"
          className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm active:scale-[0.98] transition-all"
        >
          <div className="w-10 h-10 bg-[#E6F3F0] rounded-lg flex items-center justify-center shrink-0">
            <FlaskConical className="w-5 h-5 text-[#037561]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-800 text-[15px] leading-snug">{tt('title')}</p>
            <p className="text-[12px] text-slate-400 mt-0.5 font-medium">{tt('subtitle')}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
        </Link>

        {/* Secondary 2-col */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/hiv-test/how-to-use"
            className="bg-white rounded-xl p-4 shadow-sm active:scale-[0.97] transition-all"
          >
            <div className="w-9 h-9 bg-[#E6F3F0] rounded-lg flex items-center justify-center mb-3">
              <ClipboardList className="w-4 h-4 text-[#037561]" />
            </div>
            <p className="font-bold text-slate-800 text-[13px] leading-snug">{t('secondaryActions.howToUse')}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">{t('secondaryActions.howToUseSub')}</p>
          </Link>

          <Link
            href="/hiv-test/results"
            className="bg-white rounded-xl p-4 shadow-sm active:scale-[0.97] transition-all"
          >
            <div className="w-9 h-9 bg-[#E6F3F0] rounded-lg flex items-center justify-center mb-3">
              <FileText className="w-4 h-4 text-[#037561]" />
            </div>
            <p className="font-bold text-slate-800 text-[13px] leading-snug">{t('secondaryActions.readResults')}</p>
            <p className="text-[11px] text-slate-400 mt-1 font-medium">{t('secondaryActions.readResultsSub')}</p>
          </Link>
        </div>

        {/* Support section */}
        <div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-3 px-1">
            {t('support.sectionTitle')}
          </p>
          <div className="space-y-2">
            {([
              { href: '/hiv-test/chat',      icon: MessageCircle, labelKey: 'chat',      subKey: 'chatSub'      },
              { href: '/hiv-test/community', icon: Users,         labelKey: 'community', subKey: 'communitySub' },
              { href: '/hiv-test/learn',     icon: PlayCircle,    labelKey: 'learn',     subKey: 'learnSub'     },
            ] as const).map(({ href, icon: Icon, labelKey, subKey }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm active:scale-[0.98] transition-all"
              >
                <div className="w-8 h-8 bg-[#E6F3F0] rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#037561]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-[13px] leading-snug">{t(`support.${labelKey}`)}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{t(`support.${subKey}`)}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Privacy note */}
        <div className="flex items-start gap-3 bg-[#E6F3F0] border border-[#037561]/10 rounded-xl p-4">
          <ShieldCheck className="w-4 h-4 text-[#037561] shrink-0 mt-0.5" />
          <p className="text-[12px] text-slate-600 leading-relaxed">
            <span className="font-bold text-[#037561]">{tc('privacyNote')} </span>
            {tc('privacyDetail')}
          </p>
        </div>

      </div>
    </div>
  );
}
