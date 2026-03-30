'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowLeft, MapPin, Navigation, Phone, Clock, Building2, Package } from 'lucide-react';
import { api } from '@/lib/api';
import MapEmbed from '@/components/MapEmbed';
import { getGoogleMapsDirectionsUrl, hasValidCoordinates } from '@/lib/parseGoogleMapsUrl';
import type { Pharmacy } from '@/types';

const KIT_STYLES: Record<string, { label: string }> = {
  ORAL_SALIVA:   { label: 'ORAQuick · Oral Swab'    },
  FINGER_PRICK:  { label: 'Alere Determine · Blood'  },
  COMBO_ANTIGEN: { label: '4th Gen Combo · Blood'    },
};

const KIT_DOT_COLORS: Record<string, string> = {
  ORAL_SALIVA:   'bg-[#037561]',
  FINGER_PRICK:  'bg-teal-500',
  COMBO_ANTIGEN: 'bg-amber-400',
};

const KIT_PRICE_COLORS: Record<string, string> = {
  ORAL_SALIVA:   'text-[#037561]',
  FINGER_PRICK:  'text-teal-600',
  COMBO_ANTIGEN: 'text-amber-600',
};

const STOCK_META: Record<string, { label: string; color: string; bg: string }> = {
  AVAILABLE:    { label: 'In Stock',     color: 'text-green-700',  bg: 'bg-green-50'  },
  LOW_STOCK:    { label: 'Low Stock',    color: 'text-amber-600',  bg: 'bg-amber-50'  },
  OUT_OF_STOCK: { label: 'Out of Stock', color: 'text-red-500',    bg: 'bg-red-50'    },
};

export default function PharmacyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: pharmacy, isLoading } = useQuery<Pharmacy>({
    queryKey: ['pharmacy', resolvedParams.id],
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

  if (!pharmacy) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="w-16 h-16 bg-[#E6F3F0] rounded-3xl flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-[#037561]" />
        </div>
        <p className="font-black text-slate-500">Pharmacy not found</p>
        <Link href="/hiv-test/find-kits" className="mt-4 text-sm text-[#037561] font-black underline underline-offset-2">
          Back to list
        </Link>
      </div>
    );
  }

  const hours = pharmacy.hoursJson as Record<string, string> | null;
  const hasCoords = hasValidCoordinates(pharmacy.latitude, pharmacy.longitude);
  const navigateHref = hasCoords ? getGoogleMapsDirectionsUrl(pharmacy.latitude, pharmacy.longitude) : null;

  return (
    <div className="pb-28">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] text-white px-5 pt-12 pb-6 relative overflow-hidden">
        <div className="relative">
          <Link
            href="/hiv-test/find-kits"
            className="inline-flex items-center justify-center w-9 h-9 bg-white/20 rounded-2xl mb-5 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </Link>

          <div className="w-14 h-14 bg-white/20 rounded-3xl flex items-center justify-center mb-4">
            <Building2 className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-[1.5rem] font-black leading-tight mb-1.5">{pharmacy.name}</h1>
          <div className="flex items-center gap-1.5 text-sm text-white/60 mb-5 font-medium">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="leading-snug">{pharmacy.address}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {pharmacy.distanceKm != null && (
              <span className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 text-sm font-medium">
                <MapPin className="w-3 h-3" />
                {pharmacy.distanceKm.toFixed(1)} km away
              </span>
            )}
            <span className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-black ${
              pharmacy.isOpen ? 'bg-green-400/25 text-green-100' : 'bg-white/10 text-white/60'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${pharmacy.isOpen ? 'bg-green-400' : 'bg-white/40'}`} />
              {pharmacy.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* Map */}
        {hasCoords && (
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <MapEmbed lat={pharmacy.latitude} lng={pharmacy.longitude} height={200} />
          </div>
        )}

        {/* Contact & Hours */}
        <div className="bg-white rounded-3xl shadow-card overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 pt-4 pb-3 border-b border-slate-50">
            <div className="w-8 h-8 bg-[#E6F3F0] rounded-2xl flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-[#037561]" />
            </div>
            <h2 className="font-black text-slate-800 text-[14px]">Contact &amp; Hours</h2>
          </div>

          <div className="px-4 pb-2">
            {pharmacy.phone && (
              <div className="flex items-center justify-between py-3 border-b border-slate-50">
                <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                  <Phone className="w-3.5 h-3.5 text-slate-300" />
                  Phone
                </div>
                <a href={`tel:${pharmacy.phone}`} className="text-sm font-black text-[#037561] hover:text-[#025a49] transition-colors">
                  {pharmacy.phone}
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
              <p className="text-xs text-slate-400 py-3 font-medium">Hours not available</p>
            )}
          </div>
        </div>

        {/* Available Kits */}
        {pharmacy.testKits && pharmacy.testKits.length > 0 && (
          <div className="bg-white rounded-3xl shadow-card overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 pt-4 pb-3 border-b border-slate-50">
              <div className="w-8 h-8 bg-[#E6F3F0] rounded-2xl flex items-center justify-center shrink-0">
                <Package className="w-4 h-4 text-[#037561]" />
              </div>
              <h2 className="font-black text-slate-800 text-[14px]">Available Self-Test Kits</h2>
            </div>

            <div className="px-4 pb-2 divide-y divide-slate-50">
              {pharmacy.testKits.map((pk) => {
                const style = KIT_STYLES[pk.kit.type] ?? { label: 'Unknown' };
                const dotColor = KIT_DOT_COLORS[pk.kit.type] ?? 'bg-slate-400';
                const priceColor = KIT_PRICE_COLORS[pk.kit.type] ?? 'text-slate-800';
                const stock = STOCK_META[pk.stockLevel] ?? { label: 'Unknown', color: 'text-slate-400', bg: 'bg-slate-50' };

                return (
                  <div key={pk.id} className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
                      <div className="min-w-0">
                        <div className="text-sm font-black text-slate-800 truncate">{pk.kit.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5 font-medium">{style.label}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <div className={`text-sm font-black ${priceColor}`}>{pk.priceETB} ETB</div>
                      <div className={`text-xs font-black mt-0.5 ${stock.color}`}>{stock.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white/95 backdrop-blur border-t border-slate-100 px-4 py-4 flex gap-3 z-20">
        {navigateHref ? (
          <a
            href={navigateHref}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#037561] text-white rounded-3xl py-3.5 font-black text-[14px] hover:bg-[#025a49] active:scale-[0.98] transition-all shadow-brand"
          >
            <Navigation className="w-4 h-4" />
            Navigate Here
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="flex-1 flex items-center justify-center gap-2 bg-slate-200 text-slate-400 rounded-3xl py-3.5 font-black text-[14px] cursor-not-allowed"
          >
            <Navigation className="w-4 h-4" />
            Navigate Here
          </button>
        )}
        {pharmacy.phone ? (
          <a
            href={`tel:${pharmacy.phone}`}
            className="px-5 border-2 border-[#E6F3F0] text-[#037561] rounded-3xl py-3.5 font-black text-[14px] hover:bg-[#E6F3F0] active:scale-[0.98] transition-all"
          >
            Call
          </a>
        ) : (
          <Link
            href="/hiv-test/find-kits"
            className="px-5 border-2 border-[#E6F3F0] text-[#037561] rounded-3xl py-3.5 font-black text-[14px] hover:bg-[#E6F3F0] active:scale-[0.98] transition-all"
          >
            Back
          </Link>
        )}
      </div>
    </div>
  );
}
