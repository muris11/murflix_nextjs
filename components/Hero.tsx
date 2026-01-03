"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { getBackdropUrl } from "@/lib/tmdb";
import { MediaItem } from "@/types/tmdb";

import VideoPlayerModal from "./VideoPlayerModal";

interface HeroProps {
  items: MediaItem[];
}

export default function Hero({ items }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const featuredItems = items
    .filter((item) => item.backdrop_path && (item.overview || "").length > 20)
    .slice(0, 5);

  const currentItem = featuredItems[currentIndex];

  useEffect(() => {
    if (featuredItems.length <= 1 || isPlayerOpen) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((current) =>
          current === featuredItems.length - 1 ? 0 : current + 1
        );
        setIsTransitioning(false);
      }, 300);
    }, 8000);

    return () => clearInterval(timer);
  }, [featuredItems.length, isPlayerOpen]);

  const handlePlayClick = useCallback(async () => {
    if (!currentItem) return;

    const mediaType = currentItem.media_type || "movie";
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${currentItem.id}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
          },
        }
      );
      const data = await res.json();
      const videos = data.results || [];
      const trailer = videos.find((v: any) => v.type === "Trailer" && v.site === "YouTube") ||
                     videos.find((v: any) => v.type === "Teaser" && v.site === "YouTube") ||
                     videos.find((v: any) => v.site === "YouTube");

      if (trailer) {
        setVideoUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
        setIsPlayerOpen(true);
      }
    } catch (error) {
      console.error("Failed to fetch trailer:", error);
    }
  }, [currentItem]);

  if (!currentItem) return null;

  const title =
    "title" in currentItem ? currentItem.title : currentItem.name || "";
  const overview = currentItem.overview || "";
  const mediaType = currentItem.media_type || "movie";
  const matchScore = Math.round(currentItem.vote_average * 10);

  return (
    <>
      <section className="relative h-[85vh] w-full overflow-hidden text-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getBackdropUrl(currentItem.backdrop_path, "original")}
            alt={title}
            fill
            priority
            className={`object-cover transition-opacity duration-700 ${
              isTransitioning ? "opacity-50" : "opacity-100"
            }`}
            sizes="100vw"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-[1]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#141414] to-transparent z-[1]" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
            <div
              className={`max-w-xl space-y-6 transition-all duration-700 ${
                isTransitioning ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              {/* Meta Info */}
              <div className="flex items-center space-x-3 text-sm font-medium">
                {matchScore > 0 && (
                  <span className="text-green-400 font-bold">
                    {matchScore}% Match
                  </span>
                )}
                <span className="bg-white/20 px-2 py-0.5 rounded text-xs uppercase tracking-wider">
                  {mediaType === "tv" ? "Series" : "Movie"}
                </span>
                <span className="border border-white/40 px-2 py-0.5 rounded text-xs">
                  HD
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                {title}
              </h1>

              {/* Overview */}
              <p className="text-base sm:text-lg text-gray-200 line-clamp-3 drop-shadow-md">
                {overview}
              </p>

              {/* Buttons */}
              <div className="flex items-center space-x-4 pt-2 relative z-20">
                <button
                  onClick={handlePlayClick}
                  className="flex items-center bg-white text-black px-6 py-2.5 rounded font-bold hover:bg-white/90 transition-colors transform hover:scale-105 duration-200"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 3l14 9-14 9V3z" />
                  </svg>
                  Play
                </button>

                <Link
                  href={`/${mediaType}/${currentItem.id}`}
                  className="flex items-center bg-gray-500/30 text-white px-6 py-2.5 rounded font-bold backdrop-blur-sm hover:bg-gray-500/40 transition-colors border border-white/20"
                >
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  More Info
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute right-4 bottom-24 lg:right-12 lg:bottom-1/3 flex flex-col space-y-4 z-20">
          <div className="hidden lg:block">
            <div className="flex flex-col space-y-2">
              {featuredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                      setCurrentIndex(index);
                      setIsTransitioning(false);
                    }, 300);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 border border-white/50 ${
                    index === currentIndex ? "bg-white scale-125" : "bg-transparent hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <VideoPlayerModal
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        videoUrl={videoUrl || ""}
      />
    </>
  );
}
