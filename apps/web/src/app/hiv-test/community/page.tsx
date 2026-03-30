'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Post = {
  id: number;
  avatar: string;
  avatarBg: string;
  user: string;
  time: string;
  tag: string;
  tagColor: string;
  text: string;
  likes: number;
  comments: number;
  liked: boolean;
};

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    avatar: 'A',
    avatarBg: 'bg-violet-500',
    user: 'Anon#4821',
    time: '3m ago',
    tag: '#HIV Results',
    tagColor: 'bg-violet-100 text-violet-700',
    text: "Got my negative result today after weeks of anxiety. The window period explanation in the app really helped me stay calm. Retesting in 6 weeks to be sure.",
    likes: 42,
    comments: 12,
    liked: false,
  },
  {
    id: 2,
    avatar: 'B',
    avatarBg: 'bg-teal-500',
    user: 'Anon#7193',
    time: '18m ago',
    tag: '#STI Prevention',
    tagColor: 'bg-[#E6F3F0] text-[#037561]',
    text: "Is PrEP available in Addis? Looking for info on where to access it without breaking the bank.",
    likes: 18,
    comments: 7,
    liked: false,
  },
  {
    id: 3,
    avatar: 'C',
    avatarBg: 'bg-blue-500',
    user: 'Anon#2340',
    time: '1h ago',
    tag: '#HIV Results',
    tagColor: 'bg-violet-100 text-violet-700',
    text: "Second test came back negative 90 days after my last potential exposure. I can finally breathe. For anyone in the waiting period — you're not alone.",
    likes: 89,
    comments: 24,
    liked: false,
  },
  {
    id: 4,
    avatar: 'D',
    avatarBg: 'bg-rose-500',
    user: 'Anon#9911',
    time: '2h ago',
    tag: '#Support',
    tagColor: 'bg-rose-100 text-rose-700',
    text: "Just started ART this week. Nervous but the doctor said undetectable = untransmittable. Anyone else on treatment journey? How do you manage side effects?",
    likes: 31,
    comments: 15,
    liked: false,
  },
  {
    id: 5,
    avatar: 'E',
    avatarBg: 'bg-amber-500',
    user: 'Anon#5522',
    time: '3h ago',
    tag: '#STIs',
    tagColor: 'bg-[#E6F3F0] text-[#037561]',
    text: "Reminder that many STIs have no symptoms. Regular testing is the only way to know. Got screened for chlamydia and gonorrhea — all clear but glad I checked.",
    likes: 56,
    comments: 9,
    liked: false,
  },
];

const TAB_KEYS = ['all', 'hiv', 'stis', 'results', 'prep', 'support'] as const;

export default function CommunityPage() {
  const t = useTranslations('community');
  const tc = useTranslations('common');

  const [activeTab, setActiveTab] = useState('all');
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [shareText, setShareText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleLike = (id: number) => {
    setPosts((ps) =>
      ps.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const handleShare = () => {
    if (!shareText.trim()) return;
    setSubmitted(true);
    setShareText('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  const filtered =
    activeTab === 'all'
      ? posts
      : posts.filter((p) => p.tag.toLowerCase().includes(activeTab.toLowerCase()));

  return (
    <div className="flex flex-col min-h-screen pb-32">
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
            <div>
              <h1 className="font-black text-white text-xl leading-none">{t('title')}</h1>
              <p className="text-[11px] text-white/60 mt-0.5 font-medium">{t('subtitle')}</p>
            </div>
          </div>
          <p className="text-[13px] text-white/60 leading-relaxed font-medium">
            {t('description')}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide shrink-0 bg-white border-b border-slate-100">
        {TAB_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`shrink-0 text-[12px] font-black px-4 py-1.5 rounded-full transition-all ${
              activeTab === key
                ? 'bg-[#037561] text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {t(`tabs.${key}`)}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="px-4 pt-3 space-y-3 bg-[#F5FAF9] flex-1">
        {submitted && (
          <div className="bg-[#E6F3F0] border border-[#037561]/20 rounded-3xl px-4 py-3 text-[13px] text-[#037561] font-black text-center">
            {t('sharedSuccess')}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm font-medium">{t('noPostsInCategory')}</div>
        ) : (
          filtered.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl shadow-card p-4">
              <div className="flex items-center gap-2.5 mb-3">
                <div className={`w-10 h-10 ${post.avatarBg} rounded-2xl flex items-center justify-center text-white font-black text-sm`}>
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[13px] text-slate-800">{post.user}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{post.time}</span>
                  </div>
                  <span className={`inline-block text-[11px] font-black px-2 py-0.5 rounded-full mt-0.5 ${post.tagColor}`}>
                    {post.tag}
                  </span>
                </div>
              </div>
              <p className="text-[13px] text-slate-600 leading-relaxed mb-3 font-medium">{post.text}</p>
              <div className="flex items-center gap-4 pt-2.5 border-t border-slate-50">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 text-[12px] font-black transition-colors ${
                    post.liked ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.liked ? 'fill-rose-500' : ''}`} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-[12px] font-black text-slate-400 hover:text-[#037561] transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-[12px] font-black text-slate-400 hover:text-[#037561] transition-colors ml-auto">
                  <Share2 className="w-3.5 h-3.5" />
                  {tc('share')}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Share input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white/95 backdrop-blur border-t border-slate-100 px-4 py-3">
        <div className="flex items-center gap-2 bg-[#F5FAF9] rounded-3xl px-4 py-3">
          <input
            className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder-slate-400 outline-none font-medium"
            placeholder={t('placeholder')}
            value={shareText}
            onChange={(e) => setShareText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleShare()}
          />
          <button
            onClick={handleShare}
            disabled={!shareText.trim()}
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
