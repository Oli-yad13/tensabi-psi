'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowLeft, Phone, Clock, MapPin, Navigation } from 'lucide-react';
import { api } from '@/lib/api';
import type { Pharmacy } from '@/types';

const KIT_TYPE_LABELS: Record<string, string> = {
  ORAL_SALIVA: 'Oral (Saliva)',
  FINGER_PRICK: 'Finger-Prick',
  COMBO_ANTIGEN: 'Combo Antigen',
};

const STOCK_COLORS: Record<string, string> = {
  AVAILABLE: 'text-green-600',
  LOW_STOCK: 'text-yellow-500',
  OUT_OF_STOCK: 'text-red-500',
};

export default function PharmacyDetailPage({ params }: { params: { id: string } }) {
  const { data: pharmacy, isLoading } = useQuery<Pharmacy>({
    queryKey: ['pharmacy', params.id],
    queryFn: () => api.get(`/pharmacies/${params.id}`).then((r) => r.data),
  });

  if (isLoading) return <div className="p-8 text-center text-gray-400">Loading...</div>;
  if (!pharmacy) return <div className="p-8 text-center text-red-400">Not found.</div>;

  const hours = pharmacy.hoursJson as Record<string, string> | null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-purple-700 text-white px-5 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/hiv-test/find-kits" className="text-purple-200 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="bg-purple-600 rounded-2xl p-4 mb-1">
          <div className="text-xs text-purple-200 mb-1">💊</div>
          <h1 className="text-xl font-bold">{pharmacy.name}</h1>
          <div className="flex items-center gap-1 text-sm text-purple-200 mt-1">
            <MapPin className="w-3.5 h-3.5" />
            {pharmacy.address}
          </div>
          <div className="mt-3 flex gap-2">
            <button className="flex-1 bg-purple-500 rounded-xl py-2 text-sm font-medium hover:bg-purple-400 transition flex items-center justify-center gap-1">
              <Navigation className="w-3.5 h-3.5" /> Navigate Here
            </button>
            <button className="bg-purple-500 rounded-xl px-4 py-2 text-sm font-medium hover:bg-purple-400 transition">
              Save
            </button>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 space-y-4">
        {/* Contact & Hours */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-semibold text-gray-700 mb-3">Contact &amp; Hours</h2>
          {pharmacy.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Phone className="w-4 h-4 text-gray-400" />
              {pharmacy.phone}
            </div>
          )}
          {hours &&
            Object.entries(hours).map(([day, time]) => (
              <div key={day} className="flex justify-between text-sm text-gray-500 py-0.5">
                <span className="capitalize">{day}</span>
                <span>{time}</span>
              </div>
            ))}
        </div>

        {/* Available Kits */}
        {pharmacy.testKits && pharmacy.testKits.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-gray-700 mb-3">Available Self-Test Kits</h2>
            <div className="space-y-3">
              {pharmacy.testKits.map((pk) => (
                <div key={pk.id} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-800">{pk.kit.name}</div>
                    <div className="text-xs text-gray-400">{KIT_TYPE_LABELS[pk.kit.type] ?? pk.kit.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-800">{pk.priceETB} ETB</div>
                    <div className={`text-xs font-medium ${STOCK_COLORS[pk.stockLevel]}`}>
                      {pk.stockLevel === 'LOW_STOCK' ? 'Low Stock' : pk.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
