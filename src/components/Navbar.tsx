import React, { useState, useEffect } from 'react';
import { translations, Language } from '../translations';

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

interface NavbarProps {
  lang: Language;
  currentPath?: string;
}

const Navbar: React.FC<NavbarProps> = ({ lang, currentPath }) => {
  const t = translations[lang].nav;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <a href={(() => {
        const p = (currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/')).replace(/\.html$/, '').replace(/\/$/, '');
        const isH = p === '' || p === '/' || p === '/en' || p === '/index';
        return isH ? '#home' : (lang === Language.EN ? '/en' : '/');
      })()} className="text-xl md:text-2xl tracking-[0.3em] text-[#c5a059] uppercase font-display font-light">
        ELENA AKER
      </a>

      <div className="hidden lg:flex space-x-8 text-[11px] font-semibold uppercase tracking-[0.2em]">
        {sections.map(s => {
          const p = (currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/')).replace(/\.html$/, '').replace(/\/$/, '');
          const isHome = p === '' || p === '/' || p === '/en' || p === '/index';
          const href = isHome ? `#${s.id}` : (lang === Language.EN ? `/en#${s.id}` : `/#${s.id}`);
          return (
            <a
              key={s.id}
              href={href}
              className={`hover:text-[#c5a059] transition-colors ${activeSection === s.id ? 'text-[#c5a059]' : 'text-gray-400'}`}
            >
              {s.label}
            </a>
          );
        })}
      </div>

      <div className="flex items-center space-x-4">
        <a
          href={(() => {
            const rawPath = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
            // Clean path by removing trailing slashes, /index.html and .html
            let path = rawPath.replace(/\/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
            if (path === '') path = '/';
            
            const esToEn: Record<string, string> = { '/aviso-legal': '/en/legal-notice', '/politica-privacidad': '/en/privacy-policy', '/politica-cookies': '/en/cookies-policy', '/': '/en' };
            const enToEs: Record<string, string> = { '/en/legal-notice': '/aviso-legal', '/en/privacy-policy': '/politica-privacidad', '/en/cookies-policy': '/politica-cookies', '/en': '/' };
            
            return lang === Language.ES ? (esToEn[path] || '/en') : (enToEs[path] || '/');
          })()}
          className="flex items-center space-x-2 border-l border-white/20 pl-4 hover:opacity-80 transition-opacity"
          aria-label="Change language"
        >
          {lang === Language.ES ? <FlagGB /> : <FlagES />}
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hidden sm:inline">
            {lang === Language.ES ? 'EN' : 'ES'}
          </span>
        </a>

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
            {sections.map(s => {
              const p = (currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/')).replace(/\.html$/, '').replace(/\/$/, '');
              const isHome = p === '' || p === '/' || p === '/en' || p === '/index';
              const href = isHome ? `#${s.id}` : (lang === Language.EN ? `/en#${s.id}` : `/#${s.id}`);
              return (
                <a
                  key={s.id}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-[12px] font-semibold uppercase tracking-[0.2em] py-2 ${activeSection === s.id ? 'text-[#c5a059]' : 'text-gray-400'} hover:text-[#c5a059] transition-colors`}
                >
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
