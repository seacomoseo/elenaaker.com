import React, { useState } from 'react';
import { translations, Language } from '../translations';
import { CONTACT_INFO } from '../constants';

interface PrivateAreaProps {
  lang: Language;
}

const PrivateArea: React.FC<PrivateAreaProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const t = translations[lang].privateArea;
  const ft = translations[lang].footer;

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

  const onClose = () => {
    setIsOpen(false);
    setKey('');
    setError(false);
    setIsUnlocked(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] md:text-[13px] uppercase tracking-[0.2em] text-[#c5a059] hover:text-white transition-colors font-bold"
      >
        {ft.privateArea}
      </button>

      {isOpen && (
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
            <p className="text-gray-500 uppercase tracking-widest text-[11px] mb-8">{t.locked}</p>

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
                  className="w-full bg-[#c5a059] text-black font-bold uppercase tracking-widest text-[11px] py-4 rounded hover:bg-white transition-all"
                >
                  {t.btn}
                </button>
                {error && <p className="text-red-500 text-[10px] text-center uppercase tracking-widest">{t.error}</p>}
              </form>
            ) : (
              <div className="w-full animate-fade-in">
                <h4 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#c5a059] mb-4 text-center">{t.downloadLabel}</h4>
                <div className="flex flex-col gap-2">
                  <a href="/material-publicitario/material-grafico.zip" download className="inline-flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border border-white/5 text-gray-300 font-bold uppercase tracking-wider text-[10px] rounded hover:bg-[#c5a059] hover:text-black hover:border-[#c5a059] transition-all group">
                    {t.downloadGraphic}
                    <svg className="w-4 h-4 text-[#c5a059] group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                  <a href="/material-publicitario/fuentes-tipograficas.zip" download className="inline-flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border border-white/5 text-gray-300 font-bold uppercase tracking-wider text-[10px] rounded hover:bg-[#c5a059] hover:text-black hover:border-[#c5a059] transition-all group">
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
      )}
    </>
  );
};

export default PrivateArea;
