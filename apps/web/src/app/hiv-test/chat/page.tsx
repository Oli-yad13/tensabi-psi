'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Message = {
  id: number;
  role: 'ai' | 'user';
  text: string;
  time: string;
};

export default function ChatPage() {
  const t = useTranslations('chat');

  const QUICK_REPLIES_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'ai',
      text: t('initialMessage'),
      time: t('sessionLabel'),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text, time: t('justNow') };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const key = QUICK_REPLIES_KEYS.find((k) => t(`quickReplies.${k}`) === text);
      const responseText = key ? t(`responses.${key}`) : t('fallback');
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: 'ai', text: responseText, time: t('now') },
      ]);
    }, 1400);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#037561] to-[#025a49] px-4 pt-10 pb-6 relative overflow-hidden">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/hiv-test"
              className="w-9 h-9 bg-white/20 rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-white/20 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-black text-white text-[15px] leading-none">{t('title')}</p>
                <p className="text-[11px] text-white/60 mt-0.5 font-medium">{t('subtitle')}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/[0.15] border border-white/20 rounded-3xl px-4 py-3">
            {t('heroTitle').split('\n').map((line, i) => (
              <p key={i} className="font-black text-white text-base leading-snug">{line}</p>
            ))}
            <p className="text-[12px] text-white/60 mt-1 leading-relaxed font-medium">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto pb-36 bg-[#F5FAF9]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {msg.role === 'ai' && (
              <div className="w-8 h-8 bg-[#E6F3F0] rounded-2xl flex items-center justify-center shrink-0 mt-1">
                <ShieldCheck className="w-4 h-4 text-[#037561]" />
              </div>
            )}
            <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
              <div
                className={`rounded-3xl px-4 py-3 text-[13px] leading-relaxed font-medium ${
                  msg.role === 'user'
                    ? 'bg-[#037561] text-white rounded-tr-lg'
                    : 'bg-white shadow-card text-slate-700 rounded-tl-lg'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 px-1">{msg.time}</span>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex gap-2.5 items-end">
            <div className="w-8 h-8 bg-[#E6F3F0] rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-[#037561]" />
            </div>
            <div className="bg-white rounded-3xl rounded-tl-lg px-4 py-3 shadow-card">
              <div className="flex gap-1 items-center h-4">
                <span className="w-1.5 h-1.5 bg-[#037561] rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-[#037561] rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-[#037561] rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Quick replies */}
        {messages.length <= 2 && !typing && (
          <div className="flex flex-wrap gap-2 pt-2">
            {QUICK_REPLIES_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => sendMessage(t(`quickReplies.${key}`))}
                className="text-[12px] font-black text-[#037561] bg-white border-2 border-[#E6F3F0] rounded-full px-3 py-1.5 hover:bg-[#E6F3F0] transition-colors active:scale-[0.97] shadow-card"
              >
                {t(`quickReplies.${key}`)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white/95 backdrop-blur border-t border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2 bg-[#F5FAF9] rounded-3xl px-4 py-3">
          <input
            className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-400 outline-none font-medium"
            placeholder={t('placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="w-8 h-8 bg-[#037561] rounded-2xl flex items-center justify-center disabled:opacity-40 transition-opacity active:scale-[0.95]"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
          {t('disclaimer')}
        </p>
      </div>
    </div>
  );
}
