'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { Plus, Search, Pencil, Trash2, MapPin } from 'lucide-react';
import { api } from '@/lib/api';
import type { Pharmacy } from '@/types';

export default function AdminPharmaciesPage() {
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const qc = useQueryClient();

  const { data: pharmacies = [], isLoading } = useQuery<Pharmacy[]>({
    queryKey: ['pharmacies', search],
    queryFn: () => api.get(`/pharmacies?search=${search}`).then((r) => r.data),
  });

  const { mutate: remove } = useMutation({
    mutationFn: (id: string) => api.delete(`/pharmacies/${id}`),
    onSuccess: () => { setDeleting(null); qc.invalidateQueries({ queryKey: ['pharmacies'] }); },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Pharmacies</h1>
          <p className="text-sm text-slate-500 mt-1">Manage pharmacies stocking ORAQuick kits</p>
        </div>
        <Link
          href="/admin/pharmacies/new"
          className="flex items-center gap-2 bg-[#037561] text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-[#024d40] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Pharmacy
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BA899]"
          placeholder="Search pharmacies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left border-b border-slate-100">
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Pharmacy</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Kits</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-3.5 bg-slate-100 rounded-full w-40" /></td>
                  <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded-full w-32" /></td>
                  <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded-full w-24" /></td>
                  <td className="px-6 py-4"><div className="h-5 bg-slate-100 rounded-full w-16" /></td>
                  <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded-full w-10" /></td>
                  <td className="px-6 py-4" />
                </tr>
              ))
            ) : pharmacies.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-slate-200" />
                  <p className="font-semibold text-sm">No pharmacies found</p>
                  <Link href="/admin/pharmacies/new" className="text-xs text-[#037561] font-bold mt-2 inline-block hover:text-purple-800">
                    + Add the first one
                  </Link>
                </td>
              </tr>
            ) : (
              pharmacies.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800">{p.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{p.city}</div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs max-w-[200px] truncate">{p.address}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{p.phone ?? '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.isOpen ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                      {p.isOpen ? 'Open' : 'Closed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {p.testKits?.length ?? 0} kit{(p.testKits?.length ?? 0) !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/pharmacies/${p.id}/edit`}
                        className="flex items-center gap-1.5 text-xs font-bold text-[#037561] hover:text-purple-800 px-2.5 py-1.5 rounded-lg hover:bg-[#E6F3F0] transition-all"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </Link>
                      {deleting === p.id ? (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500">Confirm?</span>
                          <button onClick={() => remove(p.id)} className="text-red-600 font-bold hover:text-red-800">Yes</button>
                          <button onClick={() => setDeleting(null)} className="text-slate-500 font-bold hover:text-slate-700">No</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleting(p.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!isLoading && pharmacies.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-50 text-xs text-slate-400 font-medium">
            {pharmacies.length} pharmac{pharmacies.length !== 1 ? 'ies' : 'y'} total
          </div>
        )}
      </div>
    </div>
  );
}
