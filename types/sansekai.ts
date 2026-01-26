export interface SansekaiResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

// -- Common Types --
export interface DramaItem {
  bookId: string;
  title: string;
  cover: string;
  intro?: string;
  category?: string[];
  [key: string]: any;
}

export interface EpisodeItem {
  episodeNumber: number;
  url: string;
  thumbnail?: string;
  [key: string]: any;
}

export interface SearchParams {
  query: string;
  page?: number;
  limit?: number;
  offset?: number;
}

// -- DramaBox --
export interface DramaBoxDetail extends DramaItem {
  episodes: EpisodeItem[];
}

// -- ReelShort --
export interface ReelShortDetail extends DramaItem {
  episodes: EpisodeItem[];
}

// -- NetShort --
export interface NetShortItem {
  shortPlayId: string;
  title: string;
  cover: string;
  [key: string]: any;
}

// -- Melolo --
export interface MeloloItem {
  bookId: string;
  title: string;
  cover: string;
  vid?: string; // used for stream endpoint
  [key: string]: any;
}

// -- Anime --
export interface AnimeItem {
  title: string;
  url: string;
  thumb: string;
  [key: string]: any;
}

export interface AnimeDetail extends AnimeItem {
  synopsis: string;
  genres: string[];
  episodes: {
    title: string;
    url: string;
    date: string;
  }[];
}

// -- Komik --
export interface KomikItem {
  title: string;
  url: string;
  thumb: string;
  type?: string;
  [key: string]: any;
}

export interface KomikChapter {
  title: string;
  url: string;
  [key: string]: any;
}

// -- MovieBox --
export interface MovieBoxItem {
  title: string;
  url: string;
  thumb: string;
  [key: string]: any;
}
