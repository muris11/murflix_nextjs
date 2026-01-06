"use client";

import { memo, useCallback, useState, useTransition } from "react";
import dynamic from "next/dynamic";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import { MediaItem, Movie, TVShow } from "@/types/tmdb";

// Lazy load MovieCard for better initial load
const MovieCard = dynamic(() => import("@/components/MovieCard"), {
  loading: () => <MovieCardSkeleton />,
  ssr: false,
});

interface LoadMoreProps {
  initialPage: number;
  type: "movie" | "tv";
  totalPages: number;
  genreId?: number;
  year?: number;
  countryCode?: string;
}

// Memoized grid item to prevent unnecessary re-renders
const GridItem = memo(function GridItem({ 
  item, 
  itemKey 
}: { 
  item: MediaItem; 
  itemKey: string;
}) {
  return <MovieCard key={itemKey} item={item} fullWidth />;
});

export default function LoadMore({
  initialPage,
  type,
  totalPages,
  genreId,
  year,
  countryCode,
}: LoadMoreProps) {
  const [page, setPage] = useState(initialPage);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isPending, startTransition] = useTransition();

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMore || page >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      
      let url = `/api/discover?type=${type}&page=${nextPage}`;
      if (genreId) url += `&genreId=${genreId}`;
      if (year) url += `&year=${year}`;
      if (countryCode) url += `&countryCode=${countryCode}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to discover');
      const data = await response.json();

      const newItems = data.results.map(
        (item: Movie | TVShow) =>
          ({
            ...item,
            media_type: type,
          } as MediaItem)
      );

      // Use startTransition for non-urgent state update to prevent UI blocking
      startTransition(() => {
        setItems((prev) => [...prev, ...newItems]);
        setPage(nextPage);

        if (nextPage >= totalPages || nextPage >= 500) {
          setHasMore(false);
        }
      });
    } catch (error) {
      console.error("Failed to load more items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, type, totalPages, isLoading, hasMore, genreId, year, countryCode]);

  return (
    <>
      {items.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-4">
          {items.map((item, index) => (
            <GridItem 
              key={`${item.id}-${page}-${index}`} 
              item={item} 
              itemKey={`${item.id}-${page}-${index}`}
            />
          ))}
        </div>
      )}

      {(isLoading || isPending) && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {hasMore && !isLoading && !isPending && (
        <div className="flex justify-center py-10 w-full">
          <button
            onClick={loadMoreItems}
            className="px-8 py-3 bg-primary hover:bg-primary/80 text-white font-semibold rounded-md transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
