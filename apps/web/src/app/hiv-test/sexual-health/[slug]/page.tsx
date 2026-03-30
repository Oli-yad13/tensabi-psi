import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

const STI_DATA: Record<string, {
  name: string;
  emoji: string;
  headerBg: string;
  overview: string;
  symptoms: string[];
  transmission: string[];
  treatment: string;
  prevention: string[];
  testing: string;
}> = {
  chlamydia: {
    name: 'Chlamydia',
    emoji: '🦠',
    headerBg: 'from-blue-600 to-blue-500',
    overview: 'Chlamydia is the most common bacterial STI. It often has no symptoms, which is why regular testing is essential. It is fully curable with antibiotics.',
    symptoms: ['Often no symptoms (up to 70% of cases)', 'Unusual discharge (penis or vagina)', 'Burning or pain when urinating', 'Pelvic or abdominal pain', 'Pain or swelling in the testicles'],
    transmission: ['Vaginal sex', 'Anal sex', 'Oral sex (less common)', 'Mother to baby during childbirth'],
    treatment: 'A single dose of azithromycin or a 7-day course of doxycycline. Both sexual partners should be treated. Avoid sex for 7 days after treatment.',
    prevention: ['Use condoms consistently', 'Get tested regularly if sexually active', 'Limit number of sexual partners', 'Mutual monogamy with a tested partner'],
    testing: 'Urine sample or genital swab. Results typically available within a few days.',
  },
  gonorrhea: {
    name: 'Gonorrhea',
    emoji: '⚠️',
    headerBg: 'from-rose-600 to-rose-500',
    overview: 'Gonorrhea ("the clap") is a bacterial STI that can infect the genitals, rectum, and throat. Drug-resistant strains are an increasing concern globally.',
    symptoms: ['White, yellow, or green discharge', 'Painful or burning urination', 'Rectal pain or discharge', 'Sore throat (throat infection)', 'Often no symptoms, especially in women'],
    transmission: ['Vaginal sex', 'Anal sex', 'Oral sex', 'Mother to baby during childbirth'],
    treatment: 'Dual antibiotic therapy — ceftriaxone injection plus azithromycin. Follow-up testing 1–2 weeks later is recommended due to drug resistance concerns.',
    prevention: ['Use condoms consistently', 'Regular STI screening', 'Notify recent partners if diagnosed', 'Avoid sex until treatment is complete'],
    testing: 'Urine test, swab from the urethra, cervix, rectum, or throat depending on exposure.',
  },
  syphilis: {
    name: 'Syphilis',
    emoji: '🔬',
    headerBg: 'from-amber-600 to-amber-500',
    overview: 'Syphilis progresses through distinct stages if untreated. It is fully curable with penicillin, especially in early stages. Left untreated, it can cause serious organ damage.',
    symptoms: ['Stage 1: painless sore (chancre) at infection site', 'Stage 2: rash on palms/soles, fever, swollen glands', 'Latent stage: no symptoms but still infectious', 'Stage 3: damage to heart, brain, and nerves'],
    transmission: ['Direct contact with syphilis sore during sex', 'Oral, anal, or vaginal sex', 'Mother to baby during pregnancy or birth'],
    treatment: 'Penicillin injection — highly effective in early stages. Later stages require longer treatment. Penicillin-allergic patients have alternative options.',
    prevention: ['Use condoms (note: condoms may not cover all sores)', 'Regular testing, especially during pregnancy', 'Notify and test sexual partners', 'Early treatment prevents progression'],
    testing: 'Blood test. Some clinics also test sores directly.',
  },
  'hepatitis-b': {
    name: 'Hepatitis B',
    emoji: '💉',
    headerBg: 'from-green-600 to-green-500',
    overview: 'Hepatitis B is a viral liver infection. A safe and effective vaccine is available. Most adults clear the infection naturally, but chronic infection can lead to liver disease.',
    symptoms: ['Often no symptoms initially', 'Jaundice (yellow skin or eyes)', 'Dark urine, pale stools', 'Extreme fatigue', 'Nausea, vomiting, or abdominal pain'],
    transmission: ['Unprotected sex', 'Sharing needles or syringes', 'Mother to child at birth', 'Blood transfusion (rare in screened settings)'],
    treatment: 'No cure, but antivirals (tenofovir, entecavir) manage chronic infection effectively. The 3-dose vaccine series provides lifelong protection.',
    prevention: ['Get vaccinated (3-dose series)', 'Use condoms', 'Never share needles or personal items (razors, toothbrushes)', 'Screening of blood donations'],
    testing: 'Blood test for hepatitis B surface antigen (HBsAg) and antibodies.',
  },
  hpv: {
    name: 'HPV',
    emoji: '🛡️',
    headerBg: 'from-violet-600 to-violet-500',
    overview: 'HPV (Human Papillomavirus) is the most common STI worldwide. Most infections clear on their own. Some strains cause genital warts; others can lead to cervical and other cancers.',
    symptoms: ['Usually no symptoms', 'Genital warts (low-risk strains)', 'Abnormal Pap smear results (high-risk strains)', 'Throat infection in some cases'],
    transmission: ['Skin-to-skin genital contact', 'Vaginal, anal, or oral sex', 'Even without penetration or visible symptoms'],
    treatment: 'No treatment for the virus itself. Genital warts can be treated. High-risk strains are monitored with regular Pap smears and colposcopy.',
    prevention: ['HPV vaccine (Gardasil 9) — most effective before first sexual contact', 'Condoms reduce but do not eliminate risk', 'Regular cervical screening for women'],
    testing: 'HPV DNA test or Pap smear for women. No approved test for men.',
  },
  herpes: {
    name: 'Herpes',
    emoji: '💊',
    headerBg: 'from-indigo-600 to-indigo-500',
    overview: 'Herpes (HSV-1 and HSV-2) is a lifelong but manageable condition. Many people with herpes live full, healthy lives. Antivirals significantly reduce outbreaks and transmission risk.',
    symptoms: ['Tingling, itching, or burning sensation', 'Painful blisters or sores (genitals, buttocks, thighs)', 'Flu-like symptoms during first outbreak', 'Many people have mild or no symptoms'],
    transmission: ['Skin-to-skin contact, including when no sores are visible (asymptomatic shedding)', 'Oral sex (HSV-1 can cause genital herpes)', 'Mother to baby during childbirth (rare)'],
    treatment: 'No cure, but antiviral medications (acyclovir, valacyclovir, famciclovir) reduce outbreak frequency, severity, and transmission risk. Daily suppressive therapy recommended for frequent outbreaks.',
    prevention: ['Use condoms (reduces but does not eliminate risk)', 'Avoid sexual contact during outbreaks', 'Daily antivirals to reduce shedding', 'Open communication with partners'],
    testing: 'Swab of an active sore for most accurate results. Blood test can detect antibodies but cannot identify location of infection.',
  },
};

export default async function StiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sti = STI_DATA[slug];
  const t = useTranslations('sexualHealth');
  const tc = useTranslations('common');

  if (!sti) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-400 text-sm mb-4">{t('notFound')}</p>
        <Link href="/hiv-test/sexual-health" className="text-[#037561] font-black text-sm">← {tc('back')}</Link>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {/* Header */}
      <div className={`bg-gradient-to-br ${sti.headerBg} px-4 pt-10 pb-6 relative overflow-hidden`}>
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/hiv-test/sexual-health"
              className="w-9 h-9 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                {sti.emoji}
              </div>
              <div>
                <h1 className="font-black text-white text-xl leading-none">{sti.name}</h1>
                <p className="text-[11px] text-white/70 mt-0.5 font-medium">{t('subtitle')}</p>
              </div>
            </div>
          </div>
          <p className="text-[13px] text-white/80 leading-relaxed font-medium">{sti.overview}</p>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-3">
        {/* Symptoms */}
        <div className="bg-white rounded-3xl shadow-card p-5">
          <h2 className="font-black text-slate-800 text-[14px] mb-3">{t('symptoms')}</h2>
          <ul className="space-y-2.5">
            {sti.symptoms.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-[13px] text-slate-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Transmission */}
        <div className="bg-white rounded-3xl shadow-card p-5">
          <h2 className="font-black text-slate-800 text-[14px] mb-3">{t('howItSpreads')}</h2>
          <ul className="space-y-2.5">
            {sti.transmission.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] text-slate-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#037561] shrink-0 mt-1.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Testing */}
        <div className="bg-white rounded-3xl shadow-card p-5">
          <h2 className="font-black text-slate-800 text-[14px] mb-2">{t('testing')}</h2>
          <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{sti.testing}</p>
        </div>

        {/* Treatment */}
        <div className="bg-white rounded-3xl shadow-card p-5">
          <h2 className="font-black text-slate-800 text-[14px] mb-2">{t('treatment')}</h2>
          <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{sti.treatment}</p>
        </div>

        {/* Prevention */}
        <div className="bg-white rounded-3xl shadow-card p-5">
          <h2 className="font-black text-slate-800 text-[14px] mb-3">{t('prevention')}</h2>
          <ul className="space-y-2.5">
            {sti.prevention.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[13px] text-slate-600 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#037561] shrink-0 mt-0.5" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Link
          href="/hiv-test/testing-centers"
          className="flex items-center justify-center gap-2 w-full bg-[#037561] text-white rounded-3xl py-4 font-black text-[15px] hover:bg-[#025a49] active:scale-[0.98] transition-all shadow-brand"
        >
          {t('findTestingCta')}
        </Link>
      </div>
    </div>
  );
}
