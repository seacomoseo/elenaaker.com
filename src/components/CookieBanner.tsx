import { useState, useEffect } from 'react';
import { Language, translations } from '../translations';

interface CookieBannerProps {
  lang: Language;
}

export default function CookieBanner({ lang }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    // Opt-out logic: Carga GA4 por defecto a menos que esté explícitamente rechazado.
    if (consent !== 'declined') {
      loadGA4();
    }
    
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const loadGA4 = () => {
    // Avoid loading multiple times
    if (document.getElementById('ga4-script')) return;

    const script1 = document.createElement('script');
    script1.id = 'ga4-script';
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-DCQJWMM25F';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-DCQJWMM25F');
    `;
    document.head.appendChild(script2);
  };

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    loadGA4();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const t = {
    es: {
      text: 'Utilizamos cookies analíticas anónimas (GA4).',
      accept: 'Aceptar',
      decline: 'Rechazar',
      policy: 'Política de Cookies'
    },
    en: {
      text: 'We use anonymous analytical cookies (GA4).',
      accept: 'Accept',
      decline: 'Decline',
      policy: 'Cookies Policy'
    }
  }[lang === Language.EN ? 'en' : 'es'];

  return (
    <div className="fixed bottom-0 md:bottom-4 left-0 md:left-4 right-0 md:right-auto z-50 p-2 md:p-3 bg-black/95 backdrop-blur-md border-t md:border-t-0 md:border border-[#c5a059]/30 md:rounded-sm text-white shadow-2xl w-full md:w-auto flex flex-row items-center justify-between gap-3 safe-area-pb">
      <div className="text-[10px] font-light text-gray-300 leading-none">
        {t.text}{' '}
        <a href={lang === Language.EN ? "/en/cookies-policy" : "/politica-cookies"} className="text-[#c5a059] hover:underline whitespace-nowrap ml-1">
          {t.policy}
        </a>
      </div>
      <div className="flex flex-row gap-1.5 flex-shrink-0">
        <button
          onClick={handleDecline}
          className="px-2 py-1.5 text-[9px] uppercase tracking-widest text-gray-400 hover:text-white transition-colors leading-none"
        >
          {t.decline}
        </button>
        <button
          onClick={handleAccept}
          className="px-3 py-1.5 text-[9px] uppercase tracking-widest text-[#0a0a0a] bg-[#c5a059] hover:bg-[#e5c079] transition-colors rounded-sm leading-none"
        >
          {t.accept}
        </button>
      </div>
    </div>
  );
}
