'use client';

import { Play } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

const VIDEOS = [
  {
    videoId: '0_fsNp6fXHM',
    title: 'ORAQuick HIV Self-Test — How to Use',
    channel: 'ORAQuick Official',
    badge: 'ORAQuick',
  },
  {
    videoId: '4QnXVCHORLs',
    title: 'ORAQuick Step-by-Step Walkthrough',
    channel: 'Full Tutorial',
    badge: 'ORAQuick',
  },
];

export default function HowToUseVideos() {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-gray-50">
        <div className="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center">
          <Play className="w-3.5 h-3.5 text-white fill-white" />
        </div>
        <h2 className="font-extrabold text-gray-800 text-[14px]">Watch the Tutorial First</h2>
      </div>
      <div className="p-4 space-y-4">
        {VIDEOS.map((v) => (
          <VideoPlayer key={v.videoId} {...v} />
        ))}
      </div>
    </div>
  );
}
