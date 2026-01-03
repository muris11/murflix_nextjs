import MovieControls from "@/components/MovieControls";
import MovieRow from "@/components/MovieRow";
import { fetchMovieDetails, getBackdropUrl, getImageUrl } from "@/lib/tmdb";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = parseInt(id);
  
  if (isNaN(movieId)) return { title: "Movie Not Found" };

  try {
    const movie = await fetchMovieDetails(movieId);
    return {
      title: `${movie.title} - Murflix`,
      description: movie.overview,
      openGraph: {
        title: `${movie.title} | Watch on Murflix`,
        description: movie.overview || "Watch this movie on Murflix",
        images: [
          {
            url: getBackdropUrl(movie.backdrop_path || movie.poster_path, "w780"),
            width: 780,
            height: 439,
            alt: movie.title,
          },
        ],
      },
    };
  } catch {
    return { title: "Movie Not Found - Murflix" };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    notFound();
  }

  let movie;
  try {
    movie = await fetchMovieDetails(movieId);
  } catch {
    notFound();
  }

  const director = movie.credits?.crew.find((c) => c.job === "Director");
  const writers =
    movie.credits?.crew
      .filter((c) => c.job === "Writer" || c.job === "Screenplay")
      .slice(0, 3) || [];
  const cast = movie.credits?.cast.slice(0, 12) || [];
  
  // Find trailer (fallback to Teaser or any YouTube video)
  const videos = movie.videos?.results || [];
  const trailer = videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
                 videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
                 videos.find((v) => v.site === "YouTube");

  const similarMovies = movie.similar?.results.slice(0, 20) || [];
  const recommendations = movie.recommendations?.results.slice(0, 20) || [];

  // Get US certification
  const usRelease = movie.release_dates?.results.find(
    (r) => r.iso_3166_1 === "US"
  );
  const certification =
    usRelease?.release_dates.find((rd) => rd.certification)?.certification ||
    "NR";

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full">
        {/* Backdrop Image */}
        <Image
          src={getBackdropUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Multi-layer Gradient Overlays */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-96 z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Poster (Hidden on mobile, visible on desktop) */}
            <div className="hidden md:block flex-shrink-0 w-80 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105 duration-300">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-6 pt-10 md:pt-32">
              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-xl text-gray-300 italic font-light">
                  <span className="text-primary mr-2">|</span>
                  {movie.tagline}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300">
                <span className={`font-bold ${movie.vote_average >= 7 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {Math.round(movie.vote_average * 10)}% Match
                </span>
                <span>{movie.release_date?.split("-")[0]}</span>
                <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">
                  {certification}
                </span>
                <span>{formatRuntime(movie.runtime)}</span>
                <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">
                  HD
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/browse/genre/${genre.id}`}
                    className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>

              {/* Actions */}
              <MovieControls id={movieId} trailerKey={trailer?.key} />

              {/* Overview */}
              <div className="max-w-3xl">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              {/* Cast & Crew Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-gray-800">
                {director && (
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">Director</span>
                    <span className="text-white font-medium">
                      {director.name}
                    </span>
                  </div>
                )}
                {writers.length > 0 && (
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">Writers</span>
                    <span className="text-white font-medium">
                      {writers.map((w) => w.name).join(", ")}
                    </span>
                  </div>
                )}
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Cast</span>
                  <span className="text-white font-medium">
                    {cast
                      .slice(0, 4)
                      .map((c) => c.name)
                      .join(", ")}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Status</span>
                  <span className="text-white font-medium">{movie.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cast Section */}
          {cast.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-1 h-6 bg-primary mr-3 rounded-full"></span>
                Top Cast
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cast.map((member) => (
                  <div
                    key={member.id}
                    className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      {member.profile_path ? (
                        <Image
                          src={getImageUrl(member.profile_path, "w185")}
                          alt={member.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="128px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                          <svg
                            className="w-12 h-12"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="font-bold text-sm truncate text-white group-hover:text-primary transition-colors">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {member.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-16">
              <MovieRow
                title="Recommended For You"
                items={recommendations.map((m) => ({
                  ...m,
                  media_type: "movie" as const,
                }))}
              />
            </div>
          )}

          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div className="mt-8">
              <MovieRow
                title="More Like This"
                items={similarMovies.map((m) => ({
                  ...m,
                  media_type: "movie" as const,
                }))}
              />
            </div>
          )}

          {/* Back Button */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
            >
              <svg
                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
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
