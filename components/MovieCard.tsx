"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { getBackdropUrl, getImageUrl } from "@/lib/tmdb";
import { MediaItem, Movie, TVShow } from "@/types/tmdb";

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

  const title = isMovie(item) ? item.title : (item as TVShow).name;
  const mediaType = item.media_type || (isMovie(item) ? "movie" : "tv");
  const releaseYear = isMovie(item)
    ? item.release_date?.split("-")[0]
    : (item as TVShow).first_air_date?.split("-")[0];
  const matchScore = Math.round(item.vote_average * 10);

  // Use poster for card
  const posterUrl = item.poster_path
    ? getImageUrl(item.poster_path, "w342")
    : null;
  const backdropUrl = item.backdrop_path
    ? getBackdropUrl(item.backdrop_path, "w780")
    : null;
  const displayImage = posterUrl || backdropUrl || "/placeholder.svg";

  const getTransformOrigin = () => {
    if (isFirst) return "left";
    if (isLast) return "right";
    return "center";
  };

  return (
    <div 
      className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 z-10 ${
        fullWidth ? "w-full" : "w-36 sm:w-44 md:w-52 lg:w-60"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Card */}
      <Link
        href={`/${mediaType}/${item.id}`}
        className="block relative aspect-[2/3] rounded overflow-hidden"
      >
        {!imageError && displayImage !== "/placeholder.svg" ? (
          <Image
            src={displayImage}
            alt={title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 120px, (max-width: 768px) 140px, (max-width: 1024px) 160px, (max-width: 1280px) 180px, 200px"
            onError={() => setImageError(true)}
            className="object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors" />
        
        {/* Title on Hover (Mobile shows always) */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black via-black/70 to-transparent lg:hidden">
          <h3 className="text-xs font-semibold text-white truncate">
            {title}
          </h3>
          {releaseYear && (
            <p className="text-[10px] text-gray-300">{releaseYear}</p>
          )}
        </div>
      </Link>

      {/* Expanded Card on Hover (Desktop Only) */}
      {isHovered && typeof window !== "undefined" && window.innerWidth >= 768 && (
        <div
          className="absolute top-0 w-[150%] h-auto z-50 bg-[#141414] rounded-md shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95 duration-200"
          style={{
            left: isFirst ? 0 : isLast ? "auto" : "50%",
            right: isLast ? 0 : "auto",
            transform: isFirst ? "none" : isLast ? "none" : "translateX(-50%) translateY(-20%)",
            transformOrigin: getTransformOrigin(),
          }}
        >
          {/* Backdrop Image */}
          <Link
            href={`/${mediaType}/${item.id}`}
            className="relative block aspect-video"
          >
            {backdropUrl || posterUrl ? (
              <Image
                src={backdropUrl || posterUrl || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                </svg>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
              <div className="bg-white/90 rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Info Section */}
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-bold text-white line-clamp-1">{title}</h3>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Link
                href={`/${mediaType}/${item.id}?play=true`}
                className="bg-white text-black rounded-full p-1.5 hover:bg-white/90 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </Link>
              <button className="border-2 border-gray-400 rounded-full p-1.5 hover:border-white hover:text-white text-gray-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="border-2 border-gray-400 rounded-full p-1.5 hover:border-white hover:text-white text-gray-300 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </button>
              <Link
                href={`/${mediaType}/${item.id}`}
                className="ml-auto border-2 border-gray-400 rounded-full p-1.5 hover:border-white hover:text-white text-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>

            {/* Metadata */}
            <div className="flex items-center space-x-2 text-[10px] font-semibold text-gray-400">
              {matchScore > 0 && (
                <span className={`text-${matchScore > 70 ? 'green' : 'amber'}-500`}>
                  {matchScore}% Match
                </span>
              )}
              <span className="border border-gray-500 px-1 rounded text-[9px]">HD</span>
              {releaseYear && <span>{releaseYear}</span>}
              <span className="capitalize border border-gray-500/50 px-1 rounded text-[9px]">
                {mediaType === "tv" ? "Series" : "Movie"}
              </span>
            </div>

            {/* Genres */}
            {item.genre_ids && item.genre_ids.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.genre_ids.slice(0, 3).map((id, i) => (
                  <span key={id} className="text-[10px] text-gray-300 flex items-center">
                    {i > 0 && <span className="mx-1 text-gray-600">•</span>}
                    <span>{GENRES[id] || "Drama"}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
