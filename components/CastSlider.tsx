"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/image";
import { CastMember } from "@/types/tmdb";

interface CastSliderProps {
  cast: CastMember[];
}

export default function CastSlider({ cast }: CastSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isHovered) return;

    const interval = setInterval(() => {
      const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollContainer.scrollLeft >= maxScrollLeft - 5) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: 120, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)} 
    >
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
        {cast.map((member) => (
          <div 
            key={member.id} 
            className="flex-shrink-0 w-24 md:w-28 snap-start transition-opacity duration-300"
          >
            <div className="relative aspect-[2/3] rounded-sm overflow-hidden bg-[#222]">
              {member.profile_path ? (
                <Image
                  src={getImageUrl(member.profile_path, "w185")}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 112px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 bg-[#333]">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="mt-2">
              <p className="text-[11px] font-semibold text-[#e5e5e5] truncate leading-tight">{member.name}</p>
              <p className="text-[10px] text-[#808080] truncate leading-tight">{member.character}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute top-0 right-0 bottom-8 w-16 bg-gradient-to-l from-[#141414] to-transparent pointer-events-none" />
    </div>
  );
}
