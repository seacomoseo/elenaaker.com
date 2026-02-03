
import React, { useState, useEffect, useRef } from 'react';
import { Language } from './types';
import { translations } from './translations';
import { ASSETS, ALBUMS, CONTACT_INFO } from './constants';

// --- Sub-components ---

const Navbar = ({ lang, setLang, activeSection }: { lang: Language, setLang: (l: Language) => void, activeSection: string }) => {
  const t = translations[lang].nav;
  const sections = [
    { id: 'home', label: t.home },
    { id: 'bio', label: t.bio },
    { id: 'albums', label: t.discography },
    { id: 'booking', label: t.booking },
    { id: 'downloads', label: t.downloads },
    { id: 'contact', label: t.contact },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center transition-all">
      <div className="text-xl md:text-2xl font-serif tracking-widest text-[#c5a059] uppercase">Elena Aker</div>
      
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

      <div className="flex items-center space-x-6">
        <button 
          onClick={() => setLang(lang === Language.ES ? Language.EN : Language.ES)}
          className="text-[11px] font-bold border-l border-white/20 pl-4 hover:text-[#c5a059] transition-colors"
        >
          {lang === Language.ES ? 'ENGLISH' : 'ESPAÑOL'}
        </button>
      </div>
    </nav>
  );
};

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("User interaction required for audio"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 left-[50%] translate-x-[-50%] z-50 flex items-center bg-black/80 border border-white/10 rounded-full pr-6 py-2 pl-2 shadow-2xl backdrop-blur-md">
      <audio ref={audioRef} src={ASSETS.audio} loop />
      <button 
        onClick={toggle}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#c5a059] text-black hover:bg-white transition-all transform hover:scale-105 mr-4"
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </button>
      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-widest font-bold text-[#c5a059]">Música de Fondo</span>
        <span className="text-[10px] text-gray-400 font-light truncate max-w-[100px]">Solo Arpa</span>
      </div>
    </div>
  );
};

// --- Sections ---

const Hero = ({ lang }: { lang: Language }) => {
  const t = translations[lang].hero;
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        poster={ASSETS.videoPoster}
        className="absolute w-full h-full object-cover opacity-60 scale-105"
      >
        <source src={ASSETS.videoBg} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-6xl md:text-[10rem] font-serif mb-6 leading-tight tracking-tighter opacity-0 animate-[fadeIn_1.5s_ease-out_forwards]">
          {t.title}
        </h1>
        <p className="text-sm md:text-xl uppercase tracking-[0.5em] font-light text-[#c5a059] mb-12 opacity-0 animate-[fadeIn_1.5s_ease-out_0.5s_forwards]">
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 animate-[fadeIn_1.5s_ease-out_1s_forwards]">
          <a 
            href="#booking"
            className="px-10 py-4 bg-[#c5a059] text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all"
          >
            Contratación
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

const PhotoGallery = () => {
  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {ASSETS.photos.map((photo, i) => (
          <div key={i} className={`relative group overflow-hidden rounded-sm aspect-[4/5]`}>
            <img 
              src={photo.url} 
              alt={photo.alt} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-[9px] uppercase tracking-widest font-bold border-l-2 border-[#c5a059] pl-2">{photo.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Biography = ({ lang }: { lang: Language }) => {
  const t = translations[lang].bio;
  return (
    <section id="bio" className="py-32 px-6 md:px-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-20 items-start">
        <div className="lg:col-span-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">Trayectoria</span>
          <h2 className="text-5xl font-serif mb-12">{t.title}</h2>
          <div className="space-y-8 text-gray-400 leading-relaxed font-light text-xl">
            {t.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          
          <div className="mt-16 pt-16 border-t border-white/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-8">{t.ytTitle}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CONTACT_INFO.ytLinks.map((link, idx) => (
                <a 
                  key={idx}
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center p-4 bg-white/5 border border-white/5 rounded hover:bg-white/10 transition-colors group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full mr-4 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Video {idx + 1}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 sticky top-32">
          <div className="relative p-4 border border-[#c5a059]/30 rounded">
            <img 
              src={ASSETS.photos[0].url} 
              alt="Elena Aker" 
              className="w-full aspect-[3/4] object-cover shadow-2xl grayscale"
            />
            <div className="absolute -bottom-10 -right-10 bg-[#c5a059] text-black px-8 py-4 hidden md:block">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Harpist • Composer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Discography = ({ lang }: { lang: Language }) => {
  const t = translations[lang].albums;
  return (
    <section id="albums" className="py-32 px-6 md:px-24 bg-black border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-serif mb-20 text-center text-[#c5a059]">{t.title}</h2>
        <div className="grid md:grid-cols-3 gap-16">
          {ALBUMS.map((album, idx) => (
            <div key={idx} className="group">
              <div className="relative overflow-hidden aspect-square mb-8 shadow-2xl rounded">
                <img 
                  src={album.image} 
                  alt={album.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
                  <span className="text-[10px] font-bold text-[#c5a059] uppercase tracking-[0.3em] mb-4">Disponible en:</span>
                  <div className="flex flex-wrap justify-center gap-4">
                    {Object.entries(album.links).map(([platform, url]) => (
                      <a 
                        key={platform} 
                        href={url as string} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 bg-white/10 rounded-full hover:bg-[#c5a059] hover:text-black transition-colors"
                        title={platform}
                      >
                        <span className="sr-only">{platform}</span>
                        <div className="text-[8px] font-bold uppercase w-8 text-center">{platform.slice(0, 3)}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-serif mb-2 text-white">{album.title}</h3>
              <p className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest">{album.artist}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Booking = ({ lang }: { lang: Language }) => {
  const t = translations[lang].booking;
  const categories = ['eventos', 'conciertos', 'grabaciones', 'otros'];

  return (
    <section id="booking" className="py-32 px-6 md:px-24 bg-white text-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center mb-24">
          <div className="order-2 lg:order-1">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">{t.subtitle}</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">{t.title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-light italic">
              "Elena Aker ofrece una propuesta artística versátil, adaptable tanto a las exigencias de una grabación de banda sonora en estudio como a la solemnidad de un concierto en auditorio."
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative">
              <img src={ASSETS.bookingImg} alt="Management" className="w-full h-auto object-cover shadow-2xl grayscale" />
              <div className="absolute inset-0 border-2 border-[#c5a059] -m-4 opacity-30"></div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-gray-100 border border-gray-100">
          {categories.map((cat) => {
            const data = (t as any)[cat];
            return (
              <div key={cat} className="bg-white p-12 hover:bg-gray-50 transition-colors group">
                <h3 className="text-[1.25rem] md:text-2xl font-serif mb-4 flex items-center">
                  <span className="w-8 h-px bg-[#c5a059] mr-4 group-hover:w-12 transition-all"></span>
                  {data.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8">{data.desc}</p>
                <a href="#contact" className="text-[9px] font-bold uppercase tracking-widest text-[#c5a059]">Consultar Presupuesto</a>
              </div>
            );
          })}
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-gray-400 font-serif text-2xl italic">&ldquo;{t.footer}&rdquo;</p>
          <a href="#contact" className="inline-block mt-8 px-12 py-4 bg-black text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#c5a059] transition-all">
            Solicitar Información
          </a>
        </div>
      </div>
    </section>
  );
};

const Downloads = ({ lang }: { lang: Language }) => {
  const [key, setKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const t = translations[lang].downloads;

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
    <section id="downloads" className="py-32 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-serif mb-6 text-[#c5a059]">{t.title}</h2>
        <p className="text-gray-500 uppercase tracking-widest text-[10px] mb-12">{t.locked}</p>
        
        {!isUnlocked ? (
          <div className="bg-[#111] p-12 rounded border border-white/5 max-w-lg mx-auto">
            <form onSubmit={handleUnlock} className="space-y-6">
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
            </form>
            {error && <p className="text-red-500 text-[10px] mt-6 uppercase tracking-widest">{t.error}</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left animate-[fadeIn_0.5s]">
            {['Press Kit 2024', 'Fotos HR', 'Rider Técnico', 'Logotipos'].map((item) => (
              <div key={item} className="bg-white/5 p-6 border border-white/5 flex items-center justify-between hover:border-[#c5a059] transition-colors cursor-pointer group">
                <span className="font-serif text-lg">{item}</span>
                <svg className="w-5 h-5 text-[#c5a059] group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: Language }) => {
  const t = translations[lang].contact;
  return (
    <section id="contact" className="py-32 px-6 md:px-24 bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-24">
        <div>
          <h2 className="text-5xl font-serif mb-12 text-[#c5a059]">{t.title}</h2>
          <div className="space-y-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-gray-500 mb-4">Email</p>
              <a href={`mailto:${CONTACT_INFO.email}`} className="text-2xl md:text-3xl font-light text-white hover:text-[#c5a059] transition-colors truncate block">
                {CONTACT_INFO.email}
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-gray-500 mb-4">Teléfono</p>
              <a href={`tel:${CONTACT_INFO.phone}`} className="text-2xl md:text-3xl font-light text-white hover:text-[#c5a059] transition-colors">
                {CONTACT_INFO.phone}
              </a>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-gray-500 mb-4">Social</p>
              <div className="flex gap-8">
                <a href={CONTACT_INFO.youtube} target="_blank" className="text-gray-400 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest">YouTube</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest">Spotify</a>
              </div>
            </div>
          </div>
        </div>

        <form className="bg-black/40 p-12 border border-white/5 space-y-8 rounded">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-bold tracking-widest text-gray-500">{t.name}</label>
              <input type="text" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#c5a059] transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase font-bold tracking-widest text-gray-500">{t.email}</label>
              <input type="email" className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#c5a059] transition-colors" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] uppercase font-bold tracking-widest text-gray-500">{t.message}</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#c5a059] transition-colors resize-none" />
          </div>
          <button className="px-12 py-5 bg-[#c5a059] text-black font-extrabold uppercase tracking-widest text-[10px] hover:bg-white transition-all transform hover:-translate-y-1">
            {t.send}
          </button>
        </form>
      </div>
    </section>
  );
};

// --- Main App ---

function App() {
  const [lang, setLang] = useState<Language>(Language.ES);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'bio', 'albums', 'booking', 'downloads', 'contact'];
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

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-[#c5a059] selection:text-black">
      <Navbar lang={lang} setLang={setLang} activeSection={activeSection} />
      
      <main>
        <Hero lang={lang} />
        <PhotoGallery />
        <Biography lang={lang} />
        <Discography lang={lang} />
        <Booking lang={lang} />
        <Downloads lang={lang} />
        <Contact lang={lang} />
      </main>

      <footer className="py-20 bg-black text-center border-t border-white/5">
        <div className="text-[10px] font-bold uppercase tracking-[1em] text-gray-600 mb-8">Elena Aker</div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
          &copy; {new Date().getFullYear()} elenaaker.com • Todos los derechos reservados
        </div>
      </footer>

      <AudioPlayer />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

export default App;
