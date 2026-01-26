import 'server-only';

import { 
  SansekaiResponse, 
  DramaItem, 
  DramaBoxDetail, 
  ReelShortDetail, 
  NetShortItem, 
  MeloloItem, 
  AnimeItem, 
  KomikItem, 
  MovieBoxItem,
  SearchParams
} from '@/types/sansekai';

const BASE_URL = 'https://api.sansekai.my.id/api';

const options = {
  method: 'GET',
  headers: {
    'accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://sansekai.my.id/'
  },
};

async function fetchSansekai<T>(endpoint: string, cacheTime: number = 3600): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      next: { revalidate: cacheTime }
    });

    if (!res.ok) {
      throw new Error(`Sansekai API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// ============================================
// DRAMABOX
// ============================================

export const dramabox = {
  getVip: () => fetchSansekai<SansekaiResponse<DramaItem[]>>('/dramabox/vip'),
  
  getDubIndo: (classify: 'terpopuler' | 'terbaru', page: number = 1) => 
    fetchSansekai<SansekaiResponse<DramaItem[]>>(`/dramabox/dubindo?classify=${classify}&page=${page}`),
  
  getRandom: () => fetchSansekai<SansekaiResponse<DramaItem>>('/dramabox/randomdrama'),
  
  getForYou: () => fetchSansekai<SansekaiResponse<DramaItem[]>>('/dramabox/foryou'),
  
  getLatest: () => fetchSansekai<SansekaiResponse<DramaItem[]>>('/dramabox/latest'),
  
  getTrending: () => fetchSansekai<SansekaiResponse<DramaItem[]>>('/dramabox/trending'),
  
  getPopularSearch: () => fetchSansekai<SansekaiResponse<string[]>>('/dramabox/populersearch'),
  
  search: (query: string) => 
    fetchSansekai<SansekaiResponse<DramaItem[]>>(`/dramabox/search?query=${encodeURIComponent(query)}`),
  
  getDetail: (bookId: string) => 
    fetchSansekai<SansekaiResponse<DramaBoxDetail>>(`/dramabox/detail?bookId=${bookId}`),
  
  getAllEpisodes: (bookId: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/dramabox/allepisode?bookId=${bookId}`)
};

// ============================================
// REELSHORT
// ============================================

export const reelshort = {
  getHomepage: () => fetchSansekai<SansekaiResponse<DramaItem[]>>('/reelshort/homepage'),
  
  getDetail: (bookId: string) => 
    fetchSansekai<SansekaiResponse<ReelShortDetail>>(`/reelshort/detail?bookId=${bookId}`),
  
  search: (query: string, page: number = 1) => 
    fetchSansekai<SansekaiResponse<DramaItem[]>>(`/reelshort/search?query=${encodeURIComponent(query)}&page=${page}`),
  
  getEpisode: (bookId: string, episodeNumber: number) => 
    fetchSansekai<SansekaiResponse<any>>(`/reelshort/episode?bookId=${bookId}&episodeNumber=${episodeNumber}`),
  
  getAllEpisodes: (bookId: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/reelshort/allepisode?bookId=${bookId}`)
};

// ============================================
// NETSHORT
// ============================================

export const netshort = {
  getTheaters: () => fetchSansekai<SansekaiResponse<NetShortItem[]>>('/netshort/theaters'),
  
  getForYou: (page: number = 1) => 
    fetchSansekai<SansekaiResponse<NetShortItem[]>>(`/netshort/foryou?page=${page}`),
  
  search: (query: string) => 
    fetchSansekai<SansekaiResponse<NetShortItem[]>>(`/netshort/search?query=${encodeURIComponent(query)}`),
  
  getAllEpisodes: (shortPlayId: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/netshort/allepisode?shortPlayId=${shortPlayId}`)
};

// ============================================
// MELOLO
// ============================================

export const melolo = {
  getLatest: () => fetchSansekai<SansekaiResponse<MeloloItem[]>>('/melolo/latest'),
  
  getTrending: () => fetchSansekai<SansekaiResponse<MeloloItem[]>>('/melolo/trending'),
  
  search: (query: string, limit: number = 10, offset: number = 0) => 
    fetchSansekai<SansekaiResponse<MeloloItem[]>>(`/melolo/search?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`),
  
  getDetail: (bookId: string) => 
    fetchSansekai<SansekaiResponse<MeloloItem>>(`/melolo/detail?bookId=${bookId}`),
  
  getStream: (videoId: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/melolo/stream?videoId=${videoId}`)
};

// ============================================
// FLICKREELS
// ============================================

export const flickreels = {
  getLatest: () => fetchSansekai<SansekaiResponse<DramaItem[]>>('/flickreels/latest'),
  
  getForYou: () => fetchSansekai<SansekaiResponse<DramaItem[]>>('/flickreels/foryou'),
  
  search: (query: string) => 
    fetchSansekai<SansekaiResponse<DramaItem[]>>(`/flickreels/search?query=${encodeURIComponent(query)}`),
  
  getHotRank: () => fetchSansekai<SansekaiResponse<any>>('/flickreels/hotrank'),
  
  getDetailAndAllEpisodes: (id: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/flickreels/detailAndAllEpisode?id=${id}`)
};

// ============================================
// FREEREELS
// ============================================

export const freereels = {
  getHomepage: () => fetchSansekai<SansekaiResponse<any>>('/freereels/homepage'),
  
  getAnimePage: () => fetchSansekai<SansekaiResponse<any>>('/freereels/animepage'),
  
  getForYou: () => fetchSansekai<SansekaiResponse<any>>('/freereels/foryou'),
  
  search: (query: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/freereels/search?query=${encodeURIComponent(query)}`),
  
  getDetailAndAllEpisodes: (id: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/freereels/detailAndAllEpisode?id=${id}`)
};

// ============================================
// ANIME
// ============================================

export const anime = {
  getLatest: () => fetchSansekai<SansekaiResponse<AnimeItem[]>>('/anime/latest'),
  
  getRecommended: () => fetchSansekai<SansekaiResponse<AnimeItem[]>>('/anime/recommended'),
  
  search: (query: string) => 
    fetchSansekai<SansekaiResponse<AnimeItem[]>>(`/anime/search?query=${encodeURIComponent(query)}`),
  
  getDetail: (url: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/anime/detail?url=${encodeURIComponent(url)}`),
  
  getMovie: () => fetchSansekai<SansekaiResponse<AnimeItem[]>>('/anime/movie'),
  
  getVideo: (url: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/anime/getvideo?url=${encodeURIComponent(url)}`)
};

// ============================================
// KOMIK
// ============================================

export const komik = {
  getRecommended: () => fetchSansekai<SansekaiResponse<KomikItem[]>>('/komik/recommended'),
  
  getLatest: () => fetchSansekai<SansekaiResponse<KomikItem[]>>('/komik/latest'),
  
  search: (query: string) => 
    fetchSansekai<SansekaiResponse<KomikItem[]>>(`/komik/search?query=${encodeURIComponent(query)}`),
  
  getPopular: () => fetchSansekai<SansekaiResponse<KomikItem[]>>('/komik/popular'),
  
  getDetail: (url: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/komik/detail?url=${encodeURIComponent(url)}`),
  
  getChapterList: (url: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/komik/chapterlist?url=${encodeURIComponent(url)}`),
  
  getImage: (url: string) => 
    fetchSansekai<SansekaiResponse<string[]>>(`/komik/getimage?url=${encodeURIComponent(url)}`)
};

// ============================================
// MOVIEBOX
// ============================================

export const moviebox = {
  getHomepage: () => fetchSansekai<SansekaiResponse<MovieBoxItem[]>>('/moviebox/homepage'),
  
  getTrending: () => fetchSansekai<SansekaiResponse<MovieBoxItem[]>>('/moviebox/trending'),
  
  search: (query: string) => 
    fetchSansekai<SansekaiResponse<MovieBoxItem[]>>(`/moviebox/search?query=${encodeURIComponent(query)}`),
  
  getDetail: (url: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/moviebox/detail?url=${encodeURIComponent(url)}`),
  
  getSources: (url: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/moviebox/sources?url=${encodeURIComponent(url)}`),
  
  generateLinkStream: (url: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/moviebox/generate-link-stream-video?url=${encodeURIComponent(url)}`)
};

// ============================================
// AI
// ============================================

export const ai = {
  cici: (message: string) => 
    fetchSansekai<SansekaiResponse<any>>(`/ai/cici?message=${encodeURIComponent(message)}`)
};
