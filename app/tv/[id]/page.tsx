import MovieControls from "@/components/MovieControls";
import MovieRow from "@/components/MovieRow";
import { fetchTVDetails, getBackdropUrl, getImageUrl } from "@/lib/tmdb";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TVPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TVPageProps): Promise<Metadata> {
  const { id } = await params;
  const tvId = parseInt(id);
  
  if (isNaN(tvId)) return { title: "TV Show Not Found" };

  try {
    const tvShow = await fetchTVDetails(tvId);
    return {
      title: `${tvShow.name} - Murflix`,
      description: tvShow.overview,
      openGraph: {
        title: `${tvShow.name} | Watch on Murflix`,
        description: tvShow.overview || "Watch this TV show on Murflix",
        images: [
          {
            url: getBackdropUrl(tvShow.backdrop_path || tvShow.poster_path, "w780"),
            width: 780,
            height: 439,
            alt: tvShow.name,
          },
        ],
      },
    };
  } catch {
    return { title: "TV Show Not Found - Murflix" };
  }
}

export default async function TVPage({ params }: TVPageProps) {
  const { id } = await params;
  const tvId = parseInt(id);

  if (isNaN(tvId)) {
    notFound();
  }

  let tvShow;
  try {
    tvShow = await fetchTVDetails(tvId);
  } catch {
    notFound();
  }

  const creator = tvShow.created_by?.[0];
  const cast = tvShow.credits?.cast.slice(0, 12) || [];
  
  // Find trailer (fallback to Teaser or any YouTube video)
  const videos = tvShow.videos?.results || [];
  const trailer = videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
                 videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
                 videos.find((v) => v.site === "YouTube");

  const similarShows = tvShow.similar?.results.slice(0, 20) || [];
  const recommendations = tvShow.recommendations?.results.slice(0, 20) || [];

  // Get US content rating
  const usRating = tvShow.content_ratings?.results.find(
    (r) => r.iso_3166_1 === "US"
  );
  const contentRating = usRating?.rating || "NR";

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="relative h-[85vh] w-full">
        {/* Backdrop Image */}
        <Image
          src={getBackdropUrl(tvShow.backdrop_path, "original")}
          alt={tvShow.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative -mt-96 z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Poster */}
            <div className="hidden md:block flex-shrink-0 w-80 rounded-lg shadow-2xl overflow-hidden transform transition-transform hover:scale-105 duration-300">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(tvShow.poster_path, "w500")}
                  alt={tvShow.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-6 pt-10 md:pt-32">
              {/* Tags */}
              <div className="flex items-center space-x-3 text-sm font-bold tracking-wider">
                <span className="text-gray-400">TV SERIES</span>
                <span className="bg-gray-800 px-2 py-0.5 rounded text-white uppercase">
                  {tvShow.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
                {tvShow.name}
              </h1>

              {/* Tagline */}
              {tvShow.tagline && (
                <p className="text-xl text-gray-300 italic font-light">
                  <span className="text-primary mr-2">|</span>
                  {tvShow.tagline}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-300">
                <span className={`font-bold ${tvShow.vote_average >= 7 ? 'text-green-400' : 'text-yellow-400'}`}>
                  {Math.round(tvShow.vote_average * 10)}% Match
                </span>
                <span>{tvShow.first_air_date?.split("-")[0]}</span>
                <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">
                  {contentRating}
                </span>
                <span>
                  {tvShow.number_of_seasons} Season
                  {tvShow.number_of_seasons > 1 ? "s" : ""}
                </span>
                <span className="border border-gray-500 px-2 py-0.5 rounded text-xs">
                  HD
                </span>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {tvShow.genres.map((genre) => (
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
              <MovieControls
                id={tvId}
                mediaType="tv"
                trailerKey={trailer?.key}
              />

              {/* Overview */}
              <div className="max-w-3xl">
                <h3 className="text-lg font-semibold mb-2">Overview</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {tvShow.overview || "No overview available."}
                </p>
              </div>

              {/* Additional Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-800">
                {creator && (
                  <div>
                    <span className="block text-sm text-gray-500 mb-1">Created By</span>
                    <span className="text-white font-medium">{creator.name}</span>
                  </div>
                )}
                <div>
                  <span className="block text-sm text-gray-500 mb-1">First Aired</span>
                  <span className="text-white font-medium">{tvShow.first_air_date}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Episodes</span>
                  <span className="text-white font-medium">
                    {tvShow.number_of_episodes}
                  </span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Language</span>
                  <span className="text-white font-medium uppercase">
                    {tvShow.original_language}
                  </span>
                </div>
                {tvShow.networks && tvShow.networks.length > 0 && (
                  <div className="col-span-2">
                    <span className="block text-sm text-gray-500 mb-1">Network</span>
                    <span className="text-white font-medium">
                      {tvShow.networks[0].name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seasons Section */}
          {tvShow.seasons && tvShow.seasons.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-1 h-6 bg-primary mr-3 rounded-full"></span>
                Seasons
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {tvShow.seasons
                  .filter((s) => s.season_number > 0)
                  .slice(0, 16)
                  .map((season) => (
                    <Link
                      key={season.id}
                      href={`/tv/${tvId}/season/${season.season_number}`}
                      className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden">
                        {season.poster_path ? (
                          <Image
                            src={getImageUrl(season.poster_path, "w342")}
                            alt={season.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 12vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                            <svg
                              className="w-12 h-12"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM9.5 12l-2.5 3h12l-3.5-4.5-2.5 3z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="p-3">
                        <p className="font-bold text-sm truncate text-white group-hover:text-primary transition-colors">
                          {season.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {season.episode_count} Eps
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* Cast Section */}
          {cast.length > 0 && (
            <div className="mt-16">
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
                items={recommendations.map((s) => ({
                  ...s,
                  media_type: "tv" as const,
                }))}
              />
            </div>
          )}

          {/* Similar Shows */}
          {similarShows.length > 0 && (
            <div className="mt-8">
              <MovieRow
                title="More Like This"
                items={similarShows.map((s) => ({
                  ...s,
                  media_type: "tv" as const,
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
