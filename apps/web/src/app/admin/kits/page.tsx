'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import { api } from '@/lib/api';

const KIT_TYPE_LABELS: Record<string, string> = {
  ORAL_SALIVA: 'Oral / Saliva',
  FINGER_PRICK: 'Finger-Prick',
  COMBO_ANTIGEN: 'Combo Antigen',
};
const SAMPLE_LABELS: Record<string, string> = {
  ORAL: 'Oral',
  BLOOD: 'Blood',
  BOTH: 'Oral + Blood',
};

export default function AdminKitsPage() {
  const [deleting, setDeleting] = useState<string | null>(null);
  const qc = useQueryClient();

  const { data: kits = [], isLoading } = useQuery<any[]>({
    queryKey: ['kits'],
    queryFn: () => api.get('/kits').then((r) => r.data),
  });

  const { mutate: remove } = useMutation({
    mutationFn: (id: string) => api.delete(`/kits/${id}`),
    onSuccess: () => { setDeleting(null); qc.invalidateQueries({ queryKey: ['kits'] }); },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800">Test Kits</h1>
          <p className="text-sm text-slate-500 mt-1">Manage the test kit catalog</p>
        </div>
        <Link
          href="/admin/kits/new"
          className="flex items-center gap-2 bg-[#037561] text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-[#024d40] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Kit
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left border-b border-slate-100">
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Kit Name</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Sample</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Price (ETB)</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Locations</th>
              <th className="px-6 py-3.5 text-xs font-extrabold text-slate-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-3.5 bg-slate-100 rounded-full w-40" /></td>
                  <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded-full w-24" /></td>
                  <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded-full w-16" /></td>
                  <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded-full w-20" /></td>
                  <td className="px-6 py-4"><div className="h-3 bg-slate-100 rounded-full w-10" /></td>
                  <td className="px-6 py-4" />
                </tr>
              ))
            ) : kits.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-slate-400">
                  <Package className="w-8 h-8 mx-auto mb-3 text-slate-200" />
                  <p className="font-semibold text-sm">No test kits yet</p>
                  <Link href="/admin/kits/new" className="text-xs text-[#037561] font-bold mt-2 inline-block hover:text-purple-800">
                    + Add the first one
                  </Link>
                </td>
              </tr>
            ) : (
              kits.map((k) => (
                <tr key={k.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 font-semibold text-slate-800">{k.name}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E6F3F0] text-[#037561]">
                      {KIT_TYPE_LABELS[k.type] ?? k.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{SAMPLE_LABELS[k.sampleType] ?? k.sampleType}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {k.minPriceETB === k.maxPriceETB
                      ? `${k.minPriceETB} ETB`
                      : `${k.minPriceETB}–${k.maxPriceETB} ETB`}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {k.pharmacies?.length ?? 0} location{(k.pharmacies?.length ?? 0) !== 1 ? 's' : ''}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/kits/${k.id}/edit`}
                        className="flex items-center gap-1.5 text-xs font-bold text-[#037561] hover:text-purple-800 px-2.5 py-1.5 rounded-lg hover:bg-[#E6F3F0] transition-all"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </Link>
                      {deleting === k.id ? (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-500">Confirm?</span>
                          <button onClick={() => remove(k.id)} className="text-red-600 font-bold hover:text-red-800">Yes</button>
                          <button onClick={() => setDeleting(null)} className="text-slate-500 font-bold hover:text-slate-700">No</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleting(k.id)}
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
        {!isLoading && kits.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-50 text-xs text-slate-400 font-medium">
            {kits.length} kit{kits.length !== 1 ? 's' : ''} total
          </div>
        )}
      </div>
    </div>
  );
}
