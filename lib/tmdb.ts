import {
    CastMember,
    CertificationList,
    CollectionDetails,
    ContentRatings,
    Country,
    Credits,
    DiscoverMovieFilters,
    DiscoverTVFilters,
    EpisodeDetails,
    FindResult,
    GenreList,
    ImageCollection,
    ImageData,
    Language,
    MediaItem,
    Movie,
    MovieDetails,
    MovieReleaseDates,
    PersonCredits,
    PersonDetails,
    PersonExternalIds,
    ReviewDetail,
    SeasonDetails,
    TaggedImage,
    TMDBResponse,
    TVDetails,
    TVShow,
    Video,
    WatchProviderItem,
    WatchProviderRegion,
    WatchProviders
} from '@/types/tmdb';

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

// Runtime guard for TMDB token
if (!ACCESS_TOKEN) {
  console.error('⚠️ TMDB_ACCESS_TOKEN is not configured! API calls will fail.');
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN || ''}`,
  },
};

// ============================================
// TRENDING
// ============================================

// Trending All/Movies/TV
export async function fetchTrending(
  mediaType: 'all' | 'movie' | 'tv' = 'all',
  timeWindow: 'day' | 'week' = 'week'
): Promise<TMDBResponse<MediaItem>> {
  const res = await fetch(
    `${BASE_URL}/trending/${mediaType}/${timeWindow}`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch trending');
  return res.json();
}

// ============================================
// MOVIES
// ============================================

// Popular Movies
export async function fetchPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/movie/popular?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch popular movies');
  return res.json();
}

// Top Rated Movies
export async function fetchTopRatedMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/movie/top_rated?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch top rated movies');
  return res.json();
}

// Now Playing Movies
export async function fetchNowPlayingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/movie/now_playing?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch now playing movies');
  return res.json();
}

// Upcoming Movies
export async function fetchUpcomingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/movie/upcoming?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch upcoming movies');
  return res.json();
}

// Movie Details (with append_to_response)
export async function fetchMovieDetails(id: number): Promise<MovieDetails> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?append_to_response=credits,similar,videos,recommendations,images,reviews,release_dates&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}

// Movie Watch Providers
export async function fetchMovieWatchProviders(id: number): Promise<WatchProviders> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/watch/providers`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movie watch providers');
  return res.json();
}

// Movie Release Dates (for content ratings)
export async function fetchMovieReleaseDates(id: number): Promise<MovieReleaseDates> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/release_dates`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movie release dates');
  return res.json();
}

// Movie Recommendations
export async function fetchMovieRecommendations(id: number, page: number = 1): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movie recommendations');
  return res.json();
}

// Similar Movies
export async function fetchSimilarMovies(id: number, page: number = 1): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/similar?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch similar movies');
  return res.json();
}

// Movie Credits
export async function fetchMovieCredits(id: number): Promise<Credits> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/credits?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movie credits');
  return res.json();
}

// Movie Videos
export async function fetchMovieVideos(id: number): Promise<{ results: Video[] }> {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/videos?language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movie videos');
  return res.json();
}

// ============================================
// TV SHOWS
// ============================================

// Popular TV Shows
export async function fetchPopularTV(page: number = 1): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/tv/popular?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch popular TV shows');
  return res.json();
}

// Top Rated TV Shows
export async function fetchTopRatedTV(page: number = 1): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/tv/top_rated?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch top rated TV shows');
  return res.json();
}

// On The Air TV Shows (next 7 days)
export async function fetchOnTheAirTV(page: number = 1): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/tv/on_the_air?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch on the air TV shows');
  return res.json();
}

// Airing Today TV Shows
export async function fetchAiringTodayTV(page: number = 1): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/tv/airing_today?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch airing today TV shows');
  return res.json();
}

// TV Show Details (with append_to_response)
export async function fetchTVDetails(id: number): Promise<TVDetails> {
  const res = await fetch(
    `${BASE_URL}/tv/${id}?append_to_response=credits,similar,videos,recommendations,images,reviews,content_ratings&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch TV details');
  return res.json();
}

// TV Watch Providers
export async function fetchTVWatchProviders(id: number): Promise<WatchProviders> {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/watch/providers`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch TV watch providers');
  return res.json();
}

// TV Content Ratings
export async function fetchTVContentRatings(id: number): Promise<ContentRatings> {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/content_ratings`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch TV content ratings');
  return res.json();
}

// TV Recommendations
export async function fetchTVRecommendations(id: number, page: number = 1): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/recommendations?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch TV recommendations');
  return res.json();
}

// Similar TV Shows
export async function fetchSimilarTV(id: number, page: number = 1): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/similar?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch similar TV shows');
  return res.json();
}

// TV Credits
export async function fetchTVCredits(id: number): Promise<Credits> {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/credits?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch TV credits');
  return res.json();
}

// TV Videos
export async function fetchTVVideos(id: number): Promise<{ results: Video[] }> {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/videos?language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch TV videos');
  return res.json();
}

// ============================================
// SEARCH
// ============================================

// Search Multi (Movies, TV, People)
export async function searchMulti(
  query: string,
  page: number = 1
): Promise<TMDBResponse<MediaItem>> {
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(query)}&page=${page}&language=en-US`,
    { ...options, next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to search');
  return res.json();
}

// Search Movies
export async function searchMovies(
  query: string,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=en-US`,
    { ...options, next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to search movies');
  return res.json();
}

// Search TV Shows
export async function searchTV(
  query: string,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&page=${page}&language=en-US`,
    { ...options, next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to search TV shows');
  return res.json();
}

// ============================================
// GENRES
// ============================================

// Get Movie Genres
export async function fetchMovieGenres(): Promise<GenreList> {
  const res = await fetch(
    `${BASE_URL}/genre/movie/list?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movie genres');
  return res.json();
}

// Get TV Genres
export async function fetchTVGenres(): Promise<GenreList> {
  const res = await fetch(
    `${BASE_URL}/genre/tv/list?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch TV genres');
  return res.json();
}

// ============================================
// DISCOVER
// ============================================

// Discover Movies by Genre
export async function discoverMoviesByGenre(
  genreId: number,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to discover movies');
  return res.json();
}

// Discover TV by Genre
export async function discoverTVByGenre(
  genreId: number,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/discover/tv?with_genres=${genreId}&page=${page}&sort_by=popularity.desc&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to discover TV shows');
  return res.json();
}

// Discover Movies by Year
export async function discoverMoviesByYear(
  year: number,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/discover/movie?primary_release_year=${year}&page=${page}&sort_by=popularity.desc&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to discover movies by year');
  return res.json();
}

// Discover Movies by Country (Origin Country)
export async function discoverMoviesByCountry(
  countryCode: string,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/discover/movie?with_origin_country=${countryCode}&page=${page}&sort_by=popularity.desc&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to discover movies by country');
  return res.json();
}

// Discover TV by Country
export async function discoverTVByCountry(
  countryCode: string,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/discover/tv?with_origin_country=${countryCode}&page=${page}&sort_by=popularity.desc&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to discover TV by country');
  return res.json();
}

// Discover TV by Year
export async function discoverTVByYear(
  year: number,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/discover/tv?first_air_date_year=${year}&page=${page}&sort_by=popularity.desc&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to discover TV by year');
  return res.json();
}

// Advanced Movie Discovery with all filters
export async function discoverMoviesAdvanced(
  filters: DiscoverMovieFilters,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('language', 'en-US');
  
  if (filters.sort_by) params.append('sort_by', filters.sort_by);
  if (filters.with_genres) params.append('with_genres', filters.with_genres);
  if (filters.with_keywords) params.append('with_keywords', filters.with_keywords);
  if (filters.with_cast) params.append('with_cast', filters.with_cast);
  if (filters.with_crew) params.append('with_crew', filters.with_crew);
  if (filters.with_original_language) params.append('with_original_language', filters.with_original_language);
  if (filters.with_origin_country) params.append('with_origin_country', filters.with_origin_country);
  if (filters.primary_release_year) params.append('primary_release_year', filters.primary_release_year.toString());
  if (filters.primary_release_date_gte) params.append('primary_release_date.gte', filters.primary_release_date_gte);
  if (filters.primary_release_date_lte) params.append('primary_release_date.lte', filters.primary_release_date_lte);
  if (filters.vote_average_gte) params.append('vote_average.gte', filters.vote_average_gte.toString());
  if (filters.vote_average_lte) params.append('vote_average.lte', filters.vote_average_lte.toString());
  if (filters.vote_count_gte) params.append('vote_count.gte', filters.vote_count_gte.toString());
  if (filters.with_runtime_gte) params.append('with_runtime.gte', filters.with_runtime_gte.toString());
  if (filters.with_runtime_lte) params.append('with_runtime.lte', filters.with_runtime_lte.toString());
  if (filters.certification) params.append('certification', filters.certification);
  if (filters.certification_country) params.append('certification_country', filters.certification_country);
  if (filters.with_watch_providers) params.append('with_watch_providers', filters.with_watch_providers);
  if (filters.watch_region) params.append('watch_region', filters.watch_region);
  if (filters.with_watch_monetization_types) params.append('with_watch_monetization_types', filters.with_watch_monetization_types);
  if (filters.include_adult !== undefined) params.append('include_adult', filters.include_adult.toString());

  const res = await fetch(
    `${BASE_URL}/discover/movie?${params.toString()}`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to discover movies');
  return res.json();
}

// Advanced TV Discovery with all filters
export async function discoverTVAdvanced(
  filters: DiscoverTVFilters,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('language', 'en-US');
  
  if (filters.sort_by) params.append('sort_by', filters.sort_by);
  if (filters.with_genres) params.append('with_genres', filters.with_genres);
  if (filters.with_keywords) params.append('with_keywords', filters.with_keywords);
  if (filters.with_networks) params.append('with_networks', filters.with_networks);
  if (filters.with_original_language) params.append('with_original_language', filters.with_original_language);
  if (filters.with_origin_country) params.append('with_origin_country', filters.with_origin_country);
  if (filters.first_air_date_year) params.append('first_air_date_year', filters.first_air_date_year.toString());
  if (filters.first_air_date_gte) params.append('first_air_date.gte', filters.first_air_date_gte);
  if (filters.first_air_date_lte) params.append('first_air_date.lte', filters.first_air_date_lte);
  if (filters.air_date_gte) params.append('air_date.gte', filters.air_date_gte);
  if (filters.air_date_lte) params.append('air_date.lte', filters.air_date_lte);
  if (filters.vote_average_gte) params.append('vote_average.gte', filters.vote_average_gte.toString());
  if (filters.vote_average_lte) params.append('vote_average.lte', filters.vote_average_lte.toString());
  if (filters.vote_count_gte) params.append('vote_count.gte', filters.vote_count_gte.toString());
  if (filters.with_status) params.append('with_status', filters.with_status);
  if (filters.with_type) params.append('with_type', filters.with_type);
  if (filters.with_watch_providers) params.append('with_watch_providers', filters.with_watch_providers);
  if (filters.watch_region) params.append('watch_region', filters.watch_region);
  if (filters.with_watch_monetization_types) params.append('with_watch_monetization_types', filters.with_watch_monetization_types);
  if (filters.include_adult !== undefined) params.append('include_adult', filters.include_adult.toString());

  const res = await fetch(
    `${BASE_URL}/discover/tv?${params.toString()}`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to discover TV shows');
  return res.json();
}

// Discover by Watch Provider
export async function discoverByProvider(
  providerId: number,
  mediaType: 'movie' | 'tv',
  region: string = 'US',
  page: number = 1
): Promise<TMDBResponse<Movie | TVShow>> {
  const res = await fetch(
    `${BASE_URL}/discover/${mediaType}?with_watch_providers=${providerId}&watch_region=${region}&page=${page}&sort_by=popularity.desc&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to discover by provider');
  return res.json();
}

// ============================================
// PEOPLE
// ============================================

// Person Details
export async function fetchPersonDetails(id: number): Promise<PersonDetails> {
  const res = await fetch(
    `${BASE_URL}/person/${id}?append_to_response=combined_credits,images&language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch person details');
  return res.json();
}

// Popular People
export async function fetchPopularPeople(page: number = 1): Promise<TMDBResponse<PersonDetails>> {
  const res = await fetch(
    `${BASE_URL}/person/popular?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch popular people');
  return res.json();
}

// Person Movie Credits
export async function fetchPersonMovieCredits(id: number): Promise<PersonCredits> {
  const res = await fetch(
    `${BASE_URL}/person/${id}/movie_credits?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch person movie credits');
  return res.json();
}

// Person TV Credits
export async function fetchPersonTVCredits(id: number): Promise<PersonCredits> {
  const res = await fetch(
    `${BASE_URL}/person/${id}/tv_credits?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch person TV credits');
  return res.json();
}

// Person Combined Credits (Movie + TV)
export async function fetchPersonCombinedCredits(id: number): Promise<PersonCredits> {
  const res = await fetch(
    `${BASE_URL}/person/${id}/combined_credits?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch person combined credits');
  return res.json();
}

// Person External IDs
export async function fetchPersonExternalIds(id: number): Promise<PersonExternalIds> {
  const res = await fetch(
    `${BASE_URL}/person/${id}/external_ids`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch person external IDs');
  return res.json();
}

// Person Images
export async function fetchPersonImages(id: number): Promise<{ profiles: ImageData[] }> {
  const res = await fetch(
    `${BASE_URL}/person/${id}/images`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch person images');
  return res.json();
}

// Person Tagged Images
export async function fetchPersonTaggedImages(id: number, page: number = 1): Promise<TMDBResponse<TaggedImage>> {
  const res = await fetch(
    `${BASE_URL}/person/${id}/tagged_images?page=${page}&language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch person tagged images');
  return res.json();
}

// Search Person
export async function searchPerson(query: string, page: number = 1): Promise<TMDBResponse<PersonDetails>> {
  const res = await fetch(
    `${BASE_URL}/search/person?query=${encodeURIComponent(query)}&page=${page}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to search person');
  return res.json();
}

// ============================================
// CONFIGURATION
// ============================================

// Get API Configuration
export async function fetchConfiguration() {
  const res = await fetch(
    `${BASE_URL}/configuration`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch configuration');
  return res.json();
}

// Get Countries List
export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(
    `${BASE_URL}/configuration/countries?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch countries');
  return res.json();
}

// Get Languages List
export async function fetchLanguages(): Promise<Language[]> {
  const res = await fetch(
    `${BASE_URL}/configuration/languages`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch languages');
  return res.json();
}

// Get Movie Certifications
export async function fetchMovieCertifications(): Promise<CertificationList> {
  const res = await fetch(
    `${BASE_URL}/certification/movie/list`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movie certifications');
  return res.json();
}

// Get TV Certifications
export async function fetchTVCertifications(): Promise<CertificationList> {
  const res = await fetch(
    `${BASE_URL}/certification/tv/list`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch TV certifications');
  return res.json();
}

// ============================================
// TV SEASONS
// ============================================

// Season Details
export async function fetchSeasonDetails(
  tvId: number,
  seasonNumber: number
): Promise<SeasonDetails> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch season details');
  return res.json();
}

// Season Credits
export async function fetchSeasonCredits(
  tvId: number,
  seasonNumber: number
): Promise<Credits> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/credits?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch season credits');
  return res.json();
}

// Season Images
export async function fetchSeasonImages(
  tvId: number,
  seasonNumber: number
): Promise<{ posters: ImageData[] }> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/images`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch season images');
  return res.json();
}

// Season Videos
export async function fetchSeasonVideos(
  tvId: number,
  seasonNumber: number
): Promise<{ results: Video[] }> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/videos?language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch season videos');
  return res.json();
}

// Season Watch Providers
export async function fetchSeasonWatchProviders(
  tvId: number,
  seasonNumber: number
): Promise<WatchProviders> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/watch/providers`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch season watch providers');
  return res.json();
}

// ============================================
// TV EPISODES
// ============================================

// Episode Details
export async function fetchEpisodeDetails(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<EpisodeDetails> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch episode details');
  return res.json();
}

// Episode Credits
export async function fetchEpisodeCredits(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<Credits & { guest_stars: CastMember[] }> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/credits?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch episode credits');
  return res.json();
}

// Episode Images
export async function fetchEpisodeImages(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<{ stills: ImageData[] }> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/images`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch episode images');
  return res.json();
}

// Episode Videos
export async function fetchEpisodeVideos(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number
): Promise<{ results: Video[] }> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/videos?language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch episode videos');
  return res.json();
}

// ============================================
// COLLECTIONS
// ============================================

// Collection Details
export async function fetchCollectionDetails(id: number): Promise<CollectionDetails> {
  const res = await fetch(
    `${BASE_URL}/collection/${id}?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch collection details');
  return res.json();
}

// Collection Images
export async function fetchCollectionImages(id: number): Promise<ImageCollection> {
  const res = await fetch(
    `${BASE_URL}/collection/${id}/images`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch collection images');
  return res.json();
}

// ============================================
// FIND BY EXTERNAL ID
// ============================================

// Find by External ID (IMDb, TVDB, etc.)
export async function findByExternalId(
  externalId: string,
  externalSource: 'imdb_id' | 'tvdb_id' | 'freebase_mid' | 'freebase_id' | 'tvrage_id'
): Promise<FindResult> {
  const res = await fetch(
    `${BASE_URL}/find/${externalId}?external_source=${externalSource}&language=en-US`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to find by external ID');
  return res.json();
}

// ============================================
// WATCH PROVIDERS (Lists)
// ============================================

// Watch Provider Regions
export async function fetchWatchProviderRegions(): Promise<{ results: WatchProviderRegion[] }> {
  const res = await fetch(
    `${BASE_URL}/watch/providers/regions?language=en-US`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch watch provider regions');
  return res.json();
}

// Movie Watch Providers List
export async function fetchMovieWatchProvidersList(
  watchRegion?: string
): Promise<{ results: WatchProviderItem[] }> {
  const regionParam = watchRegion ? `&watch_region=${watchRegion}` : '';
  const res = await fetch(
    `${BASE_URL}/watch/providers/movie?language=en-US${regionParam}`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch movie watch providers list');
  return res.json();
}

// TV Watch Providers List
export async function fetchTVWatchProvidersList(
  watchRegion?: string
): Promise<{ results: WatchProviderItem[] }> {
  const regionParam = watchRegion ? `&watch_region=${watchRegion}` : '';
  const res = await fetch(
    `${BASE_URL}/watch/providers/tv?language=en-US${regionParam}`,
    { ...options, next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error('Failed to fetch TV watch providers list');
  return res.json();
}

// ============================================
// MOVIES - Additional
// ============================================

// Latest Movie
export async function fetchLatestMovie(): Promise<MovieDetails> {
  const res = await fetch(
    `${BASE_URL}/movie/latest?language=en-US`,
    { ...options, next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch latest movie');
  return res.json();
}

// ============================================
// REVIEWS
// ============================================

// Review Details
export async function fetchReviewDetails(reviewId: string): Promise<ReviewDetail> {
  const res = await fetch(
    `${BASE_URL}/review/${reviewId}`,
    { ...options, next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Failed to fetch review details');
  return res.json();
}

// ============================================
// IMAGE HELPERS
// ============================================

// Helper function to get image URL
export function getImageUrl(
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'
): string {
  if (!path) return '/placeholder.svg';
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p'}/${size}${path}`;
}

// Helper function to get backdrop URL
export function getBackdropUrl(
  path: string | null,
  size: 'w300' | 'w780' | 'w1280' | 'original' = 'original'
): string {
  if (!path) return '/placeholder.svg';
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p'}/${size}${path}`;
}

// Helper function to get profile image URL
export function getProfileUrl(
  path: string | null,
  size: 'w45' | 'w185' | 'h632' | 'original' = 'w185'
): string {
  if (!path) return '/placeholder.svg';
  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_URL || 'https://image.tmdb.org/t/p'}/${size}${path}`;
}
