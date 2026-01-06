"use client";

import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import { MediaItem, Movie, TVShow } from "@/types/tmdb";
import { useCallback, useState } from "react";

interface LoadMoreProps {
  initialPage: number;
  type: "movie" | "tv";
  totalPages: number;
  // Different filter types
  genreId?: number;
  year?: number;
  countryCode?: string;
}

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

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMore || page >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      
      // Build URL based on filter type
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

      setItems((prev) => [...prev, ...newItems]);
      setPage(nextPage);

      if (nextPage >= totalPages || nextPage >= 500) {
        setHasMore(false);
      }
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
            <MovieCard key={`${item.id}-${page}-${index}`} item={item} fullWidth />
          ))}
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <MovieCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      )}

      {hasMore && !isLoading && (
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
