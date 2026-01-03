// TMDB API Types

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
  media_type?: 'movie';
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  media_type?: 'tv';
}

export type MediaItem = (Movie | TVShow) & { media_type?: 'movie' | 'tv' | 'person' };

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  runtime: number;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  homepage: string;
  imdb_id: string;
  credits?: Credits;
  similar?: { results: Movie[] };
  videos?: { results: Video[] };
  recommendations?: { results: Movie[] };
  images?: ImageCollection;
  reviews?: ReviewResponse;
  release_dates?: { results: ReleaseDateResult[] };
}

export interface TVDetails extends Omit<TVShow, 'genre_ids'> {
  genres: Genre[];
  episode_run_time: number[];
  status: string;
  tagline: string;
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: Season[];
  created_by: Creator[];
  networks: Network[];
  production_companies: ProductionCompany[];
  homepage: string;
  in_production: boolean;
  last_air_date: string;
  last_episode_to_air: Episode | null;
  next_episode_to_air: Episode | null;
  credits?: Credits;
  similar?: { results: TVShow[] };
  videos?: { results: Video[] };
  recommendations?: { results: TVShow[] };
  images?: ImageCollection;
  reviews?: ReviewResponse;
  content_ratings?: { results: ContentRating[] };
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  air_date: string;
  vote_average: number;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
  credit_id: string;
  gender: number;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
  credit_id: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  adult: boolean;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
  credit_id: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
  iso_639_1: string;
  iso_3166_1: string;
  size: number;
}

export interface ImageCollection {
  backdrops: ImageData[];
  logos: ImageData[];
  posters: ImageData[];
}

export interface ImageData {
  aspect_ratio: number;
  height: number;
  iso_639_1: string | null;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ReviewResponse {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface Review {
  id: string;
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface GenreList {
  genres: Genre[];
}

// Watch Providers
export interface WatchProviders {
  id: number;
  results: {
    [countryCode: string]: WatchProviderCountry;
  };
}

export interface WatchProviderCountry {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
  free?: WatchProvider[];
}

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

// Content Ratings (TV)
export interface ContentRatings {
  results: ContentRating[];
  id: number;
}

export interface ContentRating {
  descriptors: string[];
  iso_3166_1: string;
  rating: string;
}

// Movie Release Dates (for age ratings)
export interface MovieReleaseDates {
  id: number;
  results: ReleaseDateResult[];
}

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

// Person/People
export interface PersonDetails {
  id: number;
  name: string;
  also_known_as: string[];
  adult: boolean;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  imdb_id: string;
  known_for_department: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  combined_credits?: {
    cast: PersonCastCredit[];
    crew: PersonCrewCredit[];
  };
  images?: {
    profiles: ImageData[];
  };
}

export interface PersonCastCredit {
  id: number;
  title?: string;
  name?: string;
  character: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: 'movie' | 'tv';
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

export interface PersonCrewCredit {
  id: number;
  title?: string;
  name?: string;
  job: string;
  department: string;
  poster_path: string | null;
  backdrop_path: string | null;
  media_type: 'movie' | 'tv';
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
}

// Configuration
export interface TMDBConfiguration {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}

// ============================================
// FASE 1: New Types
// ============================================

// Season Details
export interface SeasonDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  air_date: string;
  vote_average: number;
  episodes: Episode[];
  _id: string;
}

// Episode Details (Extended)
export interface EpisodeDetails extends Episode {
  crew: CrewMember[];
  guest_stars: CastMember[];
  images?: { stills: ImageData[] };
  videos?: { results: Video[] };
}

// Collection Details
export interface CollectionDetails {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: CollectionPart[];
}

// Collection Part (Movie in collection)
export interface CollectionPart {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
  original_language: string;
  video: boolean;
  media_type: 'movie';
}

// Find by External ID Result
export interface FindResult {
  movie_results: Movie[];
  tv_results: TVShow[];
  person_results: PersonDetails[];
  tv_episode_results: Episode[];
  tv_season_results: Season[];
}

// Watch Provider Region
export interface WatchProviderRegion {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

// Watch Provider Item (for lists)
export interface WatchProviderItem {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
  display_priorities: { [countryCode: string]: number };
}

// Review Detail
export interface ReviewDetail {
  id: string;
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
  iso_639_1: string;
  media_id: number;
  media_title: string;
  media_type: 'movie' | 'tv';
}

// ============================================
// FASE 2: Discover Filters & Configuration Types
// ============================================

// Discover Movie Filters
export interface DiscoverMovieFilters {
  sort_by?: 'popularity.desc' | 'popularity.asc' | 'release_date.desc' | 'release_date.asc' | 
            'vote_average.desc' | 'vote_average.asc' | 'vote_count.desc' | 'vote_count.asc' |
            'revenue.desc' | 'revenue.asc' | 'primary_release_date.desc' | 'primary_release_date.asc';
  with_genres?: string;
  with_keywords?: string;
  with_cast?: string;
  with_crew?: string;
  with_original_language?: string;
  with_origin_country?: string;
  primary_release_year?: number;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  certification?: string;
  certification_country?: string;
  with_watch_providers?: string;
  watch_region?: string;
  with_watch_monetization_types?: 'flatrate' | 'free' | 'ads' | 'rent' | 'buy';
  include_adult?: boolean;
}

// Discover TV Filters
export interface DiscoverTVFilters {
  sort_by?: 'popularity.desc' | 'popularity.asc' | 'first_air_date.desc' | 'first_air_date.asc' |
            'vote_average.desc' | 'vote_average.asc' | 'vote_count.desc' | 'vote_count.asc';
  with_genres?: string;
  with_keywords?: string;
  with_networks?: string;
  with_original_language?: string;
  with_origin_country?: string;
  first_air_date_year?: number;
  first_air_date_gte?: string;
  first_air_date_lte?: string;
  air_date_gte?: string;
  air_date_lte?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  vote_count_gte?: number;
  with_status?: string;  // 0-5: Returning, Planned, In Production, Ended, Cancelled, Pilot
  with_type?: string;    // 0-6: Documentary, News, Miniseries, Reality, Scripted, Talk Show, Video
  with_watch_providers?: string;
  watch_region?: string;
  with_watch_monetization_types?: 'flatrate' | 'free' | 'ads' | 'rent' | 'buy';
  include_adult?: boolean;
}

// Country (from /configuration/countries)
export interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

// Language (from /configuration/languages)
export interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

// Certification
export interface Certification {
  certification: string;
  meaning: string;
  order: number;
}

// Certification List (per country)
export interface CertificationList {
  certifications: {
    [countryCode: string]: Certification[];
  };
}

// ============================================
// FASE 3: Person Types
// ============================================

// Person Credits Response
export interface PersonCredits {
  id: number;
  cast: PersonCastCredit[];
  crew: PersonCrewCredit[];
}

// Person External IDs
export interface PersonExternalIds {
  id: number;
  freebase_mid: string | null;
  freebase_id: string | null;
  imdb_id: string | null;
  tvrage_id: number | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  tiktok_id: string | null;
  twitter_id: string | null;
  youtube_id: string | null;
}

// Tagged Image (person in media still/backdrop)
export interface TaggedImage extends ImageData {
  id: string;
  media_type: 'movie' | 'tv';
  media: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
}
