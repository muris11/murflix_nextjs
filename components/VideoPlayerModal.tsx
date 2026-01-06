"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; // Add title prop
  subTitle?: string; // Add subtitle prop (e.g. "S1 E1: Pilot")
  videoUrl?: string | null;
  tmdbId?: number;
  mediaType?: 'movie' | 'tv';
  season?: number;
  episode?: number;
}

// Modern Server Configuration
const SERVERS = [
  { 
    id: 'vidlink', 
    name: 'Server 1 (Multi-Sub)', 
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://vidlink.pro/movie/${id}` 
        : `https://vidlink.pro/tv/${id}/${s}/${e}` 
  },
  { 
    id: 'embedsu', 
    name: 'Server 2 (Fast)', 
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://embed.su/embed/movie/${id}` 
        : `https://embed.su/embed/tv/${id}/${s}/${e}`
  },
  { 
    id: 'vidsrc', 
    name: 'Server 3 (Backup)', 
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://vidsrc.xyz/embed/movie/${id}` 
        : `https://vidsrc.xyz/embed/tv/${id}/${s}/${e}`
  },
  { 
    id: 'autoembed', 
    name: 'Server 4 (Alt)', 
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://autoembed.co/movie/tmdb/${id}` 
        : `https://autoembed.co/tv/tmdb/${id}-${s}-${e}`
  }
];

export default function VideoPlayerModal({
  isOpen,
  onClose,
  title,
  subTitle,
  videoUrl,
  tmdbId,
  mediaType = 'movie',
  season,
  episode,
}: VideoPlayerModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentServer, setCurrentServer] = useState(SERVERS[0].id);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls timer
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isOpen && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isOpen, showControls]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const getSourceUrl = () => {
    if (videoUrl) return videoUrl;
    if (!tmdbId) return "";

    const server = SERVERS.find(s => s.id === currentServer) || SERVERS[0];
    return server.getUrl(tmdbId, mediaType, season, episode);
  };

  const activeUrl = getSourceUrl();

  // Reset state when opening - this is intentional as we need to reset UI state when modal opens
  useEffect(() => {
    if (isOpen) {
      // These setState calls are intentional - we need to reset UI state when modal opens/content changes
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(true);
      setCurrentServer(SERVERS[0].id);
      const timer = setTimeout(() => setIsLoading(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, tmdbId, mediaType, season, episode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  if (!isOpen || typeof document === "undefined") return null;

  const isTrailer = !!videoUrl;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex flex-col bg-black animate-in fade-in duration-300"
      onMouseMove={handleMouseMove}
      onClick={handleMouseMove} // Touch devices
    >
      {/* Header Overlay (Title & Close) */}
      <div 
        className={`absolute top-0 left-0 right-0 z-[10001] bg-gradient-to-b from-black/90 to-transparent p-6 flex justify-between items-center transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center space-x-6">
          {/* Back Button */}
          <button
            onClick={handleClose}
            className="group flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-all active:scale-95"
            aria-label="Back"
          >
            <svg className="w-10 h-10 text-white fill-current transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>

          {/* Title Area */}
          <div className="text-white drop-shadow-md">
             {title && <h2 className="text-xl md:text-2xl font-bold tracking-wide">{title}</h2>}
             {subTitle && <p className="text-gray-400 font-medium text-base md:text-lg">{subTitle}</p>}
          </div>
        </div>

        {/* Right Side Controls Placeholder (Flag/Report could go here) */}
        <div className="flex items-center space-x-4">
           {/* Add placeholders or icons here if needed */}
        </div>
      </div>

      {/* Main Player Container */}
      <div className="flex-1 relative flex items-center justify-center bg-black w-full h-full">
        
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-[105] pointer-events-none bg-black">
             <div className="relative">
                <div className="w-16 h-16 border-4 border-white/10 border-t-[#E50914] rounded-full animate-spin" />
             </div>
          </div>
        )}

        <iframe
          key={activeUrl}
          src={activeUrl}
          className={`w-full h-full border-0 absolute inset-0 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Footer / Server Selector Dock */}
      {!isTrailer && (
        <div 
          className={`absolute bottom-0 left-0 right-0 z-[10001] bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 flex justify-center transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex space-x-1 shadow-2xl pointer-events-auto overflow-x-auto max-w-full no-scrollbar">
            {SERVERS.map((srv) => (
              <button
                key={srv.id}
                onClick={() => {
                  if (currentServer !== srv.id) {
                    setIsLoading(true);
                    setCurrentServer(srv.id);
                  }
                }}
                className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-200 ${
                  currentServer === srv.id
                    ? "bg-[#E50914] text-white shadow-lg scale-105"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {srv.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
