
import { Album, ReviewItem } from './types';

export const ASSETS = {
  photos: [
    { url: '/src/fotos/1.jpg', alt: 'Elena Aker - Retrato con arpa sinfónica', importance: 1 },
    { url: '/src/fotos/2.jpg', alt: 'Elena Aker - Actuación en palacio', importance: 2 },
    { url: '/src/fotos/3.jpg', alt: 'Elena Aker - Arpa celta en escena', importance: 3 },
    { url: '/src/fotos/4.jpg', alt: 'Elena Aker - Interpretación urbana', importance: 4 },
    { url: '/src/fotos/5.jpg', alt: 'Elena Aker - Arpa en la playa', importance: 5 },
    { url: '/src/fotos/6.jpg', alt: 'Elena Aker - Calle en blanco y negro', importance: 6 },
    { url: '/src/fotos/museo-del-prado.jpg', alt: 'Elena Aker - Museo Nacional del Prado', importance: 7 },
    { url: '/src/fotos/7.jpg', alt: 'Elena Aker - Retrato', importance: 8 },
    { url: '/src/fotos/8.jpg', alt: 'Elena Aker - Retrato artístico', importance: 9 },
    { url: '/src/fotos/9.jpg', alt: 'Elena Aker - En directo', importance: 10 },
    { url: '/src/fotos/10.jpg', alt: 'Elena Aker - Sesión fotográfica', importance: 11 },
  ],
  heroImg: '/src/fotos/1.jpg',
  videoBg: '/src/video-background.mp4',
  videoPoster: '/src/video-background.jpg',
  audio: '/src/audio/harp-dream-solo-arpa.mp3',
  bookingImg: '/src/contratacion.jpg',
  icon: '/src/icon.png',
};

// Albums in reversed order per client request (newest first → oldest last)
export const ALBUMS: Album[] = [
  {
    title: 'Isis en crisis',
    artist: 'AKER',
    image: '/src/discos/aker-isis-en-crisis.jpg',
    links: {
      amazon: 'https://music.amazon.es/artists/B008TAUZZ8/aker',
      apple: 'https://music.apple.com/es/artist/aker/1744640528',
      spotify: 'https://open.spotify.com/intl-es/artist/1estKmE2ZH5Yu0JbqLSnCS?si=x_sQfjTXSd2a92t7Y9-8Cg',
      deezer: 'https://deezer.page.link/GHL2uf6CVeNF943HA',
      youtubeMusic: 'https://music.youtube.com/channel/UCrUXZa92MA7k7YKpLfb3nhw?feature=shared',
      youtube: 'https://www.youtube.com/watch?v=G5DBMnbHQ28&list=OLAK5uy_mPzmK4RM0W1mhuPNVNlsNuabh2Af2gfv0&index=2'
    }
  },
  {
    title: 'El Secreto de las Dunas',
    artist: 'El Guardián de los Secretos',
    image: '/src/discos/el-guardian-de-los-secretos-el-secreto-de-las-dunas.jpg',
    links: {
      amazon: 'https://music.amazon.es/artists/B0CX7F4FPT/el-guardi%C3%A1n-de-los-secretos?marketplaceId=A1RKKUPIHCS9HS&musicTerritory=ES&ref=dm_sh_4gqDtskmoYQjhFXyli0qk8P3D',
      apple: 'https://music.apple.com/es/artist/el-guardi%C3%A1n-de-los-secretos/1745814013',
      spotify: 'https://open.spotify.com/intl-es/artist/2dX3fxtRjpaCvCh3L9BG6a?si=u7jwOtOCQuS8Gc5aUiUPuQ',
      deezer: 'https://deezer.page.link/5sCYBPpmHveHNgks5',
      youtubeMusic: 'https://music.youtube.com/channel/UC6UqhJWJZUv7cqxT3aBi-9Q?feature=shared',
      youtube: 'https://www.youtube.com/channel/UC6UqhJWJZUv7cqxT3aBi-9Q'
    }
  },
  {
    title: 'Misterios Menores',
    artist: 'Elena Aker',
    image: '/src/discos/elena-aker-misterios-menores.jpg',
    links: {
      amazon: 'https://music.amazon.es/artists/B0CT6RCRCJ/elena-aker',
      apple: 'https://music.apple.com/es/artist/elena-aker/1727419440',
      spotify: 'https://open.spotify.com/intl-es/artist/1EIRUTr2OYJpJwCDEGRXbX?si=lYm4ekmFRV6HMBNGNVNP4Q',
      deezer: 'https://deezer.page.link/6V2nnCP5vm7xjJ12A',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_lW2SsiOx21AtuCWD6PT-R_kPVZRlCUefM',
      youtube: 'https://youtu.be/jj2Xzv0rqPw?feature=shared'
    }
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'mahler',
    date: '2004',
    image: '/src/fotos/adagietto-mahler.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=tChniKLgbjo',
    sourceUrl: '/src/prensa/critica-mahler.jpg',
  },
  {
    id: 'harpDream',
    date: '2024',
    image: 'https://img.youtube.com/vi/xTIItHIVAW8/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=xTIItHIVAW8',
  },
  {
    id: 'trueba',
    date: '2015-07-15',
    image: '/src/prensa/colaboracion-trueba-sanz.jpg',
    sourceUrl: 'https://www.imdb.com/title/tt1753345/',
  },
  {
    id: 'museoPrado',
    date: '2016-10-24',
    image: '/src/fotos/museo-del-prado.jpg',
    sourceUrl: 'https://www.museodelprado.es/',
  },
  {
    id: 'coralPeniscola',
    date: '2016-09-14',
    image: '/src/prensa/coral-peniscola.jpg',
    sourceUrl: 'https://fecocova.es/coros-federados/asociacion-coral-polifonica-peniscola/',
  },
  {
    id: 'videoclipRascafria',
    date: '2016-09-21',
    image: '/src/prensa/videoclip-rascafria.jpg',
    sourceUrl: 'https://www.rascafria.org/',
  },
  {
    id: 'nouForcat',
    date: '2016',
    image: 'https://img.youtube.com/vi/kS_T14VTCE0/hqdefault.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=kS_T14VTCE0',
  },
];

export const CONTACT_INFO = {
  email: 'elenaaker@gmail.com',
  phone: '+34 637 33 50 60',
  youtube: 'https://www.youtube.com/@elenaaker',
  accessKey: '4k3r...',
};
