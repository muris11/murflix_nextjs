/**
 * TMDB API related constants
 */

// Items per page/section
export const ITEMS_PER_PAGE = 20;
export const HERO_ITEMS_COUNT = 5;
export const RECOMMENDATIONS_COUNT = 12;
export const SIMILAR_COUNT = 12;
export const CAST_DISPLAY_COUNT = 10;

// Cache durations (in seconds)
export const CACHE_DURATION = {
  trending: 3600,       // 1 hour
  popular: 3600,        // 1 hour
  details: 86400,       // 24 hours
  configuration: 604800, // 7 days
} as const;

// Genre mappings for quick reference
export const GENRES = {
  // Movie genres
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  // TV genres
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
} as const;

// Image sizes available from TMDB
export const IMAGE_SIZES = {
  poster: ["w92", "w154", "w185", "w342", "w500", "w780", "original"] as const,
  backdrop: ["w300", "w780", "w1280", "original"] as const,
  profile: ["w45", "w185", "h632", "original"] as const,
  logo: ["w45", "w92", "w154", "w185", "w300", "w500", "original"] as const,
} as const;
