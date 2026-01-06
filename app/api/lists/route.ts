import {
  getFavoriteMovies,
  getFavoriteTVShows,
  getWatchlistMovies,
  getWatchlistTVShows,
  getRatedMovies,
  getRatedTVShows,
} from '@/lib/account';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accountId = searchParams.get('accountId');
  const sessionId = searchParams.get('sessionId');
  const type = searchParams.get('type'); // 'favorites' | 'watchlist' | 'rated' | 'all'

  if (!accountId || !sessionId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const accId = parseInt(accountId);

  try {
    if (type === 'all') {
      const [favMovies, favTV, wlMovies, wlTV, rtdMovies, rtdTV] = await Promise.all([
        getFavoriteMovies(accId, sessionId),
        getFavoriteTVShows(accId, sessionId),
        getWatchlistMovies(accId, sessionId),
        getWatchlistTVShows(accId, sessionId),
        getRatedMovies(accId, sessionId),
        getRatedTVShows(accId, sessionId),
      ]);

      return NextResponse.json({
        favoriteMovies: favMovies.results,
        favoriteTVShows: favTV.results,
        watchlistMovies: wlMovies.results,
        watchlistTVShows: wlTV.results,
        ratedMovies: rtdMovies.results,
        ratedTVShows: rtdTV.results,
      });
    }

    if (type === 'favorites') {
      const [movies, tvShows] = await Promise.all([
        getFavoriteMovies(accId, sessionId),
        getFavoriteTVShows(accId, sessionId),
      ]);
      return NextResponse.json({ movies: movies.results, tvShows: tvShows.results });
    }

    if (type === 'watchlist') {
      const [movies, tvShows] = await Promise.all([
        getWatchlistMovies(accId, sessionId),
        getWatchlistTVShows(accId, sessionId),
      ]);
      return NextResponse.json({ movies: movies.results, tvShows: tvShows.results });
    }

    if (type === 'rated') {
      const [movies, tvShows] = await Promise.all([
        getRatedMovies(accId, sessionId),
        getRatedTVShows(accId, sessionId),
      ]);
      return NextResponse.json({ movies: movies.results, tvShows: tvShows.results });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error) {
    console.error('Failed to fetch list data:', error);
    return NextResponse.json({ error: 'Failed to fetch list data' }, { status: 500 });
  }
}
