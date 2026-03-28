'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';

type ResultType = 'NEGATIVE' | 'POSITIVE' | 'INVALID';

const TABS: { id: ResultType; label: string; color: string }[] = [
  { id: 'NEGATIVE', label: 'Negative', color: 'text-green-600' },
  { id: 'POSITIVE', label: 'Positive', color: 'text-red-500' },
  { id: 'INVALID', label: 'Invalid', color: 'text-yellow-500' },
];

const RESULT_INFO: Record<ResultType, {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  subtitle: string;
  steps: string[];
  warning?: string;
}> = {
  NEGATIVE: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    title: 'Negative Result',
    subtitle: 'No HIV antibodies detected in your sample at this time.',
    steps: [
      'If exposed in the last 3 months, retest after the window period.',
      'Continue using protection (condoms, PrEP) to stay negative.',
      'Regular testing every 3–6 months if at ongoing risk.',
    ],
  },
  POSITIVE: {
    icon: XCircle,
    iconColor: 'text-red-500',
    title: 'Positive Result',
    subtitle: 'A reactive result was detected. Must be confirmed by a healthcare professional.',
    steps: [
      'Visit a health facility for a confirmatory blood test.',
      'Speak with a counselor — you don\'t have to do this alone.',
      'With early treatment, people with HIV can live full, healthy lives.',
    ],
    warning:
      'Important: A positive self-test is not a diagnosis. A confirmatory test at a health facility is required. With early treatment, people with HIV can live full, healthy lives.',
  },
  INVALID: {
    icon: AlertCircle,
    iconColor: 'text-yellow-500',
    title: 'Invalid Result',
    subtitle: 'The test could not be read. Please retest.',
    steps: [
      'Make sure to follow all instructions carefully.',
      'Check the expiry date of the test kit.',
      'Retest with a new kit or visit a health facility.',
    ],
  },
};

export default function ResultsPage() {
  const [active, setActive] = useState<ResultType>('NEGATIVE');
  const info = RESULT_INFO[active];
  const Icon = info.icon;

  const { mutate: logResult } = useMutation({
    mutationFn: (result: ResultType) =>
      api.post('/results', { result }).then((r) => r.data),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-5 pt-12 pb-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/hiv-test" className="text-gray-500 hover:text-gray-800">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-gray-800 text-lg">Understanding Results</h1>
        </div>
        {/* Tabs */}
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition ${
                active === tab.id
                  ? `${tab.color} bg-gray-100`
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 space-y-4">
        {/* Result card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <Icon className={`w-16 h-16 mx-auto mb-3 ${info.iconColor}`} />
          <h2 className="text-xl font-bold text-gray-800 mb-1">{info.title}</h2>
          <p className="text-sm text-gray-500">{info.subtitle}</p>
        </div>

        {/* Warning */}
        {info.warning && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <p className="text-sm text-red-700">{info.warning}</p>
          </div>
        )}

        {/* Next steps */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-3">What this means</h3>
          <ul className="space-y-2">
            {info.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Log result */}
        <button
          onClick={() => logResult(active)}
          className="w-full bg-purple-600 text-white rounded-2xl py-3 font-semibold hover:bg-purple-700 transition"
        >
          Find Support &amp; Care →
        </button>
      </div>
    </div>
  );
}
