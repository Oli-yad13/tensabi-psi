'use client';

import { useEffect, useState } from 'react';

export default function AppLoadingScreen() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'done'>('visible');

  useEffect(() => {
    // Start fade-out after 2.2s
    const fadeTimer = setTimeout(() => setPhase('fading'), 2200);
    // Remove from DOM after fade completes (0.7s transition)
    const doneTimer = setTimeout(() => setPhase('done'), 2900);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between"
      style={{
        background: 'linear-gradient(160deg, #025a49 0%, #037561 55%, #04956e 100%)',
        opacity: phase === 'fading' ? 0 : 1,
        transition: phase === 'fading' ? 'opacity 0.7s ease-in-out' : undefined,
        pointerEvents: phase === 'fading' ? 'none' : undefined,
      }}
    >
      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8">
        {/* App icon */}
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
        >
          <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none" aria-hidden>
            {/* Shield shape */}
            <path
              d="M20 4 L34 10 L34 22 C34 29.5 27.5 35.5 20 38 C12.5 35.5 6 29.5 6 22 L6 10 Z"
              fill="white"
              fillOpacity="0.9"
            />
            {/* Checkmark */}
            <path
              d="M13 20 L18 25 L27 15"
              stroke="#037561"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* App name */}
        <div className="text-center">
          <h1
            className="text-white text-3xl tracking-tight"
            style={{ fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            TenaSabi
          </h1>
          <p className="text-white/60 text-sm font-medium mt-1">HIV Self-Test</p>
        </div>

        {/* Pulse dots loader */}
        <div className="flex gap-2 mt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-white/40"
              style={{
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom — "Powered by PSI Ethiopia" */}
      <div className="pb-12 flex flex-col items-center gap-3">
        <p className="text-white/40 text-[11px] font-medium uppercase tracking-widest">
          Powered by
        </p>
        <div
          className="px-5 py-3 rounded-2xl flex items-center"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
        >
          <img
            src="/psi-ethiopia.png"
            alt="PSI Ethiopia"
            width="120"
            height="48"
            className="object-contain"
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
