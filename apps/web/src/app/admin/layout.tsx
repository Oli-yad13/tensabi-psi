'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, LayoutDashboard, Package, ChevronRight, FlaskConical, LogOut } from 'lucide-react';

const nav = [
  { href: '/admin',                  label: 'Dashboard',       icon: LayoutDashboard },
  { href: '/admin/pharmacies',       label: 'Pharmacies',      icon: Building2       },
  { href: '/admin/testing-centers',  label: 'Testing Centers', icon: FlaskConical    },
  { href: '/admin/kits',             label: 'Test Kits',       icon: Package         },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0 sticky top-0 h-screen">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#037561] rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-extrabold">TS</span>
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-800 leading-tight">Tena-Sabi</p>
              <p className="text-[10px] text-slate-400 font-medium">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#E6F3F0] text-[#037561]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100 space-y-2">
          <Link href="/hiv-test" className="block text-xs text-slate-400 hover:text-[#037561] transition-colors font-medium">
            ← Back to app
          </Link>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
