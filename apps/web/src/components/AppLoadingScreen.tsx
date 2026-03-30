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
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
        <div className="relative flex items-center justify-center">
          <div
            className="absolute h-44 w-44 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 45%, rgba(255,255,255,0) 72%)',
              filter: 'blur(10px)',
              animation: 'haloPulse 2.8s ease-in-out infinite',
            }}
          />
          <div
            className="relative w-[min(82vw,520px)] rounded-[2rem] px-5 py-4"
            style={{
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.16)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 24px 60px rgba(1, 46, 37, 0.22)',
              animation: 'logoFloat 3.2s ease-in-out infinite',
            }}
          >
            <img
              src="/tena-sabi-logo.png"
              alt="Tena Sabi"
              width="2048"
              height="671"
              className="w-full h-auto object-contain"
            />
          </div>
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

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.015); }
        }

        @keyframes haloPulse {
          0%, 100% { opacity: 0.7; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
