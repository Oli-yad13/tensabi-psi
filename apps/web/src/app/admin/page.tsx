'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Building2, TrendingUp, Package, Plus, FlaskConical } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.get('/pharmacies/stats').then((r) => r.data),
  });

  const { data: kits = [] } = useQuery<any[]>({
    queryKey: ['kits'],
    queryFn: () => api.get('/kits').then((r) => r.data),
  });

  const { data: pharmacies = [] } = useQuery({
    queryKey: ['pharmacies'],
    queryFn: () => api.get('/pharmacies?type=PHARMACY').then((r) => r.data),
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Overview of Tena-Sabi network</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Pharmacies',      value: stats?.pharmacies ?? '—', icon: Building2,   color: 'bg-[#E6F3F0] text-[#037561]' },
          { label: 'Testing Centers', value: stats?.centers    ?? '—', icon: FlaskConical, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Currently Open',  value: stats?.open       ?? '—', icon: TrendingUp,  color: 'bg-green-50 text-green-600'   },
          { label: 'Test Kit Types',  value: kits.length       ?? '—', icon: Package,     color: 'bg-teal-50 text-teal-600'     },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-extrabold text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
          <h2 className="font-extrabold text-slate-700 text-sm">Recent Pharmacies</h2>
          <Link
            href="/admin/pharmacies/new"
            className="flex items-center gap-1.5 bg-[#037561] text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-[#024d40] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Pharmacy
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="px-6 py-3 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-extrabold text-slate-400 uppercase tracking-wider">Kits</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {pharmacies.slice(0, 8).map((p: any) => (
              <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-3.5 font-semibold text-slate-800">{p.name}</td>
                <td className="px-6 py-3.5 text-slate-500 text-xs">{p.address}</td>
                <td className="px-6 py-3.5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.isOpen ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                    {p.isOpen ? 'Open' : 'Closed'}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-slate-500 text-xs">{p.testKits?.length ?? 0} kits</td>
                <td className="px-6 py-3.5 text-right">
                  <Link href={`/admin/pharmacies/${p.id}/edit`} className="text-xs text-[#037561] font-bold hover:text-purple-800">
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {pharmacies.length > 8 && (
          <div className="px-6 py-3 border-t border-slate-50 text-center">
            <Link href="/admin/pharmacies" className="text-xs text-[#037561] font-bold hover:text-purple-800">
              View all {pharmacies.length} pharmacies →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
