import React, { useState, useRef } from 'react';
import { translations, Language } from '../translations';
import { ASSETS } from '../constants';

interface AudioPlayerProps {
  lang: Language;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ lang }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = translations[lang].audioPlayer;

  const toggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 inline-flex items-center bg-black/80 border border-white/10 rounded-full pr-5 py-2 pl-2 shadow-2xl backdrop-blur-md w-auto max-w-[calc(100vw-3rem)]">
      <audio ref={audioRef} src={ASSETS.audio} loop />
      <button
        onClick={toggle}
        className="w-10 h-10 min-w-[40px] flex items-center justify-center rounded-full bg-[#c5a059] text-black hover:bg-white transition-all transform hover:scale-105 mr-3"
      >
        {isPlaying ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#c5a059] truncate flex items-center gap-1">
          {t.label}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
        </span>
        <span className="text-[11px] text-gray-400 font-light truncate">{t.track}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
