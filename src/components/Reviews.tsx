import React, { useRef, useState, useEffect } from 'react';
import { translations, Language } from '../translations';
import { REVIEWS } from '../constants';
import Lightbox from './Lightbox';

interface ReviewsProps {
  lang: Language;
}

const Reviews: React.FC<ReviewsProps> = ({ lang }) => {
  const t = translations[lang].reviews;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lightbox, setLightbox] = useState<{ url: string, alt: string } | null>(null);

  const onOpenLightbox = (url: string, alt: string) => setLightbox({ url, alt });

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      setCanScrollLeft(true);
      setCanScrollRight(true);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(el);

    el.addEventListener('scroll', updateScrollButtons);
    updateScrollButtons();
    window.addEventListener('resize', updateScrollButtons);

    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  useEffect(() => {
    if (!isVisible || isHovered) return;
    const timer = setInterval(() => scroll('right'), 5000);
    return () => clearInterval(timer);
  }, [isVisible, isHovered]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const cardWidth = 340;
      
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
    <section id="reviews" className="py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">{t.sectionLabel}</span>
            <h2 className="text-4xl md:text-5xl font-display font-light">{t.title}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollLeft ? 'border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black' : 'border-white/10 text-white/20 cursor-default'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${canScrollRight ? 'border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black' : 'border-white/10 text-white/20 cursor-default'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none', 
          scrollPadding: '0 2rem',
          paddingLeft: 'max(1.5rem, calc((100vw - 80rem) / 2 + 6rem))', 
          paddingRight: 'max(1.5rem, calc((100vw - 80rem) / 2 + 6rem))' 
        }}
      >
        {REVIEWS.map((review) => {
          const item = (t.items as any)[review.id];
          if (!item) return null;
          const reviewImg = typeof review.image === 'object' && review.image !== null ? (review.image as any).url : (review.image || '');
          return (
            <div
              key={review.id}
              className="flex-shrink-0 w-[300px] sm:w-[340px] snap-center bg-[#111] border border-white/5 rounded overflow-hidden hover:border-[#c5a059]/30 transition-colors flex flex-col group"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-[#c5a059]/40 bg-black cursor-pointer group/thumb relative"
                    onClick={() => {
                        if (review.youtubeUrl) window.open(review.youtubeUrl, '_blank', 'noopener,noreferrer');
                        else if (review.sourceUrl) window.open(review.sourceUrl, '_blank', 'noopener,noreferrer');
                        else onOpenLightbox(reviewImg, item.title)
                    }}
                  >
                    <img
                      src={reviewImg}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform group-hover/thumb:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                      <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2"/></svg>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-display font-light text-white leading-tight line-clamp-2">{item.title}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a059]/80 font-bold block mt-1">{review.date}</span>
                  </div>
                </div>

                <div className="relative flex-1 min-h-0 mb-2">
                  <div className="overflow-y-auto h-full pr-3 review-scroll custom-scrollbar max-h-[100px]">
                    <p className="text-gray-400 font-light text-[13px] leading-relaxed">{item.desc}</p>
                    {item.quote && (
                      <blockquote className="border-l border-[#c5a059]/30 pl-3 mt-3 italic text-gray-300 text-[11px] leading-relaxed">
                        <p>{item.quote}</p>
                        <cite className="text-[10px] text-[#c5a059]/60 tracking-wide not-italic block mt-1">— {item.quoteAuthor}</cite>
                      </blockquote>
                    )}
                    <div className="pb-2"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {review.youtubeUrl && item.watch && (
                    <a href={review.youtubeUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      {item.watch}
                    </a>
                  )}
                  {review.sourceUrl && item.source && (
                    <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
                      {item.source}
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
    {lightbox && <Lightbox url={lightbox.url} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </>
  );
};

export default Reviews;
