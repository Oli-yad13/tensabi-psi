import Link from 'next/link';
import { MapPin, BookOpen, FlaskConical, FileText, ShieldCheck } from 'lucide-react';

const actions = [
  {
    href: '/hiv-test/find-kits',
    icon: MapPin,
    title: 'Find Test Kits Near You',
    description: 'Browse pharmacies with kits available',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    href: '/hiv-test/how-it-works',
    icon: BookOpen,
    title: 'Learn How Self-Testing Works',
    description: 'Step-by-step guide & result info',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    href: '/hiv-test/how-to-use',
    icon: FlaskConical,
    title: 'How To Use',
    description: 'Step-by-step guide',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    href: '/hiv-test/results',
    icon: FileText,
    title: 'Read Results',
    description: 'Understand your test',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

const stats = [
  { label: 'Pharmacies', value: '120+' },
  { label: 'Accuracy', value: '99%' },
  { label: 'Price', value: 'Free' },
];

export default function HivTestHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-700 text-white px-5 pt-12 pb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-200 mb-3">
          <span className="bg-purple-500 rounded px-2 py-0.5">HIV SELF-TEST</span>
        </div>
        <h1 className="text-2xl font-bold leading-tight mb-2">
          Test Privately.<br />Know Your Status.
        </h1>
        <p className="text-sm text-purple-200 mb-6">
          Find self-test kits near you and learn how to use them correctly.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-purple-600 rounded-xl p-3 text-center">
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-xs text-purple-200">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 py-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
          What would you like to do?
        </h2>
        <div className="space-y-3">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className={`${action.bg} p-3 rounded-xl`}>
                <action.icon className={`w-5 h-5 ${action.iconColor}`} />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{action.title}</div>
                <div className="text-xs text-gray-400">{action.description}</div>
              </div>
              <span className="ml-auto text-gray-300">›</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Privacy note */}
      <div className="px-5 pb-8">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4" />
          Your privacy is protected. Anonymous browsing. No results stored without permission.
        </div>
      </div>
    </div>
  );
}
