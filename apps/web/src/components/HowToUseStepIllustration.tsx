type HowToUseStepKey = 's1' | 's2' | 's3' | 's4' | 's5';

export default function HowToUseStepIllustration({ step }: { step: HowToUseStepKey }) {
  const styles: Record<HowToUseStepKey, { shell: string; frame: string }> = {
    s1: { shell: 'from-[#E8F7F3] via-[#F5FCFA] to-white', frame: 'border-[#BFE7DB]' },
    s2: { shell: 'from-[#EAF4FF] via-[#F6FAFF] to-white', frame: 'border-[#C8DDF8]' },
    s3: { shell: 'from-[#F1EDFF] via-[#FAF8FF] to-white', frame: 'border-[#D9CDFB]' },
    s4: { shell: 'from-[#FFF4E8] via-[#FFF9F2] to-white', frame: 'border-[#F5D8B2]' },
    s5: { shell: 'from-[#EAFBF2] via-[#F7FDF9] to-white', frame: 'border-[#CDEFD9]' },
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${styles[step].shell} ${styles[step].frame}`}>
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute -left-4 bottom-0 h-16 w-16 rounded-full bg-white/40 blur-xl" />
      <div className="relative p-3">
        <div className="rounded-[1.1rem] border border-white/80 bg-white/75 p-3 shadow-[0_10px_30px_rgba(3,117,97,0.08)] backdrop-blur-sm">
          {step === 's1' && <StepOneIllustration />}
          {step === 's2' && <StepTwoIllustration />}
          {step === 's3' && <StepThreeIllustration />}
          {step === 's4' && <StepFourIllustration />}
          {step === 's5' && <StepFiveIllustration />}
        </div>
      </div>
    </div>
  );
}

function StepOneIllustration() {
  return (
    <svg viewBox="0 0 320 160" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="124" width="320" height="36" rx="18" fill="#DDEEE8" />
      <rect x="22" y="34" width="92" height="80" rx="18" fill="#E8F7F3" />
      <rect x="34" y="46" width="68" height="56" rx="14" fill="#FFFFFF" />
      <rect x="49" y="34" width="38" height="16" rx="8" fill="#037561" />
      <rect x="60" y="20" width="16" height="18" rx="6" fill="#95D4C4" />
      <path d="M68 68c0-9 7-16 16-16s16 7 16 16v11H68z" fill="#BFE7DB" />
      <path d="M84 78c0 10-8 18-18 18S48 88 48 78" fill="none" stroke="#037561" strokeWidth="6" strokeLinecap="round" />
      <path d="M84 78c0 10 8 18 18 18s18-8 18-18" fill="none" stroke="#037561" strokeWidth="6" strokeLinecap="round" />
      <circle cx="170" cy="58" r="34" fill="#FFFFFF" stroke="#BFE7DB" strokeWidth="6" />
      <circle cx="170" cy="58" r="24" fill="#F5FCFA" />
      <path d="M170 40v18l11 8" fill="none" stroke="#037561" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M151 89h38" stroke="#037561" strokeWidth="6" strokeLinecap="round" />
      <rect x="210" y="34" width="88" height="80" rx="18" fill="#FFFFFF" stroke="#BFE7DB" strokeWidth="4" />
      <rect x="222" y="48" width="64" height="14" rx="7" fill="#E8F7F3" />
      <rect x="222" y="70" width="46" height="9" rx="4.5" fill="#D8EDE6" />
      <rect x="222" y="84" width="54" height="9" rx="4.5" fill="#D8EDE6" />
      <rect x="246" y="20" width="20" height="24" rx="10" fill="#037561" />
      <rect x="230" y="18" width="52" height="14" rx="7" fill="#95D4C4" />
      <circle cx="274" cy="92" r="10" fill="#037561" />
      <path d="M269 92l3 3 6-7" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepTwoIllustration() {
  return (
    <svg viewBox="0 0 320 160" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="124" width="320" height="36" rx="18" fill="#DDE8F5" />
      <path d="M114 118c-24 0-44-20-44-44V60c0-22 18-40 40-40h22c34 0 62 28 62 62v8c0 16-13 28-28 28z" fill="#FFD9C8" />
      <path d="M110 26h40c22 0 40 18 40 40v4c-12-9-24-14-42-14h-30c-14 0-29 6-40 16V58c0-18 14-32 32-32z" fill="#0F3B34" />
      <path d="M148 80c5 0 9 4 9 9s-4 9-9 9h-30v-18z" fill="#FFFFFF" />
      <path d="M112 88h39" stroke="#037561" strokeWidth="4" strokeLinecap="round" />
      <path d="M95 76l42 6" stroke="#3B82F6" strokeWidth="6" strokeLinecap="round" />
      <circle cx="89" cy="75" r="6" fill="#3B82F6" />
      <path d="M94 104l40-6" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" />
      <circle cx="88" cy="105" r="6" fill="#60A5FA" />
      <path d="M214 48l18 10" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
      <path d="M214 112l18-10" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <circle cx="250" cy="52" r="22" fill="#FFFFFF" stroke="#C8DDF8" strokeWidth="5" />
      <path d="M240 52h20" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
      <path d="M254 45l8 7-8 7" fill="none" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="250" cy="108" r="22" fill="#FFFFFF" stroke="#C8DDF8" strokeWidth="5" />
      <path d="M240 108h20" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />
      <path d="M246 101l-8 7 8 7" fill="none" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepThreeIllustration() {
  return (
    <svg viewBox="0 0 320 160" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="124" width="320" height="36" rx="18" fill="#E6E0FA" />
      <rect x="44" y="24" width="42" height="28" rx="12" fill="#A78BFA" />
      <path d="M52 44l26 14" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />
      <rect x="118" y="26" width="22" height="90" rx="11" fill="#8B5CF6" />
      <rect x="116" y="108" width="26" height="12" rx="6" fill="#D9CDFB" />
      <rect x="120" y="42" width="18" height="56" rx="9" fill="#EDE9FE" />
      <path d="M129 12v30" stroke="#8B5CF6" strokeWidth="8" strokeLinecap="round" />
      <path d="M129 12c10 8 22 16 34 24" stroke="#A78BFA" strokeWidth="6" strokeLinecap="round" />
      <rect x="186" y="34" width="94" height="74" rx="18" fill="#FFFFFF" stroke="#D9CDFB" strokeWidth="4" />
      <rect x="204" y="48" width="58" height="10" rx="5" fill="#EDE9FE" />
      <rect x="204" y="66" width="38" height="10" rx="5" fill="#DDD6FE" />
      <rect x="204" y="84" width="46" height="10" rx="5" fill="#DDD6FE" />
      <circle cx="252" cy="82" r="12" fill="#8B5CF6" />
      <path d="M246 82l4 4 7-9" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M146 54h26" stroke="#A78BFA" strokeWidth="5" strokeLinecap="round" strokeDasharray="5 8" />
      <circle cx="176" cy="54" r="5" fill="#A78BFA" />
    </svg>
  );
}

function StepFourIllustration() {
  return (
    <svg viewBox="0 0 320 160" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="124" width="320" height="36" rx="18" fill="#F7E8D4" />
      <circle cx="96" cy="78" r="48" fill="#FFFFFF" stroke="#F5D8B2" strokeWidth="8" />
      <circle cx="96" cy="78" r="36" fill="#FFF8EF" />
      <path d="M96 48v30l18 12" fill="none" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M66 78a30 30 0 0 1 52-21" fill="none" stroke="#F59E0B" strokeWidth="7" strokeLinecap="round" />
      <path d="M132 54l-4 16-14-8" fill="#F59E0B" />
      <rect x="206" y="42" width="26" height="66" rx="13" fill="#8B5CF6" />
      <rect x="202" y="102" width="34" height="12" rx="6" fill="#D9CDFB" />
      <rect x="210" y="56" width="18" height="38" rx="9" fill="#F6F3FF" />
      <rect x="190" y="110" width="58" height="9" rx="4.5" fill="#B6D9CE" />
      <path d="M242 42c10 8 20 18 28 30" stroke="#F5D8B2" strokeWidth="6" strokeLinecap="round" strokeDasharray="4 8" />
      <circle cx="274" cy="84" r="16" fill="#FFFFFF" stroke="#F5D8B2" strokeWidth="4" />
      <path d="M268 84h12" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <path d="M274 78v12" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function StepFiveIllustration() {
  return (
    <svg viewBox="0 0 320 160" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="124" width="320" height="36" rx="18" fill="#DBF2E3" />
      <rect x="30" y="44" width="260" height="64" rx="24" fill="#FFFFFF" stroke="#CDEFD9" strokeWidth="6" />
      <rect x="54" y="58" width="94" height="36" rx="14" fill="#F4FCF7" />
      <rect x="170" y="54" width="82" height="44" rx="12" fill="#F8FBF9" stroke="#E4F5EA" strokeWidth="4" />
      <path d="M188 68v16" stroke="#037561" strokeWidth="5" strokeLinecap="round" />
      <path d="M214 68v16" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
      <path d="M240 68v16" stroke="#E5E7EB" strokeWidth="5" strokeLinecap="round" />
      <text x="185" y="48" fontSize="14" fontWeight="700" fill="#6B7280">C</text>
      <text x="211" y="48" fontSize="14" fontWeight="700" fill="#6B7280">T</text>
      <text x="237" y="48" fontSize="14" fontWeight="700" fill="#9CA3AF">?</text>
      <circle cx="270" cy="76" r="18" fill="#16A34A" />
      <path d="M262 76l5 5 10-12" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M86 58c12 8 20 18 24 30-10 8-22 12-36 12-12 0-24-4-34-10 8-18 24-30 46-32z" fill="#BFE7DB" />
      <circle cx="124" cy="70" r="6" fill="#037561" />
    </svg>
  );
}
