"use client";

import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import { discoverMoviesByGenre, discoverTVByGenre } from "@/lib/tmdb";
import { MediaItem } from "@/types/tmdb";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface LoadMoreProps {
  initialPage: number;
  genreId: number;
  type: "movie" | "tv";
  totalPages: number;
}

export default function LoadMore({
  initialPage,
  genreId,
  type,
  totalPages,
}: LoadMoreProps) {
  const [page, setPage] = useState(initialPage);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMore || page >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const data =
        type === "movie"
          ? await discoverMoviesByGenre(genreId, nextPage)
          : await discoverTVByGenre(genreId, nextPage);

      const newItems = data.results.map(
        (item) =>
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
  }, [page, genreId, type, totalPages, isLoading, hasMore]);

  useEffect(() => {
    if (inView) {
      loadMoreItems();
    }
  }, [inView, loadMoreItems]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
        {items.map((item, index) => (
          <MovieCard key={`${item.id}-${index}`} item={item} fullWidth />
        ))}
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <MovieCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {hasMore && (
        <div
          ref={ref}
          className="flex justify-center items-center py-10 w-full"
        >
          {!isLoading && (
            <div className="w-8 h-8 border-4 border-gray-600 border-t-primary rounded-full animate-spin" />
          )}
        </div>
      )}
    </>
  );
}
