'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Eye,
  ChevronRight,
  Star,
  Shield,
  Zap,
  AlertCircle,
  Bug,
  AlertTriangle,
  Microscope,
  Syringe,
  ShieldPlus,
  Pill,
  type LucideIcon,
} from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
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
const STI_META: Record<string, { icon: LucideIcon; iconBg: string; iconColor: string; accent: string }> = {
  chlamydia:  { icon: Bug,           iconBg: 'bg-blue-50',   iconColor: 'text-blue-600',   accent: 'border-blue-200'   },
  gonorrhea:  { icon: AlertTriangle, iconBg: 'bg-rose-50',   iconColor: 'text-rose-600',   accent: 'border-rose-200'   },
  syphilis:   { icon: Microscope,    iconBg: 'bg-amber-50',  iconColor: 'text-amber-600',  accent: 'border-amber-200'  },
  hepatitisB: { icon: Syringe,       iconBg: 'bg-green-50',  iconColor: 'text-green-600',  accent: 'border-green-200'  },
  hpv:        { icon: ShieldPlus,    iconBg: 'bg-violet-50', iconColor: 'text-violet-600', accent: 'border-violet-200' },
  herpes:     { icon: Pill,          iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', accent: 'border-indigo-200' },
};

export default function LearnPage() {
  const t = useTranslations('learn');
  const ts = useTranslations('sexualHealth');
  const [tab, setTab] = useState<'videos' | 'stis'>('videos');

  const FEATURED_VIDEOS = [
    { videoId: '0_fsNp6fXHM', title: t('videos.v1title'), channel: t('videos.v1channel'), badge: 'ORAQuick', isNew: true  },
    { videoId: '4QnXVCHORLs', title: t('videos.v2title'), channel: t('videos.v2channel'), badge: 'ORAQuick', isNew: false },
  ];

  const COMING_SOON = [
    { title: t('videos.cs1title'), subtitle: t('videos.cs1sub') },
    { title: t('videos.cs2title'), subtitle: t('videos.cs2sub') },
    { title: t('videos.cs3title'), subtitle: t('videos.cs3sub') },
    { title: t('videos.cs4title'), subtitle: t('videos.cs4sub') },
  ];

  return (
    <div className="pb-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] px-4 pt-10 pb-0 relative overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/hiv-test"
              className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </Link>
            <div>
              <h1 className="font-black text-white text-xl leading-none">{t('title')}</h1>
              <p className="text-[11px] text-white/60 mt-0.5 font-medium">{t('subtitle')}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/10 rounded-lg p-1 mb-0">
            <button
              onClick={() => setTab('videos')}
              className={`flex-1 py-2 rounded-md text-[13px] font-bold transition-all ${
                tab === 'videos' ? 'bg-white text-[#037561]' : 'text-white/70'
              }`}
            >
              {t('tabVideos')}
            </button>
            <button
              onClick={() => setTab('stis')}
              className={`flex-1 py-2 rounded-md text-[13px] font-bold transition-all ${
                tab === 'stis' ? 'bg-white text-[#037561]' : 'text-white/70'
              }`}
            >
              {ts('title')}
            </button>
          </div>
        </div>
      </div>

      {/* Videos tab */}
      {tab === 'videos' && (
        <div className="px-4 pt-4 space-y-4 bg-[#F5FAF9] pb-4">
          {FEATURED_VIDEOS.map((v) => (
            <div key={v.videoId}>
              {v.isNew && (
                <div className="flex items-center gap-2 mb-2 px-1">
                  <span className="bg-[#037561] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full">{t('newBadge')}</span>
                </div>
              )}
              <VideoPlayer videoId={v.videoId} title={v.title} channel={v.channel} badge={v.badge} />
            </div>
          ))}

          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.12em] px-1 pt-2">{t('comingSoonLabel')}</p>
          <div className="space-y-2">
            {COMING_SOON.map((video) => (
              <div key={video.title} className="bg-white rounded-xl shadow-sm flex overflow-hidden opacity-60">
                <div className="bg-gradient-to-br from-[#037561] to-[#025a49] w-20 shrink-0 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white/70" />
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <p className="font-bold text-slate-700 text-[13px] leading-snug">{video.title}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{video.subtitle}</p>
                  <span className="text-[11px] font-bold text-slate-300 mt-1.5 block">{t('comingSoonLabel')}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#E6F3F0] rounded-xl p-4 text-[12px] text-slate-500 leading-relaxed text-center">
            {t('disclaimer')}
          </div>
        </div>
      )}

      {/* STIs tab */}
      {tab === 'stis' && (
        <div className="px-4 pt-4 space-y-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {STI_KEYS.map((key) => {
              const meta = STI_META[key];
              const Icon = meta.icon;
              return (
                <Link
                  key={key}
                  href={`/hiv-test/sexual-health/${STI_SLUGS[key]}`}
                  className={`bg-white rounded-xl shadow-sm p-4 border-b-2 ${meta.accent} hover:shadow-md active:scale-[0.97] transition-all`}
                >
                  <div className={`w-9 h-9 ${meta.iconBg} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className={`w-4.5 h-4.5 ${meta.iconColor}`} strokeWidth={2.2} />
                  </div>
                  <p className="font-extrabold text-slate-800 text-[13px] leading-snug">{ts(`stis.${key}.name`)}</p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{ts(`stis.${key}.desc`)}</p>
                  <div className="flex items-center gap-1 mt-2.5">
                    <span className="text-[11px] font-bold text-[#037561]">{ts('learnMore')}</span>
                    <ChevronRight className="w-3 h-3 text-[#037561]" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <h2 className="font-extrabold text-slate-800 text-[14px]">{ts('keyFactsTitle')}</h2>
            </div>
            <div className="space-y-4">
              {([
                { key: 'f1', icon: AlertCircle, iconBg: 'bg-teal-50',  iconColor: 'text-teal-600'  },
                { key: 'f2', icon: Shield,       iconBg: 'bg-green-50', iconColor: 'text-green-600' },
                { key: 'f3', icon: Zap,          iconBg: 'bg-rose-50',  iconColor: 'text-rose-600'  },
              ] as const).map(({ key, icon: Icon, iconBg, iconColor }) => (
                <div key={key} className="flex gap-3">
                  <div className={`w-9 h-9 ${iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-700 text-[13px]">{ts(`facts.${key}title`)}</p>
                    <p className="text-[12px] text-slate-400 mt-0.5 leading-relaxed">{ts(`facts.${key}desc`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#E6F3F0] border border-[#037561]/15 rounded-xl p-4">
            <p className="font-extrabold text-[#037561] text-[14px] mb-1">{ts('getTestedTitle')}</p>
            <p className="text-[12px] text-slate-500 leading-relaxed mb-3">{ts('getTestedDesc')}</p>
            <Link
              href="/hiv-test/testing-centers"
              className="flex items-center justify-center gap-2 w-full bg-[#037561] text-white rounded-lg py-2.5 font-bold text-[13px] hover:bg-[#025a49] active:scale-[0.98] transition-all"
            >
              {ts('getTestedCta')}
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
