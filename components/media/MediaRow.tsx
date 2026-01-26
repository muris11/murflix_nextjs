"use client";

import { useRef, useState } from "react";

interface MediaRowProps {
  title: string;
  items: any[];
  renderItem: (item: any) => React.ReactNode;
}

export default function MediaRow({ title, items, renderItem }: MediaRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
      
      if (direction === "left" && scrollTo <= 0) {
        setIsMoved(false);
      }
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="h-40 space-y-0.5 md:space-y-2 mb-8">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl px-4 sm:px-6 lg:px-8">
        {title}
      </h2>
      
      <div className="group relative md:-ml-2">
        <div 
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-full w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        >
           <div className="flex h-full items-center justify-center bg-black/30 hover:bg-black/50 rounded-full">
             <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
           </div>
        </div>

        <div
          ref={rowRef}
          className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-3.5 md:p-2 px-4 sm:px-6 lg:px-8"
        >
          {items.map((item, index) => (
             <div key={index}>
                {renderItem(item)}
             </div>
          ))}
        </div>

        <div 
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-full w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        >
          <div className="flex h-full items-center justify-center bg-black/30 hover:bg-black/50 rounded-full">
             <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
