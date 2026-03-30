'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Timer, Play, CheckCircle2, AlertTriangle,
  ChevronRight, RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const STEPS = ['s1', 's2', 's3', 's4', 's5'] as const;
type StepKey = typeof STEPS[number];

const STEP_CTA_KEYS: Record<StepKey, string> = {
  s1: 'timer.ctaS1',
  s2: 'timer.ctaS2',
  s3: 'timer.ctaS3',
  s4: 'timer.ctaS4',
  s5: 'timer.ctaS5',
};

const CHECKLIST_COUNTS: Record<StepKey, number> = {
  s1: 3, s2: 3, s3: 3, s4: 3, s5: 0,
};

const WAIT_SECS = 20 * 60;
const MAX_SECS  = 40 * 60;

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function GuidedTimer() {
  const t = useTranslations('howToUse');
  const [active,  setActive]  = useState(false);
  const [step,    setStep]    = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [done,    setDone]    = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const sk           = STEPS[step];
  const isTimerStep  = sk === 's4';
  const inReadWindow = elapsed >= WAIT_SECS && elapsed < MAX_SECS;
  const isExpired    = elapsed >= MAX_SECS;
  const canProceed   = !isTimerStep || inReadWindow || isExpired;

  useEffect(() => {
    if (active && isTimerStep) {
      timerRef.current = setInterval(() => {
        setElapsed(e => {
          if (e >= MAX_SECS) { clearInterval(timerRef.current!); return e; }
          return e + 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [active, step]); // eslint-disable-line react-hooks/exhaustive-deps

  function start() { setActive(true); setStep(0); setElapsed(0); setDone(false); }

  function next() {
    if (timerRef.current) clearInterval(timerRef.current);
    if (step === STEPS.length - 1) { setDone(true); }
    else { setElapsed(0); setStep(s => s + 1); }
  }

  function reset() {
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(false); setStep(0); setElapsed(0); setDone(false);
  }

  /* ── IDLE ── */
  if (!active && !done) {
    return (
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Timer className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-extrabold text-white text-[15px] leading-none">{t('timer.title')}</p>
            <p className="text-[12px] text-white/60 mt-0.5">{t('timer.subtitle')}</p>
          </div>
        </div>
        <button
          onClick={start}
          className="flex items-center justify-center gap-2 w-full bg-white text-[#037561] rounded-xl py-3 font-extrabold text-[14px] active:scale-[0.98] transition-all"
        >
          <Play className="w-4 h-4 fill-[#037561]" />
          {t('timer.startCta')}
        </button>
      </div>
    );
  }

  /* ── DONE ── */
  if (done) {
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="font-extrabold text-gray-800 text-[15px]">{t('timer.doneBanner')}</p>
            <p className="text-[12px] text-gray-400 mt-0.5">{t('timer.doneSub')}</p>
          </div>
        </div>
        <Link
          href="/hiv-test/results"
          className="flex items-center justify-center gap-2 w-full bg-[#037561] text-white rounded-xl py-3 font-extrabold text-[14px] active:scale-[0.98] transition-all mb-2"
        >
          {t('timer.resultsCta')} <ChevronRight className="w-4 h-4" />
        </Link>
        <button
          onClick={reset}
          className="flex items-center justify-center gap-2 w-full bg-gray-50 text-gray-500 rounded-xl py-2.5 font-bold text-[13px] active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" /> {t('timer.restart')}
        </button>
      </div>
    );
  }

  /* ── ACTIVE ── */
  const elapsedMin  = Math.floor(elapsed / 60);
  const elapsedSec  = elapsed % 60;
  const progressPct = Math.min((elapsed / MAX_SECS) * 100, 100);
  const checklistKeys = Array.from({ length: CHECKLIST_COUNTS[sk] }, (_, i) => `steps.${sk}c${i + 1}`);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      {/* Step progress bar */}
      <div className="flex gap-1 p-4 pb-3">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-all ${
              i < step ? 'bg-[#037561]' : i === step ? 'bg-[#037561]/50' : 'bg-gray-100'
            }`}
          />
        ))}
      </div>

      <div className="px-4 pb-1">
        <span className="text-[10px] text-gray-400 font-extrabold tracking-widest">
          {t('timer.stepOf', { n: step + 1, total: STEPS.length })}
        </span>
      </div>

      {/* Step title + description */}
      <div className="px-4 pb-4">
        <h3 className="font-extrabold text-gray-800 text-[16px] mb-1">
          {t(`steps.${sk}title` as Parameters<typeof t>[0])}
        </h3>
        <p className="text-[13px] text-gray-500 leading-relaxed">
          {t(`steps.${sk}desc` as Parameters<typeof t>[0])}
        </p>
      </div>

      {/* ── Timer display (step 4 only) ── */}
      {isTimerStep && (
        <div className="px-4 pb-4 space-y-3">
          <div className={`rounded-xl p-5 text-center transition-colors ${
            isExpired ? 'bg-red-50' : inReadWindow ? 'bg-green-50' : 'bg-gray-50'
          }`}>
            <div className={`text-[3.5rem] font-black leading-none tabular-nums tracking-tight ${
              isExpired ? 'text-red-500' : inReadWindow ? 'text-green-600' : 'text-gray-700'
            }`}>
              {pad(elapsedMin)}:{pad(elapsedSec)}
            </div>
            <p className={`text-[12px] font-bold mt-2 ${
              isExpired ? 'text-red-400' : inReadWindow ? 'text-green-500' : 'text-gray-400'
            }`}>
              {isExpired
                ? t('timer.expired')
                : inReadWindow
                ? t('timer.windowOpen')
                : t('timer.developing')}
            </p>
          </div>

          {/* Progress bar */}
          <div>
            <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-green-400/70 z-10" />
              <div
                className={`h-full rounded-full transition-all ${
                  isExpired ? 'bg-red-400' : inReadWindow ? 'bg-green-500' : 'bg-[#037561]/70'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-1">
              <span>{t('timer.marker0')}</span>
              <span className="text-green-500 font-extrabold">{t('timer.marker20')}</span>
              <span>{t('timer.marker40')}</span>
            </div>
          </div>

          {!inReadWindow && !isExpired && (
            <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-3.5 py-3">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[12px] text-amber-700 leading-snug">
                {t('timer.waitWarning')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Checklist */}
      {checklistKeys.length > 0 && (
        <div className="px-4 pb-3 space-y-2">
          {checklistKeys.map((key) => (
            <div key={key} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#037561] shrink-0 mt-0.5" />
              <span className="text-[13px] text-gray-700 leading-snug">
                {t(key as Parameters<typeof t>[0])}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* CTA row */}
      <div className="px-4 pb-4 pt-1 flex gap-2">
        <button
          onClick={reset}
          title={t('timer.restart')}
          className="w-10 h-11 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 active:scale-[0.95] transition-all"
        >
          <RotateCcw className="w-4 h-4 text-gray-400" />
        </button>
        <button
          onClick={next}
          disabled={!canProceed}
          className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 font-extrabold text-[14px] transition-all active:scale-[0.98] ${
            canProceed
              ? 'bg-[#037561] text-white'
              : 'bg-gray-100 text-gray-300 cursor-not-allowed'
          }`}
        >
          {t(STEP_CTA_KEYS[sk] as Parameters<typeof t>[0])}
          {!isTimerStep && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
