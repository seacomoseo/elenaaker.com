import React, { useState } from 'react';
import { translations, Language } from '../translations';
import { ASSETS } from '../constants';
import Lightbox from './Lightbox';

interface BiographyProps {
  lang: Language;
}

const Biography: React.FC<BiographyProps> = ({ lang }) => {
  const t = translations[lang].bio;
  const [lightbox, setLightbox] = useState<{ url: string, alt: string } | null>(null);
  const onOpenLightbox = (url: string, alt: string) => setLightbox({ url, alt });

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
    <>
    <section id="bio" className="py-24 md:py-32 px-6 md:px-24 bg-[#0a0a0a]">
      {/* Main Bio */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16 lg:gap-20 items-stretch mb-20 md:mb-28">
        <div className="lg:col-span-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-4 block">{t.sectionLabel}</span>
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">{t.title}</h2>
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-10 font-subtitle italic">{t.stageName}</p>
          <div className="space-y-6 text-gray-400 leading-relaxed font-light text-base md:text-lg bio-text">
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
              width={600}
              height={750}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg className="w-10 h-10 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="absolute -bottom-8 -right-8 bg-[#c5a059] text-black px-6 py-3 hidden md:block">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] font-subtitle">{t.badge}</span>
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
                <div className="text-gray-400 font-light text-base md:text-lg leading-relaxed bio-text border-l border-[#c5a059]/20 pl-6">
                  {section.text.split('\n\n').map((p, j) => (
                    <p key={j} className="mb-4" dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                </div>
              </div>
              
              {/* Image Side - height adapts to text on desktop but capped to reasonable size */}
              <div className="w-full md:w-64 lg:w-96 flex-shrink-0">
                <div 
                  className="relative p-2 border border-[#c5a059]/30 rounded overflow-hidden cursor-pointer group bg-[#111]"
                  onClick={() => onOpenLightbox(section.photo.url, section.photo.alt)}
                >
                  <img
                    src={section.photo.url}
                    alt={section.photo.alt}
                    width={section.photo.width}
                    height={section.photo.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto max-h-[450px] object-cover shadow-lg rounded-sm transition-transform duration-500 group-hover:scale-[1.03]"
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
    {lightbox && <Lightbox url={lightbox.url} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </>
  );
};

export default Biography;
