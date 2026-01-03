"use client";

import { useAuth } from "@/contexts/AuthContext";
import { addToWatchlist, getMovieAccountStates, getTVAccountStates } from "@/lib/account";
import { useCallback, useEffect, useState } from "react";

import VideoPlayerModal from "./VideoPlayerModal";

interface MovieControlsProps {
  id: number;
  mediaType?: 'movie' | 'tv';
  trailerKey?: string;
  season?: number;
  episode?: number;
  title?: string; // Add title prop
}

export default function MovieControls({ id, mediaType = 'movie', trailerKey, season, episode, title }: MovieControlsProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [playTrailer, setPlayTrailer] = useState(false);
  
  // Watchlist State
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isListLoading, setIsListLoading] = useState(false);
  
  // Auth & TMDB Session
  const { user } = useAuth();
  const [tmdbSessionId, setTmdbSessionId] = useState<string | null>(null);
  const [tmdbAccountId, setTmdbAccountId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("tmdb_session");
      const account = localStorage.getItem("tmdb_account");
      if (session) setTmdbSessionId(session);
      if (account) {
        try {
          const parsed = JSON.parse(account);
          setTmdbAccountId(parsed.id);
        } catch (e) {
          console.error("Failed to parse TMDB account", e);
        }
      }
    }
  }, []);

  const checkStatus = useCallback(async () => {
    if (!tmdbSessionId) return;
    try {
      const status = mediaType === 'movie' 
        ? await getMovieAccountStates(id, tmdbSessionId)
        : await getTVAccountStates(id, tmdbSessionId);
      setIsInWatchlist(status.watchlist);
    } catch (error) {
      console.error("Failed to check watchlist status:", error);
    }
  }, [id, mediaType, tmdbSessionId]);

  useEffect(() => {
    if (tmdbSessionId) {
      checkStatus();
    }
  }, [checkStatus, tmdbSessionId]);

  const handlePlay = () => {
    setPlayTrailer(false);
    setIsPlayerOpen(true);
  };

  const handleWatchTrailer = () => {
    if (trailerKey) {
      setPlayTrailer(true);
      setIsPlayerOpen(true);
    }
  };

  const handleToggleList = async () => {
    if (!tmdbSessionId || !tmdbAccountId) {
      alert("Please connect your TMDB account in 'My List' page first.");
      return;
    }

    setIsListLoading(true);
    try {
      await addToWatchlist(
        tmdbAccountId,
        tmdbSessionId,
        mediaType,
        id,
        !isInWatchlist
      );
      setIsInWatchlist(!isInWatchlist);
    } catch (error) {
      console.error("Failed to update watchlist:", error);
      alert("Failed to update watchlist. Please try again.");
    } finally {
      setIsListLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-4 pt-4">
        <button
          onClick={handlePlay}
          className="flex items-center bg-white text-black px-6 py-2 rounded font-bold hover:bg-white/90 transition-colors transform hover:scale-105 duration-200"
        >
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="text-base">Play</span>
        </button>

        {trailerKey && (
          <button
            onClick={handleWatchTrailer}
            className="flex items-center bg-gray-500/40 text-white px-6 py-3 rounded font-bold backdrop-blur-sm hover:bg-gray-500/50 transition-colors border border-white/20"
          >
             <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
             </svg>
            <span>Trailer</span>
          </button>
        )}

        <button
          onClick={handleToggleList}
          disabled={isListLoading}
          className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
            isInWatchlist 
              ? "bg-primary border-primary text-white" 
              : "border-gray-400 text-gray-300 hover:border-white hover:text-white"
          }`}
          title={isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        >
          {isListLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isInWatchlist ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      </div>

      <VideoPlayerModal
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        videoUrl={playTrailer && trailerKey ? `https://www.youtube.com/embed/${trailerKey}?autoplay=1` : undefined}
        tmdbId={id}
        mediaType={mediaType}
        season={season}
        episode={episode}
        title={playTrailer ? (title ? `${title} - Trailer` : "Trailer") : title}
        subTitle={playTrailer ? undefined : (mediaType === 'movie' ? 'Movie' : undefined)}
      />
    </>
  );
}
