import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text" | "card" | "poster" | "backdrop";
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

/**
 * Skeleton loading placeholder component
 * Uses shimmer animation for better visual feedback
 */
export default function Skeleton({
  variant = "default",
  width,
  height,
  animate = true,
  className = "",
  style,
  ...props
}: SkeletonProps) {
  const baseClasses = "bg-card";
  const animationClass = animate ? "animate-shimmer" : "";
  
  const variantClasses = {
    default: "rounded-md",
    circular: "rounded-full",
    text: "rounded h-4 w-full",
    card: "rounded-lg",
    poster: "rounded-md aspect-poster",
    backdrop: "rounded-md aspect-backdrop",
  };

  const sizeStyle = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
    height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
    ...style,
  };

  return (
    <div
      className={`${baseClasses} ${animationClass} ${variantClasses[variant]} ${className}`}
      style={sizeStyle}
      aria-hidden="true"
      {...props}
    />
  );
}

/**
 * Skeleton for movie/show cards
 */
export function MovieCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`flex-shrink-0 w-36 sm:w-44 md:w-52 lg:w-60 ${className}`}>
      <Skeleton variant="poster" className="w-full" />
    </div>
  );
}

/**
 * Skeleton for a row of movie cards
 */
export function MovieRowSkeleton({ 
  title = true,
  count = 6 
}: { 
  title?: boolean;
  count?: number;
}) {
  return (
    <div className="space-y-4 container-padding">
      {title && <Skeleton variant="text" width={200} height={24} />}
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton for hero section
 */
export function HeroSkeleton() {
  return (
    <div className="relative w-full h-[56.25vw] max-h-[80vh] min-h-[400px]">
      <Skeleton className="w-full h-full" />
      <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
        <Skeleton variant="text" width="60%" height={48} />
        <Skeleton variant="text" width="40%" height={24} />
        <div className="flex gap-4">
          <Skeleton width={120} height={48} className="rounded-md" />
          <Skeleton width={150} height={48} className="rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for detail page
 */
export function DetailPageSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <Skeleton className="w-full h-[50vh] lg:h-[60vh]" />
      
      {/* Content */}
      <div className="container-padding -mt-32 relative z-10 space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <Skeleton 
            variant="poster" 
            className="w-48 md:w-64 lg:w-72 hidden md:block" 
          />
          
          {/* Info */}
          <div className="flex-1 space-y-4">
            <Skeleton variant="text" width="70%" height={40} />
            <div className="flex gap-2">
              <Skeleton width={60} height={24} className="rounded" />
              <Skeleton width={80} height={24} className="rounded" />
              <Skeleton width={40} height={24} className="rounded" />
            </div>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="60%" />
            <div className="flex gap-4 pt-4">
              <Skeleton width={120} height={48} className="rounded-md" />
              <Skeleton width={48} height={48} className="rounded-full" />
              <Skeleton width={48} height={48} className="rounded-full" />
            </div>
          </div>
        </div>
        
        {/* Cast */}
        <div className="space-y-4">
          <Skeleton variant="text" width={100} height={24} />
          <div className="flex gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton variant="circular" width={80} height={80} />
                <Skeleton variant="text" width={80} height={16} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for search results grid
 */
export function SearchResultsSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant="poster" className="w-full" />
      ))}
    </div>
  );
}

/**
 * Inline text skeleton
 */
export function TextSkeleton({ 
  lines = 1,
  lastLineWidth = "60%",
  className = ""
}: { 
  lines?: number;
  lastLineWidth?: string;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          width={i === lines - 1 ? lastLineWidth : "100%"} 
        />
      ))}
    </div>
  );
}
