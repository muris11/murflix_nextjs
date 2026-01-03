import MovieRow from "@/components/MovieRow";
import {
    fetchCollectionDetails,
    getBackdropUrl,
    getImageUrl,
} from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CollectionPageProps {
  params: Promise<{ id: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { id } = await params;
  const collectionId = parseInt(id);

  if (isNaN(collectionId)) {
    notFound();
  }

  let collection;
  try {
    collection = await fetchCollectionDetails(collectionId);
  } catch {
    notFound();
  }

  // Sort movies by release date (oldest first)
  const sortedMovies = [...collection.parts].sort((a, b) => {
    if (!a.release_date) return 1;
    if (!b.release_date) return -1;
    return (
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  });

  // Calculate collection stats
  const totalMovies = collection.parts.length;
  const avgRating =
    collection.parts.length > 0
      ? (
          collection.parts.reduce((sum, m) => sum + m.vote_average, 0) /
          collection.parts.length
        ).toFixed(1)
      : "0";

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        {/* Backdrop Image */}
        <Image
          src={getBackdropUrl(collection.backdrop_path, "original")}
          alt={collection.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-32 z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 mb-16">
            {/* Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0 w-64 md:w-80 rounded-lg shadow-2xl overflow-hidden transform md:-translate-y-16">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(collection.poster_path, "w500")}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  sizes="280px"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 pt-4 md:pt-0">
              {/* Collection Badge */}
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded uppercase tracking-wider text-xs">
                  Collection
                </span>
                <span>
                  {totalMovies} {totalMovies === 1 ? "Movie" : "Movies"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {collection.name}
              </h1>

              {/* Stats */}
              <div className="flex items-center space-x-4 text-sm mb-6">
                <span className={`font-bold ${Number(avgRating) >= 7 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {avgRating} Avg Rating
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-300">{totalMovies} Films</span>
              </div>

              {/* Overview */}
              {collection.overview && (
                <div className="max-w-3xl">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {collection.overview}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Timeline of Movies */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">
              {collection.name} - Complete Timeline
            </h2>

            <div className="grid gap-6">
              {sortedMovies.map((movie, index) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  className="flex flex-col md:flex-row bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group"
                >
                  {/* Movie Poster */}
                  <div className="relative w-full md:w-48 aspect-[16/9] md:aspect-[2/3] flex-shrink-0">
                    <Image
                      src={getImageUrl(movie.poster_path, "w342")}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    {/* Number Badge */}
                    <div className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full border border-white/20 font-bold text-white">
                      {index + 1}
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>

                  {/* Movie Info */}
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {movie.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-400 mb-4">
                      <span>{movie.release_date?.split("-")[0] || "TBA"}</span>
                      {movie.vote_average > 0 && (
                        <>
                          <span>•</span>
                          <span className={`${movie.vote_average >= 7 ? 'text-green-400' : 'text-yellow-400'}`}>
                            ★ {movie.vote_average.toFixed(1)}
                          </span>
                        </>
                      )}
                    </div>
                    {movie.overview && (
                      <p className="text-gray-400 line-clamp-3">
                        {movie.overview}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Movie Row Style */}
          <div className="mt-16">
            <MovieRow
              title="Browse Collection"
              items={sortedMovies.map((m) => ({
                ...m,
                media_type: "movie" as const,
              }))}
            />
          </div>

          {/* Back Button */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
