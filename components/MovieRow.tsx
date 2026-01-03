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
    <section className="py-4 md:py-8 space-y-4 group">
      {/* Title */}
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-white transition-colors hover:text-primary flex items-center cursor-pointer">
          {title}
          <svg 
            className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary transform group-hover:translate-x-1"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
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
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-8 pt-4 -mt-4 scroll-smooth"
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
