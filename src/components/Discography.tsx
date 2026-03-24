import React, { useRef, useState, useEffect } from 'react';
import { translations, Language } from '../translations';
import { ASSETS, ALBUMS } from '../constants';
import Lightbox from './Lightbox';

interface DiscographyProps {
  lang: Language;
}

const PlatformIcons = {
  spotify: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><use href="#icon-spotify" /></svg>
  ),
  apple: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><use href="#icon-apple" /></svg>
  ),
  amazon: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 50 50"><use href="#icon-amazon" /></svg>
  ),
  deezer: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><use href="#icon-deezer" /></svg>
  ),
  youtube: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><use href="#icon-yt" /></svg>
  ),
  youtubeMusic: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><use href="#icon-yt-music" /></svg>
  ),
};


const Discography: React.FC<DiscographyProps> = ({ lang }) => {
  const t = translations[lang].albums;
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);
  const [lightbox, setLightbox] = useState<{ url: string, alt: string } | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const onOpenLightbox = (url: string, alt: string) => setLightbox({ url, alt });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
        } else if (videoRef.current) {
          videoRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const updateScrollStatus = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsScrollable(scrollWidth > clientWidth);
      setCanScrollLeft(true);
      setCanScrollRight(true);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', updateScrollStatus);
      updateScrollStatus();
      window.addEventListener('resize', updateScrollStatus);
      return () => {
        el.removeEventListener('scroll', updateScrollStatus);
        window.removeEventListener('resize', updateScrollStatus);
      };
    }
  }, []);

  useEffect(() => {
    if (!isVisible || isHovered) return;
    const timer = setInterval(() => scroll('right'), 6000);
    return () => clearInterval(timer);
  }, [isVisible, isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const cardWidth = 360;
      
      if (direction === 'left' && scrollLeft <= 20) {
        scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      } else if (direction === 'right' && scrollLeft >= scrollWidth - clientWidth - 20) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -cardWidth : cardWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      {/* Contenedor divisor para el vídeo, ya no es background de los álbumes */}
      <div className="w-full relative flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={ASSETS.videoBg}
          poster={ASSETS.videoPoster}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-auto object-cover"
        />
        {/* Degradado para transición suave en los bordes */}
        <div className="absolute top-0 left-0 right-0 h-[15%] pointer-events-none bg-gradient-to-b from-[#0a0a0a] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[15%] pointer-events-none bg-gradient-to-t from-white to-transparent" />
      </div>

    <section id="albums" className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">{lang === Language.ES ? 'Catálogo' : 'Catalog'}</span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-black">{t.title}</h2>
            </div>
            {isScrollable && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollLeft ? 'border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-white' : 'border-black/10 text-black/20 cursor-default'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollRight ? 'border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-white' : 'border-black/10 text-black/20 cursor-default'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex overflow-x-auto gap-8 pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            scrollPadding: '0 2rem',
            paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 6rem))', 
            paddingRight: 'max(1.5rem, calc((100vw - 80rem) / 2 + 6rem))' 
          }}
        >
          {ALBUMS.map((album, idx) => (
            <div key={idx} className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center group bg-gray-50 p-6 border border-gray-200 rounded-lg hover:border-[#c5a059]/40 hover:shadow-xl transition-all">
              <div className="relative overflow-hidden aspect-square mb-6 shadow-2xl rounded group/img">
                <img
                  src={album.image}
                  alt={album.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[12px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center border border-white/10">
                  <span className="text-[11px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mb-8">{t.available}</span>
                  <div className="grid grid-cols-3 gap-5">
                    {Object.entries(album.links).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 text-white/40 hover:text-white transition-all transform hover:scale-110 group/icon"
                      >
                        <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover/icon:bg-[#c5a059] group-hover/icon:text-black group-hover/icon:border-[#c5a059] transition-all">
                          {(PlatformIcons as any)[platform] ? (PlatformIcons as any)[platform]() : platform}
                        </div>
                        <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[#c5a059]">
                          {platform === 'youtubeMusic' ? 'YT Music' : platform}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-display font-light mb-2 text-black">{album.title}</h3>
              <p className="text-[11px] text-[#c5a059] font-bold uppercase tracking-widest">{album.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    {lightbox && <Lightbox url={lightbox.url} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </>
  );
};

export default Discography;
