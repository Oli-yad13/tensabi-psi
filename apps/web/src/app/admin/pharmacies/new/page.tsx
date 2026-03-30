'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, MapPin, CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';
import { hasValidCoordinates } from '@/lib/parseGoogleMapsUrl';
import { useGoogleMapsInput } from '@/hooks/useGoogleMapsInput';

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export default function NewPharmacyPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', address: '', city: 'Addis Ababa',
    phone: '', latitude: '', longitude: '', isOpen: true,
  });
  const [hours, setHours] = useState<Record<string, string>>(
    Object.fromEntries(DAYS.map((d) => [d, '08:00–21:00']))
  );

  const { mapsUrl, setMapsUrl, parsed, isResolving, resolveError } = useGoogleMapsInput();

  useEffect(() => {
    if (!parsed) return;
    setForm((f) => ({ ...f, latitude: String(parsed.lat), longitude: String(parsed.lng) }));
  }, [parsed]);

  const { mutate: create, isPending } = useMutation({
    mutationFn: () =>
      api.post('/pharmacies', {
        ...form,
        latitude: parseFloat(form.latitude),
        longitude: parseFloat(form.longitude),
        phone: form.phone || undefined,
        hoursJson: hours,
      }).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['pharmacies'] });
      router.push('/admin/pharmacies');
    },
    onError: (e: any) => setError(e?.response?.data?.message ?? 'Failed to create pharmacy'),
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  const canSave =
    !!form.name &&
    !!form.address &&
    hasValidCoordinates(parseFloat(form.latitude), parseFloat(form.longitude));

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-7">
        <Link href="/admin/pharmacies" className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </Link>
        <div>
          <h1 className="text-xl font-extrabold text-slate-800">Add Pharmacy</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">Create a new pharmacy entry</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-600 font-medium mb-5">{error}</div>
      )}

      <div className="space-y-5">
        {/* Basic info */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
          <h2 className="font-extrabold text-slate-700 text-sm">Basic Information</h2>

          <Field label="Pharmacy Name *">
            <input className={input} value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="e.g. Medhanit Pharmacy" />
          </Field>

          <Field label="Address *">
            <input className={input} value={form.address} onChange={(e) => set('address', e.target.value)} placeholder="e.g. Bole Road, near Edna Mall" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="City *">
              <input className={input} value={form.city} onChange={(e) => set('city', e.target.value)} />
            </Field>
            <Field label="Phone">
              <input className={input} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+251 9..." />
            </Field>
          </div>

          {/* Google Maps URL */}
          <Field label="Google Maps Link *">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                className={`${input} pl-9 ${parsed ? 'border-green-300 bg-green-50' : ''}`}
                value={mapsUrl}
                onChange={(e) => setMapsUrl(e.target.value)}
                placeholder="Paste a Google Maps share link…"
              />
            </div>
            {isResolving && (
              <p className="mt-1.5 text-xs text-slate-500 font-medium">
                Resolving Google Maps link…
              </p>
            )}
            {parsed && (
              <div className="flex items-center gap-2 mt-2 text-xs text-green-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                Coordinates extracted: {parsed.lat.toFixed(6)}, {parsed.lng.toFixed(6)}
              </div>
            )}
            {mapsUrl && !parsed && !isResolving && resolveError && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                {resolveError}
              </p>
            )}
          </Field>

          <Field label="Status">
            <div className="flex gap-3">
              {[{ v: true, l: 'Open' }, { v: false, l: 'Closed' }].map(({ v, l }) => (
                <button key={l} type="button" onClick={() => set('isOpen', v)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${
                    form.isOpen === v
                      ? v ? 'border-green-400 bg-green-50 text-green-700' : 'border-slate-300 bg-slate-50 text-slate-600'
                      : 'border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </Field>
        </div>

        {/* Hours */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-3">
          <h2 className="font-extrabold text-slate-700 text-sm">Opening Hours</h2>
          <div className="space-y-2">
            {DAYS.map((day) => (
              <div key={day} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-8 capitalize">{day}</span>
                <input
                  className={`flex-1 ${input}`}
                  value={hours[day]}
                  onChange={(e) => setHours((h) => ({ ...h, [day]: e.target.value }))}
                  placeholder="08:00–21:00 or Closed"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/admin/pharmacies" className="flex-1 text-center py-3 border-2 border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:border-slate-300 transition-colors">
            Cancel
          </Link>
          <button
            onClick={() => create()}
            disabled={isPending || !canSave}
            className="flex-1 flex items-center justify-center gap-2 bg-[#037561] text-white rounded-xl py-3 font-bold text-sm hover:bg-[#024d40] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            {isPending ? 'Saving…' : 'Save Pharmacy'}
          </button>
        </div>
      </div>
    </div>
  );
}

const input = 'w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#037561]/30 focus:border-[#037561] bg-slate-50';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-extrabold text-slate-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}
