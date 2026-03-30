'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, MapPin, Navigation, Building2, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';
import { getGoogleMapsDirectionsUrl, hasValidCoordinates } from '@/lib/parseGoogleMapsUrl';
import type { Pharmacy } from '@/types';

export default function FindKitsPage() {
  const [search, setSearch] = useState('');
  const t = useTranslations('findKits');

  const { data: pharmacies = [], isLoading } = useQuery<Pharmacy[]>({
    queryKey: ['pharmacies', search],
    queryFn: () => api.get(`/pharmacies?search=${encodeURIComponent(search)}`).then((r) => r.data),
  });

  return (
    <div className="pb-8">
      {/* Gradient header */}
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] px-4 pt-12 pb-5 sticky top-0 z-10 overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/hiv-test"
              className="w-9 h-9 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="font-black text-white text-lg leading-tight">{t('title')}</h1>
              <p className="text-[11px] text-white/60 font-medium">{t('subtitle')}</p>
            </div>
            {!isLoading && pharmacies.length > 0 && (
              <span className="bg-white/20 text-white text-xs font-black px-2.5 py-1 rounded-full shrink-0">
                {t('found', { count: pharmacies.length })}
              </span>
            )}
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              className="w-full bg-white rounded-2xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#037561]/30 shadow-sm placeholder:text-slate-400 font-medium"
              placeholder={t('searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3 text-slate-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-4 shadow-card animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-slate-100 rounded-2xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-slate-100 rounded-full w-3/4" />
                  <div className="h-3 bg-slate-100 rounded-full w-1/2" />
                </div>
                <div className="w-14 h-6 bg-slate-100 rounded-full shrink-0" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 h-10 bg-slate-100 rounded-2xl" />
                <div className="flex-1 h-10 bg-slate-100 rounded-2xl" />
              </div>
            </div>
          ))
        ) : pharmacies.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#E6F3F0] rounded-3xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-[#037561]" />
            </div>
            <p className="font-black text-slate-600 text-[15px]">{t('noFound')}</p>
            <p className="text-[13px] text-slate-400 mt-1 font-medium">{t('noFoundSub')}</p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="mt-4 text-[13px] text-[#037561] font-black underline underline-offset-2"
              >
                {t('clearSearch')}
              </button>
            )}
          </div>
        ) : (
          pharmacies.map((pharmacy) => (
            <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
          ))
        )}
      </div>
    </div>
  );
}

function PharmacyCard({ pharmacy }: { pharmacy: Pharmacy }) {
  const t = useTranslations('findKits');
  const tc = useTranslations('common');

  const hasKits = pharmacy.testKits?.some((k) => k.inStock);
  const minPrice = pharmacy.testKits?.length
    ? Math.min(...pharmacy.testKits.map((k) => k.priceETB))
    : null;
  const maxPrice = pharmacy.testKits?.length
    ? Math.max(...pharmacy.testKits.map((k) => k.priceETB))
    : null;
  const priceLabel =
    minPrice != null && maxPrice != null
      ? minPrice === maxPrice
        ? `${minPrice} ETB`
        : `${minPrice}–${maxPrice} ETB`
      : null;
  const navigateHref = hasValidCoordinates(pharmacy.latitude, pharmacy.longitude)
    ? getGoogleMapsDirectionsUrl(pharmacy.latitude, pharmacy.longitude)
    : null;

  return (
    <div className="bg-white rounded-3xl shadow-card overflow-hidden">
      <div className="p-4">
        {/* Top row */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-[#E6F3F0] rounded-2xl flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-[#037561]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-black text-slate-800 text-[14px] leading-snug truncate">{pharmacy.name}</div>
            <div className="text-xs text-slate-400 mt-0.5 font-medium truncate">{pharmacy.address}</div>
          </div>
          <span className={`shrink-0 text-xs font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
            pharmacy.isOpen ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${pharmacy.isOpen ? 'bg-green-500' : 'bg-slate-300'}`} />
            {pharmacy.isOpen ? tc('open') : tc('closed')}
          </span>
        </div>

        {/* Meta chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {pharmacy.distanceKm != null && (
            <span className="flex items-center gap-1 bg-slate-50 text-slate-500 text-xs px-2 py-1 rounded-xl font-medium">
              <MapPin className="w-3 h-3 text-[#037561]" />
              {pharmacy.distanceKm.toFixed(1)} km
            </span>
          )}
          {hasKits ? (
            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-xl font-black">
              {t('kitsInStock')}
            </span>
          ) : (
            <span className="bg-red-50 text-red-400 text-xs px-2 py-1 rounded-xl font-medium">
              {t('noKits')}
            </span>
          )}
          {!pharmacy.isOpen && (
            <span className="bg-slate-50 text-slate-400 text-xs px-2 py-1 rounded-xl font-medium">{t('opens')}</span>
          )}
          {priceLabel && (
            <span className="bg-[#E6F3F0] text-[#037561] text-xs px-2 py-1 rounded-xl font-black">
              {priceLabel}
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Link
            href={`/hiv-test/find-kits/${pharmacy.id}`}
            className="flex-1 text-center border-2 border-[#E6F3F0] text-[#037561] rounded-2xl py-2.5 text-[13px] font-black hover:bg-[#E6F3F0] active:scale-[0.97] transition-all"
          >
            {t('viewDetails')}
          </Link>
          {navigateHref ? (
            <a
              href={navigateHref}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 bg-[#037561] text-white rounded-2xl py-2.5 text-[13px] font-black hover:bg-[#025a49] active:scale-[0.97] transition-all"
            >
              <Navigation className="w-3.5 h-3.5" />
              {t('navigate')}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 bg-slate-200 text-slate-400 rounded-2xl py-2.5 text-[13px] font-black cursor-not-allowed"
            >
              <Navigation className="w-3.5 h-3.5" />
              {t('navigate')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
