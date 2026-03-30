export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-[#037561] rounded-xl flex items-center justify-center">
            <span className="text-white text-sm font-extrabold">TS</span>
          </div>
          <div>
            <p className="font-extrabold text-slate-800 leading-tight">Tena-Sabi</p>
            <p className="text-[11px] text-slate-400 font-medium">Admin Panel</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <h1 className="font-extrabold text-slate-800 text-lg mb-1">Sign in</h1>
          <p className="text-sm text-slate-400 mb-6">Admin access only</p>

          <form action="/admin/login/submit" method="post" className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#037561]/40 focus:border-[#037561]"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#037561]/40 focus:border-[#037561]"
              />
            </div>

            <ErrorMessage searchParams={searchParams} />

            <button
              type="submit"
              className="w-full bg-[#037561] text-white rounded-xl py-2.5 font-extrabold text-sm hover:bg-[#025a49] active:scale-[0.98] transition-all"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

async function ErrorMessage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  if (!params.error) return null;
  return (
    <p className="text-xs text-red-500 font-semibold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
      Invalid username or password.
    </p>
  );
}
