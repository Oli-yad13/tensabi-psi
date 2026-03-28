'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, MapPin, Navigation } from 'lucide-react';
import { api } from '@/lib/api';
import type { Pharmacy } from '@/types';

export default function FindKitsPage() {
  const [search, setSearch] = useState('');

  const { data: pharmacies = [], isLoading } = useQuery<Pharmacy[]>({
    queryKey: ['pharmacies', search],
    queryFn: () => api.get(`/pharmacies?search=${search}`).then((r) => r.data),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/hiv-test" className="text-gray-500 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-gray-800 text-lg">Find Test Kits</h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Search pharmacy or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* List */}
      <div className="px-5 py-4 space-y-3">
        {isLoading ? (
          <div className="text-center text-gray-400 py-10">Loading...</div>
        ) : pharmacies.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No pharmacies found.</div>
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
  const hasKits = pharmacy.testKits?.some((k) => k.inStock);
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="font-semibold text-gray-800">{pharmacy.name}</div>
          <div className="text-xs text-gray-400">{pharmacy.address}</div>
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            pharmacy.isOpen ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
          }`}
        >
          {pharmacy.isOpen ? 'Open' : 'Closed'}
        </span>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
        {pharmacy.distanceKm != null && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {pharmacy.distanceKm.toFixed(1)} km
          </span>
        )}
        {hasKits && (
          <span className="text-green-600 font-medium">✓ Kits Available</span>
        )}
        {pharmacy.testKits && pharmacy.testKits.length > 0 && (
          <span>
            {Math.min(...pharmacy.testKits.map((k) => k.priceETB))}–
            {Math.max(...pharmacy.testKits.map((k) => k.priceETB))} ETB
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          href={`/hiv-test/find-kits/${pharmacy.id}`}
          className="flex-1 text-center border border-purple-300 text-purple-600 rounded-xl py-2 text-sm font-medium hover:bg-purple-50 transition"
        >
          Details
        </Link>
        <button className="flex-1 flex items-center justify-center gap-1 bg-purple-600 text-white rounded-xl py-2 text-sm font-medium hover:bg-purple-700 transition">
          <Navigation className="w-3.5 h-3.5" />
          Navigate
        </button>
      </div>
    </div>
  );
}
