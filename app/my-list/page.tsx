"use client";

import MovieCard from "@/components/MovieCard";
import { useAuth } from "@/contexts/AuthContext";
import {
  getFavoriteMovies,
  getFavoriteTVShows,
  getRatedMovies,
  getRatedTVShows,
  getWatchlistMovies,
  getWatchlistTVShows,
} from "@/lib/account";
import { MediaItem, Movie, TVShow } from "@/types/tmdb";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Tab = "favorites" | "watchlist" | "rated";
type MediaType = "all" | "movies" | "tv";

// TMDB Session storage keys (keeping TMDB functionality separate)
const TMDB_SESSION_KEY = "tmdb_session";
const TMDB_ACCOUNT_KEY = "tmdb_account";

interface TMDBAccount {
  id: number;
  username: string;
}

export default function MyListPage() {
  const { isAuthenticated, isLoading: authLoading, profile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("favorites");
  const [mediaFilter, setMediaFilter] = useState<MediaType>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [tmdbAccount, setTmdbAccount] = useState<TMDBAccount | null>(null);
  const [tmdbSessionId, setTmdbSessionId] = useState<string | null>(null);

  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [favoriteTVShows, setFavoriteTVShows] = useState<TVShow[]>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const [watchlistTVShows, setWatchlistTVShows] = useState<TVShow[]>([]);
  const [ratedMovies, setRatedMovies] = useState<
    (Movie & { rating: number })[]
  >([]);
  const [ratedTVShows, setRatedTVShows] = useState<
    (TVShow & { rating: number })[]
  >([]);

  // Load TMDB session from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem(TMDB_SESSION_KEY);
      const account = localStorage.getItem(TMDB_ACCOUNT_KEY);
      if (session) setTmdbSessionId(session);
      if (account) setTmdbAccount(JSON.parse(account));
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    if (!tmdbAccount || !tmdbSessionId) return;

    setIsLoading(true);
    try {
      const [favMovies, favTV, wlMovies, wlTV, rtdMovies, rtdTV] =
        await Promise.all([
          getFavoriteMovies(tmdbAccount.id, tmdbSessionId),
          getFavoriteTVShows(tmdbAccount.id, tmdbSessionId),
          getWatchlistMovies(tmdbAccount.id, tmdbSessionId),
          getWatchlistTVShows(tmdbAccount.id, tmdbSessionId),
          getRatedMovies(tmdbAccount.id, tmdbSessionId),
          getRatedTVShows(tmdbAccount.id, tmdbSessionId),
        ]);

      setFavoriteMovies(favMovies.results);
      setFavoriteTVShows(favTV.results);
      setWatchlistMovies(wlMovies.results);
      setWatchlistTVShows(wlTV.results);
      setRatedMovies(rtdMovies.results);
      setRatedTVShows(rtdTV.results);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [tmdbAccount, tmdbSessionId]);

  // Fetch data when TMDB session exists
  useEffect(() => {
    if (tmdbAccount && tmdbSessionId) {
      fetchAllData();
    }
  }, [tmdbAccount, tmdbSessionId, fetchAllData]);

  // Get filtered items based on active tab and media filter
  const getFilteredItems = (): MediaItem[] => {
    let movies: Movie[] = [];
    let tvShows: TVShow[] = [];

    switch (activeTab) {
      case "favorites":
        movies = favoriteMovies;
        tvShows = favoriteTVShows;
        break;
      case "watchlist":
        movies = watchlistMovies;
        tvShows = watchlistTVShows;
        break;
      case "rated":
        movies = ratedMovies;
        tvShows = ratedTVShows;
        break;
    }

    const movieItems: MediaItem[] = movies.map((m) => ({
      ...m,
      media_type: "movie" as const,
    }));
    const tvItems: MediaItem[] = tvShows.map((t) => ({
      ...t,
      media_type: "tv" as const,
    }));

    if (mediaFilter === "movies") return movieItems;
    if (mediaFilter === "tv") return tvItems;
    return [...movieItems, ...tvItems];
  };

  const items = getFilteredItems();
  const totalCount = {
    favorites: favoriteMovies.length + favoriteTVShows.length,
    watchlist: watchlistMovies.length + watchlistTVShows.length,
    rated: ratedMovies.length + ratedTVShows.length,
  };

  // Loading state
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#141414]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not authenticated with Murflix
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">My List</h1>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gray-800 rounded-full">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Masuk untuk Akses List Anda
            </h2>
            <p className="text-gray-400 mb-8">
              Silakan login ke akun Murflix Anda untuk melihat dan mengelola
              daftar film favorit.
            </p>

            <Link
              href="/login"
              className="inline-block w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors"
            >
              Masuk
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated with Murflix but no TMDB session
  if (!tmdbAccount || !tmdbSessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414] px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">My List</h1>
          </div>

          <div className="bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gray-800 rounded-full">
                <svg
                  className="w-12 h-12 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10m-6 4h2m-6 4h10a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">
              Hubungkan TMDB Account
            </h2>
            <p className="text-gray-400 mb-8">
              Untuk menyimpan favorit dan watchlist, Anda perlu menghubungkan
              akun TMDB Anda. Data film dan TV show dikelola oleh TMDB.
            </p>

            <div className="space-y-4">
              <a
                href="https://www.themoviedb.org/signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-white text-black font-bold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors"
              >
                Buat Akun TMDB
              </a>
              <p className="text-sm text-gray-500">
                Sudah punya akun?{" "}
                <a
                  href="https://www.themoviedb.org/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Login di TMDB
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My List</h1>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              {profile && (
                <p>
                  Murflix:{" "}
                  <span className="text-white font-medium">
                    {profile.full_name || profile.email}
                  </span>
                </p>
              )}
              <span>•</span>
              <p>
                TMDB:{" "}
                <span className="text-white font-medium">
                  {tmdbAccount.username}
                </span>
              </p>
            </div>
          </div>

          {/* Media Type Filter */}
          <div className="flex bg-gray-900 rounded-lg p-1 self-start md:self-auto">
            {(["all", "movies", "tv"] as MediaType[]).map((type) => (
              <button
                key={type}
                onClick={() => setMediaFilter(type)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  mediaFilter === type
                    ? "bg-gray-800 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type === "movies"
                  ? "Movies"
                  : "TV Shows"}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-8 overflow-x-auto scrollbar-hide">
          {(["favorites", "watchlist", "rated"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "text-primary"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="capitalize">{tab}</span>
              <span className="ml-2 text-xs opacity-60">
                ({totalCount[tab]})
              </span>
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Content Grid */}
        {!isLoading && items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {items.map((item) => (
              <MovieCard key={`${item.media_type}-${item.id}`} item={item} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && items.length === 0 && (
          <div className="text-center py-32 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed">
            <div className="max-w-md mx-auto">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-800 rounded-full text-gray-500">
                  {activeTab === "favorites" && (
                    <svg
                      className="w-12 h-12"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  )}
                  {activeTab === "watchlist" && (
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                  {activeTab === "rated" && (
                    <svg
                      className="w-12 h-12"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  )}
              </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {activeTab === "favorites" && "No favorites yet"}
                {activeTab === "watchlist" && "Your watchlist is empty"}
                {activeTab === "rated" && "You haven't rated anything yet"}
              </h2>
              <p className="text-gray-400 mb-8">
                {activeTab === "favorites" &&
                  "Mark movies and TV shows as favorites to see them here."}
                {activeTab === "watchlist" &&
                  "Add titles to your watchlist to keep track of what you want to watch."}
                {activeTab === "rated" &&
                  "Rate movies and TV shows to see them here."}
              </p>
              <Link
                href="/browse/movies"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-200 transition-colors"
              >
                Browse Content
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
