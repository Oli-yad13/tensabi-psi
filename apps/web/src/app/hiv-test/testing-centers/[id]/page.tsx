'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowLeft, MapPin, Navigation, Phone, Clock, FlaskConical, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';
import MapEmbed from '@/components/MapEmbed';
import { getGoogleMapsDirectionsUrl, hasValidCoordinates } from '@/lib/parseGoogleMapsUrl';
import type { Pharmacy } from '@/types';

export default function TestingCenterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const t = useTranslations('testingCenters');
  const tc = useTranslations('common');
  const { data: center, isLoading } = useQuery<Pharmacy>({
    queryKey: ['testing-center', resolvedParams.id],
    queryFn: () => api.get(`/pharmacies/${resolvedParams.id}`).then((r) => r.data),
  });

  if (isLoading) {
    return (
      <div className="pb-8 animate-pulse">
        <div className="bg-gradient-to-br from-[#037561] to-[#025a49] px-5 pt-12 pb-6 h-52" />
        <div className="px-4 pt-4 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-3xl p-4 h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (!center) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 bg-[#E6F3F0] rounded-3xl flex items-center justify-center mb-4">
          <FlaskConical className="w-8 h-8 text-[#037561]" />
        </div>
        <p className="font-black text-slate-500">{t('notFound')}</p>
        <Link href="/hiv-test/testing-centers" className="mt-4 text-sm text-[#037561] font-black underline underline-offset-2">
          {t('backToList')}
        </Link>
      </div>
    );
  }

  const hours = center.hoursJson as Record<string, string> | null;
  const hasCoords = hasValidCoordinates(center.latitude, center.longitude);
  const navigateHref = hasCoords ? getGoogleMapsDirectionsUrl(center.latitude, center.longitude) : null;

  return (
    <div className="pb-28">
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] text-white px-5 pt-12 pb-6 relative overflow-hidden">
        <div className="relative">
          <Link
            href="/hiv-test/testing-centers"
            className="inline-flex items-center justify-center w-9 h-9 bg-white/20 rounded-2xl mb-5 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </Link>

          <div className="w-14 h-14 bg-white/20 rounded-3xl flex items-center justify-center mb-4">
            <FlaskConical className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-[1.5rem] font-black leading-tight mb-1.5">{center.name}</h1>
          <div className="flex items-center gap-1.5 text-sm text-white/60 mb-5 font-medium">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="leading-snug">{center.address}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {center.distanceKm != null && (
              <span className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 text-sm font-medium">
                <MapPin className="w-3 h-3" />
                {center.distanceKm.toFixed(1)} km away
              </span>
            )}
            <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-black ${
              center.isOpen ? 'bg-green-400/25 text-green-100' : 'bg-white/10 text-white/60'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${center.isOpen ? 'bg-green-400' : 'bg-white/40'}`} />
              {center.isOpen ? tc('open') : tc('closed')}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {hasCoords && (
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <MapEmbed lat={center.latitude} lng={center.longitude} height={200} />
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 pt-4 pb-3 border-b border-slate-50">
            <div className="w-8 h-8 bg-[#E6F3F0] rounded-2xl flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#037561]" />
            </div>
            <h2 className="font-black text-slate-800 text-[14px]">{t('contactAndHours')}</h2>
          </div>

          <div className="px-4 pb-2">
            {center.phone && (
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-300" />
                  Phone
                </div>
                <a href={`tel:${center.phone}`} className="text-sm font-black text-[#037561] hover:text-[#025a49] transition-colors">
                  {center.phone}
                </a>
              </div>
            )}

            {hours ? (
              Object.entries(hours).map(([day, time]) => (
                <div key={day} className="flex justify-between text-sm py-2.5 border-b border-slate-50 last:border-0">
                  <span className="text-slate-500 capitalize font-medium">{day}</span>
                  <span className="font-black text-slate-800">{time}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-3 font-medium">{t('hoursUnavailable')}</p>
            )}
          </div>
        </div>

        <div className="bg-[#E6F3F0] border border-[#037561]/10 rounded-3xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#037561]" />
            </div>
            <div>
              <p className="font-black text-[#037561] text-[14px]">{t('confirmatoryTitle')}</p>
              <p className="text-[13px] text-slate-600 mt-1 leading-relaxed font-medium">{t('confirmatoryBody')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white/95 backdrop-blur border-t border-slate-100 px-4 py-4 flex gap-3 z-20">
        {navigateHref ? (
          <a
            href={navigateHref}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#037561] text-white rounded-3xl py-3.5 font-black text-[14px] hover:bg-[#025a49] active:scale-[0.98] transition-all shadow-brand"
          >
            <Navigation className="w-4 h-4" />
            {t('navigateHere')}
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex-1 flex items-center justify-center gap-2 bg-slate-200 text-slate-400 rounded-3xl py-3.5 font-black text-[14px] cursor-not-allowed"
          >
            <Navigation className="w-4 h-4" />
            {t('navigateHere')}
          </button>
        )}
        {center.phone ? (
          <a
            href={`tel:${center.phone}`}
            className="px-5 border-2 border-[#E6F3F0] text-[#037561] rounded-3xl py-3.5 font-black text-[14px] hover:bg-[#E6F3F0] active:scale-[0.98] transition-all"
          >
            {t('call')}
          </a>
        ) : (
          <Link
            href="/hiv-test/testing-centers"
            className="px-5 border-2 border-[#E6F3F0] text-[#037561] rounded-3xl py-3.5 font-black text-[14px] hover:bg-[#E6F3F0] active:scale-[0.98] transition-all"
          >
            {t('backToList')}
          </Link>
        )}
      </div>
    </div>
  );
}
