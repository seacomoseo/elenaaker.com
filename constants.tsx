
import { Album } from './types';

export const ASSETS = {
  photos: [
    { url: '/fotos/1.jpg', alt: 'Elena Aker - Retrato Principal', importance: 1 },
    { url: '/fotos/2.jpg', alt: 'Elena Aker - Actuación', importance: 2 },
    { url: '/fotos/3.jpg', alt: 'Elena Aker - Sesión', importance: 3 },
    { url: '/fotos/4.jpg', alt: 'Elena Aker - Detalle Arpa', importance: 4 },
    { url: '/fotos/5.jpg', alt: 'Elena Aker - Concierto', importance: 5 },
    { url: '/fotos/6.jpg', alt: 'Elena Aker - Promocional', importance: 6 },
  ],
  videoBg: '/video-background.mp4',
  videoPoster: '/video-background.jpg',
  audio: '/harp-dream-solo-arpa.mp3',
  bookingImg: '/contratacion.jpg',
};

export const ALBUMS: Album[] = [
  {
    title: 'Misterios Menores',
    artist: 'Elena Aker',
    image: '/discos/elena-aker-misterios-menores.jpg',
    links: {
      amazon: 'https://music.amazon.es/artists/B0CT6RCRCJ/elena-aker',
      apple: 'https://music.apple.com/es/artist/elena-aker/1727419440',
      spotify: 'https://open.spotify.com/intl-es/artist/1EIRUTr2OYJpJwCDEGRXbX?si=lYm4ekmFRV6HMBNGNVNP4Q',
      deezer: 'https://deezer.page.link/6V2nnCP5vm7xjJ12A',
      youtubeMusic: 'https://music.youtube.com/playlist?list=OLAK5uy_lW2SsiOx21AtuCWD6PT-R_kPVZRlCUefM',
      youtube: 'https://youtu.be/jj2Xzv0rqPw?feature=shared'
    }
  },
  {
    title: 'El Secreto de las Dunas',
    artist: 'El Guardián de los Secretos',
    image: '/discos/el-guardian-de-los-secretos-el-secreto-de-las-dunas.jpg',
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
    title: 'Isis en crisis',
    artist: 'AKER',
    image: '/discos/aker-isis-en-crisis.jpg',
    links: {
      amazon: 'https://music.amazon.es/artists/B008TAUZZ8/aker',
      apple: 'https://music.apple.com/es/artist/aker/1744640528',
      spotify: 'https://open.spotify.com/intl-es/artist/1estKmE2ZH5Yu0JbqLSnCS?si=x_sQfjTXSd2a92t7Y9-8Cg',
      deezer: 'https://deezer.page.link/GHL2uf6CVeNF943HA',
      youtubeMusic: 'https://music.youtube.com/channel/UCrUXZa92MA7k7YKpLfb3nhw?feature=shared',
      youtube: 'https://www.youtube.com/watch?v=G5DBMnbHQ28&list=OLAK5uy_mPzmK4RM0W1mhuPNVNlsNuabh2Af2gfv0&index=2'
    }
  }
];

export const CONTACT_INFO = {
  email: 'elenaaker@gmail.com',
  phone: '+34 637335060',
  youtube: 'https://www.youtube.com/@elenaaker',
  accessKey: '4k3r...',
  ytLinks: [
    'https://youtu.be/jj2Xzv0rqPw',
    'https://www.youtube.com/watch?v=G5DBMnbHQ28'
  ]
};
