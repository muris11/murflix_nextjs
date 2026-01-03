"use client";

import { useAuth } from "@/contexts/AuthContext";
import { addToWatchlist, getMovieAccountStates, getTVAccountStates } from "@/lib/account";
import { useCallback, useEffect, useState } from "react";

import VideoPlayerModal from "@/components/VideoPlayerModal";

interface EpisodePlayerProps {
  tmdbId: number;
  seasonNumber: number;
  episodeNumber: number;
  stillPath: string | null;
  seriesTitle?: string; // Add series title
  episodeTitle?: string; // Add episode title
}

export default function EpisodePlayer({ tmdbId, seasonNumber, episodeNumber, stillPath, seriesTitle, episodeTitle }: EpisodePlayerProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <button 
          onClick={() => setIsPlayerOpen(true)}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-6 transition-all transform hover:scale-110 group"
        >
          <svg
            className="w-12 h-12 text-white fill-current group-hover:text-primary transition-colors"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      <VideoPlayerModal
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        tmdbId={tmdbId}
        mediaType="tv"
        season={seasonNumber}
        episode={episodeNumber}
        title={seriesTitle}
        subTitle={episodeTitle ? `S${seasonNumber} E${episodeNumber}: ${episodeTitle}` : `Season ${seasonNumber} Episode ${episodeNumber}`}
      />
    </>
  );
}
