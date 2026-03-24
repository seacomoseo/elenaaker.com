import React from 'react';

const Lightbox = ({ url, alt, onClose }: { url: string, alt: string, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-xl animate-fade-in" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors" onClick={onClose}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
      <img src={url} alt={alt} className="max-w-full max-h-full object-contain shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()} />
    </div>
  );
};

export default Lightbox;
