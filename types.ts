
export enum Language {
  ES = 'ES',
  EN = 'EN'
}

export interface Album {
  title: string;
  artist: string;
  image: string;
  links: {
    amazon?: string;
    apple?: string;
    spotify?: string;
    deezer?: string;
    youtubeMusic?: string;
    youtube?: string;
  };
}

export interface Photo {
  url: string;
  alt: string;
  importance: number;
}

export interface ReviewItem {
  id: string;
  date: string;
  image?: string;
  youtubeUrl?: string;
  audioUrl?: string;
  sourceUrl?: string;
}
