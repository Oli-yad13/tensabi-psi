'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';

const KIT_TYPES = [
  { value: 'ORAL_SALIVA',   label: 'Oral / Saliva',   desc: 'ORAQuick-style gum swab'    },
  { value: 'FINGER_PRICK',  label: 'Finger-Prick',    desc: 'Blood-drop rapid test'       },
  { value: 'COMBO_ANTIGEN', label: 'Combo Antigen',   desc: 'Detects antigen + antibody'  },
];
const SAMPLE_TYPES = [
  { value: 'ORAL',  label: 'Oral'         },
  { value: 'BLOOD', label: 'Blood'        },
  { value: 'BOTH',  label: 'Oral + Blood' },
];

export default function EditKitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const qc = useQueryClient();
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { data: kit, isLoading } = useQuery<any>({
    queryKey: ['kit', id],
    queryFn: () => api.get(`/kits/${id}`).then((r) => r.data),
  });

  const [form, setForm] = useState({
    name: '', type: 'ORAL_SALIVA', sampleType: 'ORAL', minPriceETB: '', maxPriceETB: '',
  });

  useEffect(() => {
    if (!kit) return;
    setForm({
      name: kit.name,
      type: kit.type,
      sampleType: kit.sampleType,
      minPriceETB: String(kit.minPriceETB),
      maxPriceETB: String(kit.maxPriceETB),
    });
  }, [kit]);

  const { mutate: save, isPending: saving } = useMutation({
    mutationFn: () =>
      api.patch(`/kits/${id}`, {
        ...form,
        minPriceETB: parseInt(form.minPriceETB),
        maxPriceETB: parseInt(form.maxPriceETB),
      }).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['kits'] });
      router.push('/admin/kits');
    },
    onError: (e: any) => setError(e?.response?.data?.message ?? 'Failed to update'),
  });

  const { mutate: remove, isPending: deleting } = useMutation({
    mutationFn: () => api.delete(`/kits/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['kits'] });
      router.push('/admin/kits');
    },
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  if (isLoading) return <div className="p-8 text-slate-400 text-sm">Loading…</div>;
  if (!kit) return <div className="p-8 text-red-400 text-sm">Kit not found.</div>;

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <Link href="/admin/kits" className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800">Edit Test Kit</h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">{kit.name}</p>
          </div>
        </div>
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 px-3 py-2 rounded-xl hover:bg-red-50 transition-all border border-red-200">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500 font-medium">Delete kit?</span>
            <button onClick={() => remove()} disabled={deleting} className="text-red-600 font-extrabold hover:text-red-800">
              {deleting ? '…' : 'Yes, delete'}
            </button>
            <button onClick={() => setConfirmDelete(false)} className="text-slate-500 font-bold hover:text-slate-700">Cancel</button>
          </div>
        )}
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-medium mb-5">{error}</div>}

      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
          <h2 className="font-extrabold text-slate-700 text-sm">Kit Details</h2>

          <Field label="Kit Name *">
            <input className={input} value={form.name} onChange={(e) => set('name', e.target.value)} />
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

          <div className="grid grid-cols-2 gap-4">
            <Field label="Min Price (ETB) *">
              <input className={input} type="number" min="0" value={form.minPriceETB} onChange={(e) => set('minPriceETB', e.target.value)} />
            </Field>
            <Field label="Max Price (ETB) *">
              <input className={input} type="number" min="0" value={form.maxPriceETB} onChange={(e) => set('maxPriceETB', e.target.value)} />
            </Field>
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/kits" className="flex-1 text-center py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:border-slate-300 transition-colors">
            Cancel
          </Link>
          <button
            onClick={() => save()}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 bg-[#037561] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#024d40] disabled:opacity-50 transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving…' : 'Save Changes'}
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
