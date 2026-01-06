/**
 * TMDB Account Library
 * Handles favorites, watchlist, and rated items
 */

import 'server-only';

import { Movie, TMDBResponse, TVShow } from '@/types/tmdb';

const BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

const accountOptions = {
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: `Bearer ${ACCESS_TOKEN || ''}`,
  },
};

// ============================================
// FAVORITES
// ============================================

// Get Favorite Movies
export async function getFavoriteMovies(
  accountId: number,
  sessionId: string,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/movies?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
    { ...accountOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get favorite movies');
  return res.json();
}

// Get Favorite TV Shows
export async function getFavoriteTVShows(
  accountId: number,
  sessionId: string,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/tv?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
    { ...accountOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get favorite TV shows');
  return res.json();
}

// Add/Remove Favorite
export async function markAsFavorite(
  accountId: number,
  sessionId: string,
  mediaType: 'movie' | 'tv',
  mediaId: number,
  favorite: boolean
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/favorite?session_id=${sessionId}`,
    {
      ...accountOptions,
      method: 'POST',
      body: JSON.stringify({
        media_type: mediaType,
        media_id: mediaId,
        favorite,
      }),
    }
  );
  if (!res.ok) throw new Error('Failed to update favorite');
  return res.json();
}

// ============================================
// WATCHLIST
// ============================================

// Get Watchlist Movies
export async function getWatchlistMovies(
  accountId: number,
  sessionId: string,
  page: number = 1
): Promise<TMDBResponse<Movie>> {
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist/movies?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
    { ...accountOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get watchlist movies');
  return res.json();
}

// Get Watchlist TV Shows
export async function getWatchlistTVShows(
  accountId: number,
  sessionId: string,
  page: number = 1
): Promise<TMDBResponse<TVShow>> {
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist/tv?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
    { ...accountOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get watchlist TV shows');
  return res.json();
}

// Add/Remove from Watchlist
export async function addToWatchlist(
  accountId: number,
  sessionId: string,
  mediaType: 'movie' | 'tv',
  mediaId: number,
  watchlist: boolean
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist?session_id=${sessionId}`,
    {
      ...accountOptions,
      method: 'POST',
      body: JSON.stringify({
        media_type: mediaType,
        media_id: mediaId,
        watchlist,
      }),
    }
  );
  if (!res.ok) throw new Error('Failed to update watchlist');
  return res.json();
}

// ============================================
// RATED ITEMS
// ============================================

// Get Rated Movies
export async function getRatedMovies(
  accountId: number,
  sessionId: string,
  page: number = 1
): Promise<TMDBResponse<Movie & { rating: number }>> {
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/rated/movies?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
    { ...accountOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get rated movies');
  return res.json();
}

// Get Rated TV Shows
export async function getRatedTVShows(
  accountId: number,
  sessionId: string,
  page: number = 1
): Promise<TMDBResponse<TVShow & { rating: number }>> {
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/rated/tv?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
    { ...accountOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get rated TV shows');
  return res.json();
}

// Get Rated TV Episodes
export async function getRatedTVEpisodes(
  accountId: number,
  sessionId: string,
  page: number = 1
): Promise<TMDBResponse<{ id: number; episode_number: number; season_number: number; show_id: number; rating: number }>> {
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/rated/tv/episodes?session_id=${sessionId}&page=${page}&language=en-US&sort_by=created_at.desc`,
    { ...accountOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get rated TV episodes');
  return res.json();
}

// ============================================
// RATING - Movies
// ============================================

// Rate Movie
export async function rateMovie(
  movieId: number,
  rating: number,
  sessionId?: string,
  guestSessionId?: string
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  const sessionParam = sessionId 
    ? `session_id=${sessionId}` 
    : `guest_session_id=${guestSessionId}`;
  
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?${sessionParam}`,
    {
      ...accountOptions,
      method: 'POST',
      body: JSON.stringify({ value: rating }),
    }
  );
  if (!res.ok) throw new Error('Failed to rate movie');
  return res.json();
}

// Delete Movie Rating
export async function deleteMovieRating(
  movieId: number,
  sessionId?: string,
  guestSessionId?: string
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  const sessionParam = sessionId 
    ? `session_id=${sessionId}` 
    : `guest_session_id=${guestSessionId}`;
  
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?${sessionParam}`,
    { ...accountOptions, method: 'DELETE' }
  );
  if (!res.ok) throw new Error('Failed to delete movie rating');
  return res.json();
}

// ============================================
// RATING - TV Shows
// ============================================

// Rate TV Show
export async function rateTVShow(
  tvId: number,
  rating: number,
  sessionId?: string,
  guestSessionId?: string
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  const sessionParam = sessionId 
    ? `session_id=${sessionId}` 
    : `guest_session_id=${guestSessionId}`;
  
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/rating?${sessionParam}`,
    {
      ...accountOptions,
      method: 'POST',
      body: JSON.stringify({ value: rating }),
    }
  );
  if (!res.ok) throw new Error('Failed to rate TV show');
  return res.json();
}

// Delete TV Show Rating
export async function deleteTVRating(
  tvId: number,
  sessionId?: string,
  guestSessionId?: string
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  const sessionParam = sessionId 
    ? `session_id=${sessionId}` 
    : `guest_session_id=${guestSessionId}`;
  
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/rating?${sessionParam}`,
    { ...accountOptions, method: 'DELETE' }
  );
  if (!res.ok) throw new Error('Failed to delete TV rating');
  return res.json();
}

// ============================================
// RATING - TV Episodes
// ============================================

// Rate TV Episode
export async function rateTVEpisode(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number,
  rating: number,
  sessionId?: string,
  guestSessionId?: string
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  const sessionParam = sessionId 
    ? `session_id=${sessionId}` 
    : `guest_session_id=${guestSessionId}`;
  
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/rating?${sessionParam}`,
    {
      ...accountOptions,
      method: 'POST',
      body: JSON.stringify({ value: rating }),
    }
  );
  if (!res.ok) throw new Error('Failed to rate TV episode');
  return res.json();
}

// Delete TV Episode Rating
export async function deleteTVEpisodeRating(
  tvId: number,
  seasonNumber: number,
  episodeNumber: number,
  sessionId?: string,
  guestSessionId?: string
): Promise<{ success: boolean; status_code: number; status_message: string }> {
  const sessionParam = sessionId 
    ? `session_id=${sessionId}` 
    : `guest_session_id=${guestSessionId}`;
  
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}/rating?${sessionParam}`,
    { ...accountOptions, method: 'DELETE' }
  );
  if (!res.ok) throw new Error('Failed to delete TV episode rating');
  return res.json();
}

// ============================================
// ACCOUNT STATES
// ============================================

export interface AccountStates {
  id: number;
  favorite: boolean;
  rated: { value: number } | false;
  watchlist: boolean;
}

// Get Movie Account States
export async function getMovieAccountStates(
  movieId: number,
  sessionId: string
): Promise<AccountStates> {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/account_states?session_id=${sessionId}`,
    { ...accountOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get movie account states');
  return res.json();
}

// Get TV Account States
export async function getTVAccountStates(
  tvId: number,
  sessionId: string
): Promise<AccountStates> {
  const res = await fetch(
    `${BASE_URL}/tv/${tvId}/account_states?session_id=${sessionId}`,
    { ...accountOptions, method: 'GET' }
  );
  if (!res.ok) throw new Error('Failed to get TV account states');
  return res.json();
}
