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
      <div className="flex-1 flex flex-col items-center justify-center gap-7 px-6">
        <div
          className="relative w-[min(88vw,640px)]"
          style={{
            animation: 'logoIntro 0.95s cubic-bezier(0.22, 1, 0.36, 1) both, logoSway 3.8s ease-in-out 1s infinite',
          }}
        >
          <img
            src="/tena-sabi-logo.png"
            alt="Tena Sabi"
            width="2048"
            height="671"
            className="w-full h-auto object-contain"
            style={{
              filter: 'drop-shadow(0 18px 34px rgba(1, 44, 34, 0.18))',
            }}
          />
        </div>

        {/* Pulse dots loader */}
        <div className="flex gap-2 mt-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-white/40"
              style={{
                animation: `pulse 1.35s ease-in-out ${i * 0.18}s infinite`,
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

        @keyframes logoIntro {
          0% { opacity: 0; transform: translateY(18px) scale(0.965); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes logoSway {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-0.4deg); }
        }
      `}</style>
    </div>
  );
}
