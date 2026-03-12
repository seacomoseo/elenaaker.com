
import React, { useState, useEffect, useRef } from 'react';
import { Language } from './types';
import { translations } from './translations';
import { ASSETS, ALBUMS, REVIEWS, CONTACT_INFO } from './constants';

// --- SVG Icons ---

const FlagES = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" rx="1" fill="#C60B1E"/>
    <rect y="3.5" width="20" height="7" fill="#FFC400"/>
  </svg>
);
const FlagGB = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="20" height="14" rx="1" fill="#012169"/>
    <path d="M0 0L20 14M20 0L0 14" stroke="white" strokeWidth="2.5"/>
    <path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.5"/>
    <path d="M10 0V14M0 7H20" stroke="white" strokeWidth="4"/>
    <path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2.5"/>
  </svg>
);

const PlatformIcons = {
  spotify: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
  ),
  apple: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z"/></svg>
  ),
  amazon: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M36,5H14c-4.971,0-9,4.029-9,9v22c0,4.971,4.029,9,9,9h22c4.971,0,9-4.029,9-9V14C45,9.029,40.971,5,36,5z M38.19,21.254	c0.65-0.279,1.42-0.317,2.07-0.121c0.27,0.084,0.51,0.196,0.74,0.335v1.23c-0.72-0.494-1.55-0.634-2.19-0.289	c-0.68,0.373-1.08,1.155-1.06,1.975c-0.01,0.904,0.29,1.742,0.92,2.133c0.56,0.382,1.44,0.382,2.33,0.242v1.025	c-0.35,0.112-0.72,0.177-1.1,0.214c-0.63,0.047-1.33-0.047-1.95-0.382c-0.63-0.326-1.09-0.894-1.35-1.463	c-0.25-0.587-0.34-1.183-0.35-1.752C36.22,23.191,36.87,21.831,38.19,21.254z M34,18.01c0.552,0,1,0.448,1,1s-0.448,1-1,1	s-1-0.448-1-1S33.448,18.01,34,18.01z M34.75,21.01v7h-1.5v-7H34.75z M27,26.175c0.64,0.261,1.42,0.532,2.03,0.59	c0.61,0.068,1.28-0.01,1.67-0.223c0.19-0.116,0.23-0.278,0.23-0.458s-0.036-0.282-0.123-0.417c-0.159-0.246-0.597-0.432-1.287-0.597	c-0.34-0.097-0.71-0.194-1.12-0.416c-0.41-0.184-1.243-0.852-1.081-1.991c0.087-0.609,0.718-1.205,1.601-1.483	c1.029-0.325,2.15-0.164,3.08,0.281V22.7c-0.83-0.426-1.82-0.641-2.66-0.361c-0.25,0.077-0.58,0.251-0.58,0.564	c0,0.751,0.87,0.893,1.2,1c0.34,0.106,0.71,0.203,1.11,0.406c0.4,0.194,1.202,0.678,1.202,1.783c0,1.058-0.522,1.447-0.952,1.621	c-0.89,0.387-1.68,0.319-2.45,0.213c-0.65-0.116-1.28-0.31-1.87-0.677C27,27.249,27,26.175,27,26.175z M20.25,21.012l1.5-0.002	l0.003,2.42c0.014,0.79,0.012,1.651,0.003,2.383c-0.035,0.391,0.402,0.847,0.976,0.917c0.306,0.034,0.534,0.009,0.886-0.14	c0.208-0.082,0.42-0.152,0.632-0.225V21.01l1.5,0.001v6.818h-1.5v-0.236c-0.041,0.022-0.08,0.046-0.12,0.067	c-0.381,0.228-0.992,0.386-1.514,0.343c-0.542-0.035-1.088-0.225-1.533-0.586c-0.442-0.356-0.776-0.915-0.819-1.529	c-0.027-0.88-0.02-1.634-0.011-2.457L20.25,21.012z M9.25,21.01h1.5v0.688c0.37-0.134,0.737-0.274,1.109-0.401	c0.535-0.19,1.206-0.152,1.733,0.141c0.218,0.117,0.409,0.282,0.577,0.469c0.562-0.208,1.123-0.417,1.689-0.611	c0.535-0.19,1.206-0.152,1.733,0.141c0.532,0.286,0.946,0.809,1.093,1.418c0.039,0.152,0.056,0.306,0.065,0.461l0.004,0.317	l0.006,0.625l-0.006,1.25l-0.003,2.5h-1.5l-0.006-4.844c-0.042-0.425-0.519-0.797-1.019-0.661c-0.51,0.135-1.024,0.255-1.537,0.379	c0.034,0.143,0.052,0.287,0.061,0.433l0.004,0.317l0.006,0.625l-0.006,1.25l-0.003,2.5h-1.5l-0.006-4.844	c-0.042-0.426-0.519-0.797-1.019-0.661c-0.489,0.13-0.983,0.245-1.475,0.364v5.14h-1.5C9.25,28.006,9.25,21.01,9.25,21.01z M38.768,33.932c-2.214,1.57-4.688,2.605-7.285,3.277c-2.595,0.663-5.297,0.914-7.986,0.729c-2.688-0.18-5.313-0.836-7.787-1.794	c-2.466-0.99-4.797-2.263-6.857-3.931c-0.107-0.087-0.124-0.245-0.037-0.352c0.077-0.095,0.209-0.119,0.313-0.063l0.014,0.008	c2.249,1.217,4.653,2.149,7.067,2.889c2.433,0.692,4.909,1.187,7.4,1.288c2.485,0.087,4.997-0.107,7.449-0.617	c2.442-0.504,4.905-1.236,7.17-2.279l0.039-0.018c0.251-0.115,0.547-0.006,0.663,0.245C39.035,33.537,38.961,33.796,38.768,33.932z M39.882,36.892c-0.278,0.21-0.556,0.14-0.417-0.21c0.417-1.12,1.32-3.501,0.903-4.061c-0.486-0.63-2.987-0.28-4.098-0.14	c-0.347,0-0.347-0.28-0.069-0.49c0.972-0.7,2.292-0.98,3.404-0.98c1.111,0,2.084,0.21,2.292,0.56	C42.243,31.99,41.757,35.281,39.882,36.892z"/></svg>
  ),
  deezer: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M.693 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807C.312 4.41 0 5.666 0 7.217s.312 2.808.693 2.808ZM21.038 1.56c-.364 0-.684.805-.91 2.096C19.765 1.446 19.184 0 18.526 0c-.78 0-1.464 2.036-1.784 5-.312-2.158-.788-3.536-1.325-3.536-.745 0-1.386 2.704-1.62 6.472-.442-1.932-1.083-3.145-1.793-3.145s-1.35 1.213-1.793 3.145c-.242-3.76-.874-6.463-1.628-6.463-.537 0-1.013 1.378-1.325 3.535C6.938 2.036 6.262 0 5.474 0c-.658 0-1.247 1.447-1.602 3.665-.217-1.291-.546-2.105-.91-2.105-.675 0-1.221 2.807-1.221 6.272 0 3.466.546 6.273 1.221 6.273.277 0 .537-.476.736-1.273.32 2.928.996 4.938 1.776 4.938.606 0 1.143-1.204 1.507-3.11.251 3.622.875 6.195 1.602 6.195.46 0 .875-1.023 1.187-2.677C10.142 21.6 11 24 12.004 24c1.005 0 1.863-2.4 2.235-5.822.312 1.654.727 2.677 1.186 2.677.728 0 1.352-2.573 1.603-6.195.364 1.906.9 3.11 1.507 3.11.78 0 1.455-2.01 1.775-4.938.208.797.46 1.273.737 1.273.675 0 1.22-2.807 1.22-6.273-.008-3.457-.553-6.272-1.23-6.272ZM23.307 10.024c.381 0 .693-1.256.693-2.807 0-1.55-.312-2.807-.693-2.807-.381 0-.693 1.256-.693 2.807s.312 2.808.693 2.808Z"/></svg>
  ),
  youtube: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  ),
  youtubeMusic: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228s6.228-2.796 6.228-6.228S15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/></svg>
  ),
};

// --- Helper Functions ---
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

// --- Sub-components ---

const Navbar = ({ lang, setLang, activeSection }: { lang: Language, setLang: (l: Language) => void, activeSection: string }) => {
  const t = translations[lang].nav;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sections = [
    { id: 'home', label: t.home },
    { id: 'bio', label: t.bio },
    { id: 'services', label: t.services },
    { id: 'reviews', label: t.reviews },
    { id: 'albums', label: t.discography },
    { id: 'contact', label: t.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center transition-all">
      <a href="#home" className="text-xl md:text-2xl tracking-[0.3em] text-[#c5a059] uppercase font-display font-light">
        ELENA AKER
      </a>

      <div className="hidden lg:flex space-x-8 text-[10px] font-semibold uppercase tracking-[0.2em]">
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`hover:text-[#c5a059] transition-colors ${activeSection === s.id ? 'text-[#c5a059]' : 'text-gray-400'}`}
          >
            {s.label}
          </a>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => setLang(lang === Language.ES ? Language.EN : Language.ES)}
          className="flex items-center space-x-2 border-l border-white/20 pl-4 hover:opacity-80 transition-opacity"
          aria-label="Change language"
        >
          {lang === Language.ES ? <FlagGB /> : <FlagES />}
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400 hidden sm:inline">
            {lang === Language.ES ? 'EN' : 'ES'}
          </span>
        </button>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col space-y-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-px bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
          <span className={`w-5 h-px bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-px bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/5 lg:hidden animate-fade-in">
          <div className="flex flex-col py-6 px-8 space-y-4">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`text-[11px] font-semibold uppercase tracking-[0.2em] py-2 ${activeSection === s.id ? 'text-[#c5a059]' : 'text-gray-400'} hover:text-[#c5a059] transition-colors`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const AudioPlayer = ({ lang }: { lang: Language }) => {
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
        <span className="text-[9px] uppercase tracking-widest font-bold text-[#c5a059] truncate">{t.label}</span>
        <span className="text-[10px] text-gray-400 font-light truncate">{t.track}</span>
      </div>
    </div>
  );
};

// --- Sections ---

const Hero = ({ lang }: { lang: Language }) => {
  const t = translations[lang].hero;
  return (
    <section id="home" className="relative h-screen flex flex-col justify-end overflow-hidden pb-16 md:pb-24">
      <div
        className="absolute inset-0 bg-cover bg-[center_10%] bg-fixed"
        style={{ backgroundImage: `url(${ASSETS.heroImg})` }}
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      <div className="relative z-10 text-center md:text-left px-6 md:px-24 w-full">
        <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-display mb-4 leading-none tracking-[0.1em] md:tracking-[0.15em] font-light uppercase whitespace-nowrap opacity-0 animate-[fadeIn_1.5s_ease-out_forwards]">
          {t.title}
        </h1>
        <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.4em] md:tracking-[0.5em] font-subtitle text-[#c5a059] mb-8 md:mb-12 opacity-0 animate-[fadeIn_1.5s_ease-out_0.5s_forwards]">
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-5 opacity-0 animate-[fadeIn_1.5s_ease-out_1s_forwards]">
          <a
            href="#services"
            className="px-10 py-4 bg-[#c5a059] text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all"
          >
            {t.ctaBooking}
          </a>
          <a
            href="#bio"
            className="px-10 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

const Biography = ({ lang, onOpenLightbox }: { lang: Language, onOpenLightbox: (url: string, alt: string) => void }) => {
  const t = translations[lang].bio;

  const bioSections = [
    {
      heading: lang === Language.ES ? 'Trayectoria como Arpista' : 'Career as Harpist',
      text: t.extendedCareer,
      photo: ASSETS.photos[2],
    },
    {
      heading: lang === Language.ES ? 'Hitos Destacados' : 'Career Highlights',
      text: t.extendedHighlights,
      photo: ASSETS.photos[3],
    },
    {
      heading: lang === Language.ES ? 'Composición y Producción' : 'Composition & Production',
      text: t.extendedComposition,
      photo: ASSETS.photos[4],
    },
    {
      heading: lang === Language.ES ? 'Hospitalidad de Lujo' : 'Luxury Hospitality',
      text: t.extendedHospitality,
      photo: ASSETS.photos[9],
    },
    {
      heading: lang === Language.ES ? 'Trayectoria Vocal y Visión Artística' : 'Vocal Career & Artistic Vision',
      text: t.extendedSinger + '\n\n' + t.extendedVision,
      photo: ASSETS.photos[8],
      isVision: true,
    },
    {
      heading: lang === Language.ES ? 'Legado Educativo' : 'Educational Legacy',
      text: t.extendedLegacy,
      photo: ASSETS.photos[5],
    },
  ];

  return (
    <section id="bio" className="py-24 md:py-32 px-6 md:px-24 bg-[#0a0a0a]">
      {/* Main Bio */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16 lg:gap-20 items-stretch mb-20 md:mb-28">
        <div className="lg:col-span-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">{t.sectionLabel}</span>
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">{t.title}</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-10 font-subtitle italic">{t.stageName}</p>
          <div className="space-y-6 text-gray-400 leading-relaxed font-light text-base md:text-lg">
            {t.summary.split('\n\n').map((para, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div 
            className="relative p-3 border border-[#c5a059]/30 rounded h-full cursor-pointer group"
            onClick={() => onOpenLightbox(ASSETS.photos[1].url, "Elena Aker")}
          >
            <img
              src={ASSETS.photos[1].url}
              alt="Elena Aker"
              className="w-full h-full object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg className="w-10 h-10 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#c5a059] text-black px-6 py-3 hidden md:block">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-subtitle">{t.badge}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subsections with image height matching text */}
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
        {bioSections.map((section, i) => {
          const isImageLeft = i % 2 === 0;
          return (
            <div
              key={i}
              className={`flex flex-col ${isImageLeft ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-14 items-center`}
            >
              {/* Text Side */}
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-display font-light mb-4 text-white tracking-wide">{section.heading}</h3>
                <div className={`text-gray-400 font-light text-base md:text-lg leading-relaxed ${section.isVision ? 'border-l border-[#c5a059]/20 pl-6' : ''}`}>
                  {section.text.split('\n\n').map((p, j) => (
                    <p key={j} className="mb-4" dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              </div>
              
              {/* Image Side - height adapts to text on desktop but capped to reasonable size */}
              <div className="w-full md:w-64 lg:w-96 flex-shrink-0">
                <div 
                  className="relative p-2 border border-[#c5a059]/30 rounded overflow-hidden cursor-pointer group"
                  onClick={() => onOpenLightbox(section.photo.url, section.photo.alt)}
                >
                  <img
                    src={section.photo.url}
                    alt={section.photo.alt}
                    className="w-full h-auto object-cover shadow-lg rounded-sm transition-transform duration-500 group-hover:scale-[1.03] max-h-[450px]"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Services = ({ lang }: { lang: Language }) => {
  const t = translations[lang].services;
  const categoryKeys = ['heritage', 'goldenCeremony', 'hospitality', 'composition', 'emeraldSensory', 'privateResonance'] as const;

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-24 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">{t.sectionLabel}</span>
          <h2 className="text-4xl md:text-5xl font-display font-light mb-6 text-left">{t.title}</h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-2xl font-light text-left">
            {t.intro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 mb-20">
          {categoryKeys.map((key) => {
            const cat = t.categories[key];
            return (
              <div key={key} className="bg-white p-8 md:p-10 hover:bg-gray-50 transition-colors group">
                <h3 className="text-lg md:text-xl font-display font-light mb-1 flex items-baseline">
                  <span className="w-6 h-px bg-[#c5a059] mr-3 group-hover:w-8 transition-all duration-300 flex-shrink-0  translate-y-[-.33em]" />
                  {cat.title}
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-[#c5a059] font-bold mb-4 font-subtitle pl-9 group-hover:pl-[44px] transition-all duration-300">
                  {cat.subtitle}
                </p>
                <p className="text-gray-500 font-light leading-relaxed text-sm mb-6">{cat.desc}</p>
                <a href="#contact" className="text-[10px] font-bold uppercase tracking-widest text-[#c5a059] hover:text-black transition-colors">{t.cta}</a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Reviews = ({ lang, onOpenLightbox }: { lang: Language, onOpenLightbox: (url: string, alt: string) => void }) => {
  const t = translations[lang].reviews;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const updateScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(true); // Loop always allows
      setCanScrollRight(true); // Loop always allows
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
    <section id="reviews" className="py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">{t.sectionLabel}</span>
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
          const reviewImg = review.image || '';
          return (
            <div
              key={review.id}
              className="flex-shrink-0 w-[300px] sm:w-[340px] snap-center bg-[#111] border border-white/5 rounded overflow-hidden hover:border-[#c5a059]/30 transition-colors flex flex-col group"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-[#c5a059]/40 bg-black cursor-pointer group/thumb relative"
                    onClick={() => onOpenLightbox(reviewImg, item.title)}
                  >
                    <img
                      src={reviewImg}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform group-hover/thumb:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                      <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="2"/></svg>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-display font-light text-white leading-tight line-clamp-2">{item.title}</h3>
                    <span className="text-[9px] uppercase tracking-widest text-[#c5a059]/80 font-bold block mt-1">{review.date}</span>
                  </div>
                </div>

                <div className="relative flex-1 min-h-0 mb-2">
                  <div className="overflow-y-auto h-full pr-3 review-scroll custom-scrollbar max-h-[100px]">
                    <p className="text-gray-400 font-light text-[13px] leading-relaxed">{item.desc}</p>
                    {item.quote && (
                      <blockquote className="border-l border-[#c5a059]/30 pl-3 mt-3 italic text-gray-300 text-[11px] leading-relaxed">
                        <p>{item.quote}</p>
                        <cite className="text-[9px] text-[#c5a059]/60 tracking-wide not-italic block mt-1">— {item.quoteAuthor}</cite>
                      </blockquote>
                    )}
                    <div className="pb-2"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#111] to-transparent pointer-events-none" />
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                  {review.youtubeUrl && item.watch && (
                    <a href={review.youtubeUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-500 text-[9px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                      {item.watch}
                    </a>
                  )}
                  {review.sourceUrl && item.source && (
                    <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400 text-[9px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all">
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
  );
};

const Discography = ({ lang }: { lang: Language }) => {
  const t = translations[lang].albums;
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrollable, setIsScrollable] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    <section id="albums" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={ASSETS.videoBg}
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">{lang === Language.ES ? 'Catálogo' : 'Catalog'}</span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-white">{t.title}</h2>
            </div>
            {isScrollable && (
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
            <div key={idx} className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center group bg-black/40 p-6 border border-white/5 rounded-lg backdrop-blur-sm hover:border-[#c5a059]/40 transition-all">
              <div className="relative overflow-hidden aspect-square mb-6 shadow-2xl rounded group/img">
                <img
                  src={album.image}
                  alt={album.title}
                  className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
                  <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.4em] mb-8">{t.available}</span>
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
                        <span className="text-[7px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[#c5a059]">
                          {platform === 'youtubeMusic' ? 'YT Music' : platform}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-display font-light mb-2 text-white">{album.title}</h3>
              <p className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest">{album.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: Language }) => {
  const t = translations[lang].contact;
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-display font-light mb-12 text-[#c5a059]">{t.title}</h2>
          <div className="space-y-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-gray-500 mb-3">Email</p>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-xl md:text-2xl font-light text-white hover:text-[#c5a059] transition-colors truncate block">
                {CONTACT_INFO.email}
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-gray-500 mb-3">{lang === Language.ES ? 'Teléfono' : 'Phone'}</p>
              <a href={`tel:${CONTACT_INFO.phone}`} className="text-xl md:text-2xl font-light text-white hover:text-[#c5a059] transition-colors">
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={ASSETS.bookingImg}
            alt="Elena Aker — Contratación"
            className="w-full max-w-md rounded-lg shadow-2xl border border-white/5"
          />
        </div>
      </div>
    </section>
  );
};

const PrivateArea = ({ lang, onClose }: { lang: Language, onClose: () => void }) => {
  const [key, setKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const t = translations[lang].privateArea;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === CONTACT_INFO.accessKey) {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center modal-backdrop bg-black/80" onClick={onClose}>
      <div
        className="bg-[#111] border border-white/10 rounded max-w-lg w-[90vw] p-8 md:p-12 relative animate-[scaleIn_0.3s_ease-out]"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>

        <h3 className="text-2xl font-display font-light text-[#c5a059] mb-2">{t.title}</h3>
        <p className="text-gray-500 uppercase tracking-widest text-[10px] mb-8">{t.locked}</p>

        {!isUnlocked ? (
          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={t.placeholder}
              className="w-full bg-black border border-white/10 px-6 py-4 rounded text-white text-center focus:border-[#c5a059] outline-none transition-all"
            />
            <button
              type="submit"
              className="w-full bg-[#c5a059] text-black font-bold uppercase tracking-widest text-[10px] py-4 rounded hover:bg-white transition-all"
            >
              {t.btn}
            </button>
            {error && <p className="text-red-500 text-[10px] text-center uppercase tracking-widest">{t.error}</p>}
          </form>
        ) : (
          <div className="w-full animate-fade-in">
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#c5a059] mb-4 text-center">{t.downloadLabel}</h4>
            <div className="flex flex-col gap-2">
              <a href="/material-publicitario/material-grafico.zip" download className="inline-flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border border-white/5 text-gray-300 font-bold uppercase tracking-wider text-[9px] rounded hover:bg-[#c5a059] hover:text-black hover:border-[#c5a059] transition-all group">
                {t.downloadGraphic}
                <svg className="w-4 h-4 text-[#c5a059] group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/material-publicitario/fuentes-tipograficas.zip" download className="inline-flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border border-white/5 text-gray-300 font-bold uppercase tracking-wider text-[9px] rounded hover:bg-[#c5a059] hover:text-black hover:border-[#c5a059] transition-all group">
                {t.downloadFonts}
                <svg className="w-4 h-4 text-[#c5a059] group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/material-publicitario/videos-contrataciones/teatro-real-de-madrid.mp4" download className="inline-flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border border-white/5 text-gray-300 font-bold uppercase tracking-wider text-[9px] rounded hover:bg-[#c5a059] hover:text-black hover:border-[#c5a059] transition-all group">
                {t.downloadVideoTeatro}
                <svg className="w-4 h-4 text-[#c5a059] group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/material-publicitario/videos-contrataciones/museo-del-prado.mp4" download className="inline-flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border border-white/5 text-gray-300 font-bold uppercase tracking-wider text-[9px] rounded hover:bg-[#c5a059] hover:text-black hover:border-[#c5a059] transition-all group">
                {t.downloadVideoPrado}
                <svg className="w-4 h-4 text-[#c5a059] group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="/material-publicitario/videos-contrataciones/ruinas-romanas.mp4" download className="inline-flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border border-white/5 text-gray-300 font-bold uppercase tracking-wider text-[9px] rounded hover:bg-[#c5a059] hover:text-black hover:border-[#c5a059] transition-all group">
                {t.downloadVideoRomanas}
                <svg className="w-4 h-4 text-[#c5a059] group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

function App() {
  const [lang, setLang] = useState<Language>(Language.ES);
  const [activeSection, setActiveSection] = useState('home');
  const [showPrivateArea, setShowPrivateArea] = useState(false);
  const [lightbox, setLightbox] = useState<{ url: string, alt: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'bio', 'services', 'reviews', 'albums', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const ft = translations[lang].footer;
  const onOpenLightbox = (url: string, alt: string) => setLightbox({ url, alt });

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c5a059] selection:text-black">
      <Navbar lang={lang} setLang={setLang} activeSection={activeSection} />

      <main>
        <Hero lang={lang} />
        <Biography lang={lang} onOpenLightbox={onOpenLightbox} />
        <Services lang={lang} />
        <Reviews lang={lang} onOpenLightbox={onOpenLightbox} />
        <Discography lang={lang} />
        <Contact lang={lang} />
      </main>

      <footer className="pt-16 pb-28 md:pt-20 md:pb-36 bg-black text-center border-t border-white/5">
        <div className="text-[13px] md:text-[15px] font-display font-light uppercase tracking-[0.8em] md:tracking-[1em] text-gray-500 mb-6">ELENA AKER</div>
        <div className="mb-6">
          <button
            onClick={() => setShowPrivateArea(true)}
            className="text-[11px] md:text-[13px] uppercase tracking-[0.2em] text-[#c5a059] hover:text-white transition-colors font-bold"
          >
            {ft.privateArea}
          </button>
        </div>
        <div className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gray-600">
          &copy; {new Date().getFullYear()} elenaaker.com &middot; {ft.rights}
        </div>
      </footer>

      <AudioPlayer lang={lang} />

      {showPrivateArea && (
        <PrivateArea lang={lang} onClose={() => setShowPrivateArea(false)} />
      )}

      {lightbox && (
        <Lightbox url={lightbox.url} alt={lightbox.alt} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}

export default App;
