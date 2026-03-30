'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import { api } from '@/lib/api';

const KIT_TYPES = [
  { value: 'ORAL_SALIVA',   label: 'Oral / Saliva',   desc: 'ORAQuick-style gum swab' },
  { value: 'FINGER_PRICK',  label: 'Finger-Prick',    desc: 'Blood-drop rapid test'   },
  { value: 'COMBO_ANTIGEN', label: 'Combo Antigen',   desc: 'Detects antigen + antibody' },
];
const SAMPLE_TYPES = [
  { value: 'ORAL',  label: 'Oral'         },
  { value: 'BLOOD', label: 'Blood'        },
  { value: 'BOTH',  label: 'Oral + Blood' },
];

export default function NewKitPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    type: 'ORAL_SALIVA',
    sampleType: 'ORAL',
    priceETB: '',
  });

  const { mutate: create, isPending } = useMutation({
    mutationFn: () =>
      api.post('/kits', {
        ...form,
        priceETB: parseInt(form.priceETB),
      }).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['kits'] });
      router.push('/admin/kits');
    },
    onError: (e: any) => setError(e?.response?.data?.message ?? 'Failed to create kit'),
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-7">
        <Link href="/admin/kits" className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Add Test Kit</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Create a new kit in the catalog</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-medium mb-5">{error}</div>
      )}

      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
          <h2 className="font-extrabold text-slate-700 text-sm">Kit Details</h2>

          <Field label="Kit Name *">
            <input className={input} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. HIV Oral Self-Test (ORAQuick)" />
          </Field>

          <Field label="Kit Type *">
            <div className="space-y-2">
              {KIT_TYPES.map(({ value, label, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('type', value)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                    form.type === value ? 'border-purple-400 bg-[#E6F3F0]' : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 ${form.type === value ? 'border-purple-600 bg-purple-600' : 'border-slate-300'}`} />
                  <div>
                    <p className="text-sm font-bold text-slate-700">{label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </Field>

          <Field label="Sample Type *">
            <div className="flex gap-2">
              {SAMPLE_TYPES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('sampleType', value)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                    form.sampleType === value
                      ? 'border-purple-400 bg-[#E6F3F0] text-[#037561]'
                      : 'border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Price (ETB) *">
            <input className={input} type="number" min="0" value={form.priceETB} onChange={(e) => set('priceETB', e.target.value)} placeholder="650" />
          </Field>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/kits" className="flex-1 text-center py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:border-slate-300 transition-colors">
            Cancel
          </Link>
          <button
            onClick={() => create()}
            disabled={isPending || !form.name || !form.priceETB}
            className="flex-1 flex items-center justify-center gap-2 bg-[#037561] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#024d40] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            {isPending ? 'Saving…' : 'Save Kit'}
          </button>
        </div>
      </div>
    </div>
  );
}

const input = 'w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#5BA899] bg-slate-50';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-extrabold text-slate-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
