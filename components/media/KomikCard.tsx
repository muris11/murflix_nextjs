"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import { KomikItem } from "@/types/sansekai";

interface KomikCardProps {
  item: KomikItem;
  priority?: boolean;
  fullWidth?: boolean;
}

function KomikCard({
  item,
  priority = false,
  fullWidth = false,
}: KomikCardProps) {
  const [imageError, setImageError] = useState(false);
  const detailUrl = `/komik/detail?url=${encodeURIComponent(item.url)}`;

  return (
    <div 
      className={`relative flex-shrink-0 z-10 transition-transform duration-300 ${
        fullWidth ? "w-full" : "w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px]"
      }`}
    >
      <Link
        href={detailUrl}
        className="block relative aspect-[3/4] rounded-sm overflow-hidden bg-[#141414] transition-all duration-300 hover:scale-105 hover:z-20 hover:ring-2 hover:ring-white"
      >
        {!imageError && item.thumb ? (
          <Image
            src={item.thumb}
            alt={item.title}
            fill
            loading={priority ? undefined : "lazy"}
            priority={priority}
            sizes="(max-width: 768px) 100px, (max-width: 1024px) 140px, 160px"
            onError={() => setImageError(true)}
            className="object-cover rounded-sm"
          />
        ) : (
          <div className="w-full h-full bg-[#202020] flex items-center justify-center p-4">
            <span className="text-xs text-gray-500 text-center">{item.title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex flex-col justify-end p-2">
           <p className="text-white text-xs font-semibold line-clamp-2 drop-shadow-md">{item.title}</p>
           {item.type && (
             <span className="text-[10px] text-gray-300 uppercase mt-1">{item.type}</span>
           )}
        </div>
      </Link>
    </div>
  );
}

export default memo(KomikCard);
