'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  channel?: string;
  badge?: string;
}

export default function VideoPlayer({ videoId, title, channel, badge }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className="rounded-2xl overflow-hidden ring-1 ring-gray-100">
      {/* Video / Thumbnail */}
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/25" />
            {badge && (
              <span className="absolute top-2.5 left-3 bg-teal-400 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full tracking-wider uppercase z-10">
                {badge}
              </span>
            )}
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label={`Play ${title}`}
            >
              <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:bg-white group-hover:scale-110 transition-all">
                <Play className="w-6 h-6 text-purple-700 fill-purple-700 ml-0.5" />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Meta */}
      <div className="bg-white px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
          <Play className="w-3 h-3 text-white fill-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-gray-800 leading-snug">{title}</p>
          {channel && <p className="text-[11px] text-gray-400 mt-0.5">{channel}</p>}
        </div>
      </div>
    </div>
  );
}
