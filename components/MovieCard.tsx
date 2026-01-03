"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

import { getBackdropUrl, getImageUrl } from "@/lib/tmdb";
import { MediaItem, Movie, TVShow } from "@/types/tmdb";
import { useMediaQuery, breakpoints } from "@/hooks";

interface MovieCardProps {
  item: Movie | TVShow | MediaItem;
  priority?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  fullWidth?: boolean;
}

function isMovie(item: Movie | TVShow | MediaItem): item is Movie {
  return "title" in item;
}

const GENRES: Record<number, string> = {
  28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
  80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family",
  14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
  9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV Movie",
  53: "Thriller", 10752: "War", 37: "Western",
  10759: "Action & Adventure", 10762: "Kids", 10763: "News",
  10764: "Reality", 10765: "Sci-Fi & Fantasy", 10766: "Soap",
  10767: "Talk", 10768: "War & Politics",
};

export default function MovieCard({
  item,
  priority = false,
  isFirst = false,
  isLast = false,
  fullWidth = false,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // SSR-safe media query
  const isDesktop = useMediaQuery(breakpoints.md);

  const title = isMovie(item) ? item.title : (item as TVShow).name;
  const mediaType = item.media_type || (isMovie(item) ? "movie" : "tv");
  const releaseYear = isMovie(item)
    ? item.release_date?.split("-")[0]
    : (item as TVShow).first_air_date?.split("-")[0];
  const matchScore = Math.round(item.vote_average * 10);

  // Images
  const posterUrl = item.poster_path
    ? getImageUrl(item.poster_path, "w500")
    : null;
  const backdropUrl = item.backdrop_path
    ? getBackdropUrl(item.backdrop_path, "w780")
    : null;
  
  // Use poster for base card, backdrop for hover
  const displayImage = posterUrl || backdropUrl || "/placeholder.svg";
  const hoverImage = backdropUrl || posterUrl || "/placeholder.svg";

  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    
    // Calculate coordinates immediately
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }

    hoverTimeout.current = setTimeout(() => {
      setIsHovered(true);
    }, 400); // 400ms delay like Netflix
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(false);
  };

  // Close on scroll to prevent detached hover card
  useEffect(() => {
    const handleScroll = () => {
      if (isHovered) setIsHovered(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHovered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    };
  }, []);

  return (
    <>
      <div 
        ref={cardRef}
        className={`relative flex-shrink-0 z-10 transition-transform duration-300 ${
          fullWidth ? "w-full" : "w-20 sm:w-24 md:w-28 lg:w-32 xl:w-40"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Base Card (Poster) */}
        <Link
          href={`/${mediaType}/${item.id}`}
          className="block relative aspect-[2/3] rounded-sm overflow-hidden bg-[#141414] transition-all duration-300"
        >
          {!imageError && displayImage !== "/placeholder.svg" ? (
            <Image
              src={displayImage}
              alt={title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 150px, 300px"
              onError={() => setImageError(true)}
              className="object-cover rounded-sm"
            />
          ) : (
            <div className="w-full h-full bg-[#202020] flex items-center justify-center p-4">
              <span className="text-xs text-gray-500 text-center">{title}</span>
            </div>
          )}
        </Link>
      </div>

      {/* Expanded Hover Card (Portal) */}
      {isHovered && isDesktop && typeof document !== "undefined" && createPortal(
        <div
          className="fixed z-[9999] pointer-events-none" // pointer-events-auto applied to child
          style={{ top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <div
            className="absolute bg-[#181818] rounded-md shadow-[0px_4px_15px_0px_rgba(0,0,0,0.75)] overflow-hidden pointer-events-auto animate-in fade-in zoom-in-95 duration-300"
            style={{
              width: coords.width * 1.5, // 1.5x expansion
              top: coords.top - (coords.width * 1.5 * 0.5625 * 0.15) - window.scrollY, // Fixed position relative to viewport
              left: (isFirst 
                ? coords.left 
                : isLast 
                  ? coords.left - (coords.width * 0.5) 
                  : coords.left - (coords.width * 0.25)) - window.scrollX,
              transformOrigin: 'center',
            }}
            onMouseEnter={() => {
              if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
              setIsHovered(true);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {/* Preview Image (Backdrop) */}
            <Link
              href={`/${mediaType}/${item.id}`}
              className="block relative aspect-video w-full"
            >
              <Image
                src={hoverImage}
                alt={title}
                fill
                className="object-cover"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
              
              <div className="absolute bottom-2 left-2 px-2">
                 <h4 className="text-white font-bold text-shadow line-clamp-1 drop-shadow-md">{title}</h4>
              </div>
            </Link>

            {/* Action Buttons & Info */}
            <div className="p-4 space-y-3 bg-[#181818]">
              
              {/* Buttons Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Play Button */}
                  <Link
                    href={`/${mediaType}/${item.id}?play=true`}
                    className="bg-white text-black w-8 h-8 rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center border border-white"
                    title="Play"
                  >
                    <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Link>
                  
                  {/* Add to List */}
                  <button className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white text-white flex items-center justify-center transition-colors bg-[rgba(42,42,42,.6)]" title="Add to My List">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </button>
                  
                  {/* Like */}
                  <button className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white text-white flex items-center justify-center transition-colors bg-[rgba(42,42,42,.6)]" title="I like this">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.396C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                    </svg>
                  </button>
                </div>

                {/* More Info Chevron */}
                <Link
                  href={`/${mediaType}/${item.id}`}
                  className="w-8 h-8 rounded-full border-2 border-gray-400 hover:border-white text-white flex items-center justify-center transition-colors bg-[rgba(42,42,42,.6)] ml-auto"
                  title="More Info"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </Link>
              </div>

              {/* Metadata Row */}
              <div className="flex items-center flex-wrap gap-2 text-[11px] font-semibold">
                <span className="text-[#46d369] font-bold">
                  {matchScore}% Match
                </span>
                
                <span className="border border-gray-500 text-gray-400 px-1 py-0.5 rounded-[2px] uppercase">
                  {('adult' in item && item.adult) ? '18+' : '13+'}
                </span>

                <span className="text-gray-400">
                  {releaseYear}
                </span>

                <span className="border border-white/40 text-gray-400 px-1 py-0.5 rounded-[2px] text-[9px] flex items-center justify-center">
                  HD
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-white">
                {item.genre_ids?.slice(0, 3).map((id, idx) => (
                  <span key={id} className="flex items-center">
                    {idx > 0 && <span className="text-gray-500 mr-1.5">•</span>}
                    {GENRES[id]}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
