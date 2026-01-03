import Skeleton from "./Skeleton";

interface MovieCardSkeletonProps {
  className?: string;
  fullWidth?: boolean;
}

export default function MovieCardSkeleton({ 
  className = "",
  fullWidth = false 
}: MovieCardSkeletonProps) {
  return (
    <div 
      className={`relative flex-shrink-0 ${
        fullWidth ? "w-full" : "w-20 sm:w-24 md:w-28 lg:w-32 xl:w-40"
      } ${className}`}
    >
      <Skeleton variant="poster" className="w-full aspect-[2/3] rounded-sm" />
    </div>
  );
}

/**
 * Row of movie card skeletons for loading states
 */
export function MovieRowSkeleton({ 
  title = true,
  count = 6,
  className = ""
}: { 
  title?: boolean;
  count?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && (
        <div className="container-padding">
          <Skeleton width={200} height={28} className="rounded" />
        </div>
      )}
      <div className="flex gap-2 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {Array.from({ length: count }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
