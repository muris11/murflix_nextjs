"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { getBackdropUrl } from "@/lib/image";
import { MediaItem, Video } from "@/types/tmdb";

import Icon from "@/components/ui/Icon";

import VideoPlayerModal from "./VideoPlayerModal";

interface HeroProps {
  items: MediaItem[];
}

export default function Hero({ items }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBackgroundVideo, setShowBackgroundVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Filter out items without backdrop or overview
  const featuredItems = items
    .filter((item) => item.backdrop_path && (item.overview || "").length > 20)
    .slice(0, 5);

  const currentItem = featuredItems[currentIndex];
  
  // Reset background video when currentIndex changes - intentional sync when slide changes
  useEffect(() => {
    setShowBackgroundVideo(false);
  }, [currentIndex]);

  useEffect(() => {
    if (featuredItems.length <= 1 || isPlayerOpen) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((current) =>
          current === featuredItems.length - 1 ? 0 : current + 1
        );
        setIsTransitioning(false);
      }, 500);
    }, 15000); // Increased duration to allow video watching

    return () => clearInterval(timer);
  }, [featuredItems.length, isPlayerOpen]);

  const fetchTrailer = useCallback(async () => {
    if (!currentItem) return;
    const mediaType = currentItem.media_type || "movie";
    try {
      const response = await fetch(`/api/videos?id=${currentItem.id}&type=${mediaType}`);
      if (!response.ok) throw new Error('Failed to fetch videos');
      const data = await response.json();
      const videos = data.results || [];
      const trailer = videos.find((v: Video) => v.type === "Trailer" && v.site === "YouTube") ||
                     videos.find((v: Video) => v.type === "Teaser" && v.site === "YouTube") ||
                     videos.find((v: Video) => v.site === "YouTube");

      if (trailer) {
        const key = trailer.key;
        setTrailerUrl(`https://www.youtube.com/embed/${key}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`);
        
        // Schedule background video
        const videoTimer = setTimeout(() => {
           setShowBackgroundVideo(true);
        }, 3000); // Start video after 3s
        return () => clearTimeout(videoTimer);
      } else {
        setTrailerUrl(null);
        setShowBackgroundVideo(false);
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  }, [currentItem]);

  useEffect(() => {
    const loadTrailer = async () => {
      await fetchTrailer();
    };
    
    loadTrailer();
  }, [fetchTrailer]);

  const handlePlay = () => {
    setPlayTrailer(false);
    setIsPlayerOpen(true);
  };

  if (!currentItem) return null;

  const title = "title" in currentItem ? currentItem.title : currentItem.name || "";
  const overview = currentItem.overview || "";
  const mediaType = currentItem.media_type || "movie";
  const matchScore = Math.round(currentItem.vote_average * 10);
  
  // Safe Date Handling
  const releaseDate = "release_date" in currentItem ? currentItem.release_date : currentItem.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : "";
  const itemRating = "adult" in currentItem && currentItem.adult ? "18+" : "13+";

  // Extract video ID for background (mute + loop)
  const videoId = trailerUrl ? trailerUrl.split('/embed/')[1]?.split('?')[0] : null;
  const backgroundVideoUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&loop=1&playlist=${videoId}&start=10` 
    : null;

  return (
    <>
      <section className="relative h-[75vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] xl:h-[95vh] 2xl:h-[85vh] w-full overflow-hidden text-white bg-black group">
        {/* Background Image Layer */}
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${showBackgroundVideo ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={getBackdropUrl(currentItem.backdrop_path, "original")}
            alt={title}
            fill
            priority
            className={`object-cover object-top sm:object-center transition-all duration-1000 ${
              isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            sizes="100vw"
          />
          {/* Subtle vignette for focus */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Background Video Layer */}
        {showBackgroundVideo && backgroundVideoUrl && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <iframe
                src={backgroundVideoUrl}
                className="absolute w-full h-full scale-[1.5] sm:scale-[1.3] md:scale-[1.2] opacity-60"
                allow="autoplay; encrypted-media"
                style={{ pointerEvents: isMuted ? 'none' : 'auto' }}
              />
            </div>
          </div>
        )}

        {/* Gradient Overlays (Crucial for Netflix Look) */}
        
        {/* Left Shadow for Text Readability - responsive width */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]" />
        
        {/* Bottom Fade to merge with content */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent z-[2]" />

        {/* Content Container - improved responsive positioning */}
        <div className="absolute inset-0 flex flex-col justify-end z-10 pb-8 sm:pb-12 md:pb-20 lg:pb-28 xl:pb-32 2xl:pb-36">
          <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 flex items-end justify-between">
            <div
              className={`max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 transition-all duration-700 delay-100 ${
                isTransitioning ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
               {/* Metadata Line */}
               <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm md:text-base font-medium drop-shadow-md">
                 <span className="text-[#E50914] font-black tracking-widest text-[9px] sm:text-[10px] md:text-xs uppercase bg-black/10 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-[#E50914]/20">
                    {mediaType === 'tv' ? 'SERIES' : 'MOVIE'}
                 </span>
                 
                 {year && <span className="text-gray-300 font-semibold text-xs sm:text-sm md:text-base">{year}</span>}
                 
                 <span className={`font-bold text-xs sm:text-sm md:text-base ${matchScore >= 70 ? 'text-[#46d369]' : 'text-yellow-400'}`}>
                    {matchScore}% Match
                 </span>

                 <span className="border border-white/40 px-1 sm:px-1.5 md:px-2 py-0.5 text-[9px] sm:text-[10px] md:text-xs rounded text-gray-200">
                   {itemRating}
                 </span>
                 <span className="border border-white/40 px-1 sm:px-1.5 md:px-2 py-0.5 text-[9px] sm:text-[10px] md:text-xs rounded text-gray-200">
                   HD
                 </span>
               </div>

              {/* Huge Title - fully responsive */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight sm:leading-none tracking-tight drop-shadow-2xl text-white">
                {title}
              </h1>

              {/* Overview - Clamped but legible, show on all screens */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white/90 drop-shadow-md line-clamp-2 sm:line-clamp-3 font-medium max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl leading-relaxed">
                {overview}
              </p>

              {/* Action Buttons - responsive sizing */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pt-1 sm:pt-2 md:pt-4">
                <button
                  onClick={handlePlay}
                  className="flex items-center bg-white text-black px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-[4px] font-bold text-xs sm:text-sm md:text-base hover:bg-white/80 transition-colors transform active:scale-95 duration-200"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1.5 sm:mr-2 fill-black" viewBox="0 0 24 24">
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                  Play
                </button>

                <Link
                  href={`/${mediaType}/${currentItem.id}`}
                  className="flex items-center bg-[rgba(109,109,110,0.7)] text-white px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-[4px] font-bold text-xs sm:text-sm md:text-base backdrop-blur-sm hover:bg-[rgba(109,109,110,0.4)] transition-colors"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-1.5 sm:mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  More Info
                </Link>
              </div>
            </div>

            {showBackgroundVideo && (
              <div className="hidden md:flex items-center space-x-3 mb-6 mr-4 z-20">
                 <button 
                   onClick={() => setIsMuted(!isMuted)}
                   className="p-2 lg:p-2.5 rounded-full border border-white/50 hover:border-white bg-black/30 hover:bg-white/10 backdrop-blur-sm transition-all text-white"
                   aria-label={isMuted ? "Unmute" : "Mute"}
                 >
                   <Icon name={isMuted ? "volume-mute" : "volume"} size={20} />
                 </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <VideoPlayerModal
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        videoUrl={playTrailer ? trailerUrl || "" : undefined}
        tmdbId={currentItem.id}
        mediaType={currentItem.media_type || "movie"}
        title={title}
        subTitle={year ? `(${year})` : undefined}
      />
    </>
  );
}
