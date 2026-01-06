'use client';

import { useRef, useState } from 'react';

import { MediaItem, Movie, TVShow } from '@/types/tmdb';

import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  items: (Movie | TVShow | MediaItem)[];
  priority?: boolean;
}

export default function MovieRow({ title, items, priority = false }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="py-1 sm:py-1.5 md:py-2 space-y-1 group">
      {/* Title */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <h2 className="group/title inline-flex items-center gap-2 text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl font-bold text-[#e5e5e5] hover:text-white transition-colors cursor-pointer mb-1">
          <span>{title}</span>
          <div className="flex items-center opacity-0 -translate-x-2 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all duration-300 text-[#E50914] text-[10px] md:text-xs font-bold mt-0.5 tracking-wide">
            <span className="whitespace-nowrap">Explore All</span>
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </h2>
      </div>

      {/* Row Container */}
      <div className="relative group/row">
        {/* Left Arrow */}
        <button
          className={`absolute left-0 top-0 bottom-0 z-40 w-12 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/row:opacity-100 ${
            !showLeftArrow ? 'hidden' : ''
          }`}
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <svg className="w-8 h-8 text-white transform hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scrollable Row */}
        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex space-x-2 sm:space-x-2.5 md:space-x-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 pb-4 pt-2 -mt-2 scroll-smooth"
        >
          {items.map((item, index) => (
            <MovieCard 
              key={`${item.id}-${index}`} 
              item={item} 
              priority={priority && index < 6}
              isFirst={index === 0}
              isLast={index === items.length - 1}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          className={`absolute right-0 top-0 bottom-0 z-40 w-12 bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all duration-300 opacity-0 group-hover/row:opacity-100 ${
            !showRightArrow ? 'hidden' : ''
          }`}
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <svg className="w-8 h-8 text-white transform hover:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
