"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { AnimeItem } from "@/types/sansekai";

interface AnimeCardProps {
  item: AnimeItem;
  priority?: boolean;
  fullWidth?: boolean;
}

function AnimeCard({
  item,
  priority = false,
  fullWidth = false,
}: AnimeCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Extract a slug or ID from the URL if possible, otherwise we might need to pass the URL
  // The API likely requires the full URL or a specific part of it. 
  // For safety, we'll encode the URL as a query param or use a hash if backend handles it.
  // Assuming the route will handle encoding.
  const detailUrl = `/anime/detail?url=${encodeURIComponent(item.url)}`;

  return (
    <div 
      className={`relative flex-shrink-0 z-10 transition-transform duration-300 ${
        fullWidth ? "w-full" : "w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]"
      }`}
    >
      <Link
        href={detailUrl}
        className="block relative aspect-[2/3] rounded-sm overflow-hidden bg-[#141414] transition-all duration-300 hover:scale-105 hover:z-20 hover:ring-2 hover:ring-white"
      >
        {!imageError && item.thumb ? (
          <Image
            src={item.thumb}
            alt={item.title}
            fill
            loading={priority ? undefined : "lazy"}
            priority={priority}
            sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, 200px"
            onError={() => setImageError(true)}
            className="object-cover rounded-sm"
          />
        ) : (
          <div className="w-full h-full bg-[#202020] flex items-center justify-center p-4">
            <span className="text-xs text-gray-500 text-center">{item.title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
          <p className="text-white text-xs font-semibold line-clamp-2">{item.title}</p>
        </div>
      </Link>
    </div>
  );
}

export default memo(AnimeCard);
