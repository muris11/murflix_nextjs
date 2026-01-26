"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { DramaItem } from "@/types/sansekai";

interface DramaCardProps {
  item: DramaItem;
  provider: "dramabox" | "reelshort" | "netshort" | "flickreels" | "melolo";
  priority?: boolean;
  fullWidth?: boolean;
}

function DramaCard({
  item,
  provider,
  priority = false,
  fullWidth = false,
}: DramaCardProps) {
  const [imageError, setImageError] = useState(false);
  const title = item.title;
  
  // Determine ID (some providers use bookId, others might use id or shortPlayId)
  const id = item.bookId || item.shortPlayId || item.id || "";

  return (
    <div 
      className={`relative flex-shrink-0 z-10 transition-transform duration-300 ${
        fullWidth ? "w-full" : "w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] xl:w-[180px] 2xl:w-[200px]"
      }`}
    >
      <Link
        href={`/${provider}/${id}`}
        className="block relative aspect-[2/3] rounded-sm overflow-hidden bg-[#141414] transition-all duration-300 hover:scale-105 hover:z-20 hover:ring-2 hover:ring-white"
      >
        {!imageError && item.cover ? (
          <Image
            src={item.cover}
            alt={title}
            fill
            loading={priority ? undefined : "lazy"}
            priority={priority}
            sizes="(max-width: 768px) 100px, (max-width: 1024px) 140px, 180px"
            onError={() => setImageError(true)}
            className="object-cover rounded-sm"
          />
        ) : (
          <div className="w-full h-full bg-[#202020] flex items-center justify-center p-4">
            <span className="text-xs text-gray-500 text-center">{title}</span>
          </div>
        )}
        
        {/* Gradient Overlay for Text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
          <p className="text-white text-xs font-semibold line-clamp-2">{title}</p>
          {item.category && (
             <p className="text-gray-300 text-[10px] line-clamp-1">
               {Array.isArray(item.category) ? item.category[0] : item.category}
             </p>
          )}
        </div>
      </Link>
    </div>
  );
}

export default memo(DramaCard);
