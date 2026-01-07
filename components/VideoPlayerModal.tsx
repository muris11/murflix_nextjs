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
    name: 'VidLink', 
    description: 'Multi-Subtitle, HD',
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://vidlink.pro/movie/${id}` 
        : `https://vidlink.pro/tv/${id}/${s}/${e}` 
  },
  { 
    id: 'vidsrccc', 
    name: 'VidSrc CC', 
    description: 'Multi-Sub, 1080p',
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://vidsrc.cc/v2/embed/movie/${id}` 
        : `https://vidsrc.cc/v2/embed/tv/${id}/${s}/${e}`
  },
  { 
    id: 'embedsu', 
    name: 'Embed.su', 
    description: 'Fast, HD',
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://embed.su/embed/movie/${id}` 
        : `https://embed.su/embed/tv/${id}/${s}/${e}`
  },
  { 
    id: '2embed', 
    name: '2Embed', 
    description: 'Multi-Sub, Anime',
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://www.2embed.cc/embed/${id}` 
        : `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}`
  },
  { 
    id: 'moviesapi', 
    name: 'MoviesAPI', 
    description: 'Multi-Sub, 1080p',
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://moviesapi.club/movie/${id}` 
        : `https://moviesapi.club/tv/${id}/${s}/${e}`
  },
  { 
    id: 'vidsrcto', 
    name: 'VidSrc.to', 
    description: 'HD, Fast',
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://vidsrc.to/embed/movie/${id}` 
        : `https://vidsrc.to/embed/tv/${id}/${s}/${e}`
  },
  { 
    id: 'autoembed', 
    name: 'AutoEmbed', 
    description: 'Backup',
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://autoembed.co/movie/tmdb/${id}` 
        : `https://autoembed.co/tv/tmdb/${id}-${s}-${e}`
  },
  { 
    id: 'vembed', 
    name: 'VEmbed', 
    description: 'HD, 4K',
    type: 'iframe',
    getUrl: (id: number, type: string, s?: number, e?: number) => 
      type === 'movie' 
        ? `https://vembed.net/embed?tmdb=${id}` 
        : `https://vembed.net/embed?tmdb=${id}&season=${s}&episode=${e}`
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
  const [showServerPanel, setShowServerPanel] = useState(true);

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
        className={`absolute top-0 left-0 right-0 z-[10001] pointer-events-none p-6 flex justify-between items-center transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center space-x-6 pointer-events-auto">
          {/* Back Button */}
          <button
            onClick={handleClose}
            className="group flex items-center justify-center p-2 rounded-full bg-black/50 hover:bg-white/10 transition-all active:scale-95"
            aria-label="Back"
          >
            <svg className="w-10 h-10 text-white fill-current transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>

          {/* Title Area */}
          <div className="text-white drop-shadow-md bg-black/50 px-4 py-2 rounded-lg">
             {title && <h2 className="text-xl md:text-2xl font-bold tracking-wide">{title}</h2>}
             {subTitle && <p className="text-gray-400 font-medium text-base md:text-lg">{subTitle}</p>}
          </div>
        </div>

        {/* Right Side Controls Placeholder (Flag/Report could go here) */}
        <div className="flex items-center space-x-4 pointer-events-auto">
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
          className={`absolute bottom-0 left-0 right-0 z-[10001] flex flex-col items-center pointer-events-none transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Toggle Button - Always visible when controls shown */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowServerPanel(!showServerPanel);
            }}
            className="mb-2 px-3 py-1.5 md:px-4 md:py-2 bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-white/80 hover:text-white hover:bg-black/80 transition-all duration-200 pointer-events-auto flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium shadow-lg"
          >
            <svg 
              className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${showServerPanel ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {showServerPanel ? 'Hide' : 'Servers'}
          </button>

          {/* Server Panel */}
          {showServerPanel && (
            <div className="px-2 pb-2 md:p-4 flex justify-center pointer-events-none w-full">
              <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl p-2 shadow-2xl pointer-events-auto w-full max-w-[98vw] md:max-w-[95vw] md:w-auto relative">
                {/* Close button on panel */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowServerPanel(false);
                  }}
                  className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-white/10 hover:bg-[#E50914] rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label="Close server panel"
                >
                  <svg className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                {/* Mobile: Grid layout, Desktop: Flex row */}
                <div className="grid grid-cols-4 gap-1.5 md:flex md:flex-row md:gap-2 md:overflow-x-auto md:no-scrollbar">
                  {SERVERS.map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => {
                        if (currentServer !== srv.id) {
                          setIsLoading(true);
                          setCurrentServer(srv.id);
                        }
                      }}
                      className={`flex flex-col items-center justify-center px-1.5 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl whitespace-nowrap transition-all duration-200 md:min-w-[90px] ${
                        currentServer === srv.id
                          ? "bg-[#E50914] text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/10 border border-white/5 md:border-transparent md:hover:border-white/20"
                      }`}
                    >
                      <span className="text-[10px] md:text-sm font-semibold leading-tight">{srv.name}</span>
                      <span className={`text-[8px] md:text-xs mt-0.5 leading-tight hidden md:block ${currentServer === srv.id ? 'text-white/80' : 'text-gray-500'}`}>
                        {srv.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>,
    document.body
  );
}
