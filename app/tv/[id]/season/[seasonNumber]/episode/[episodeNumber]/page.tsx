import EpisodePlayer from "@/components/EpisodePlayer";
import {
  fetchEpisodeDetails,
  fetchTVDetails,
  getBackdropUrl,
  getImageUrl,
  getProfileUrl,
} from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface EpisodePageProps {
  params: Promise<{ id: string; seasonNumber: string; episodeNumber: string }>;
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { id, seasonNumber, episodeNumber } = await params;
  const tvId = parseInt(id);
  const seasonNum = parseInt(seasonNumber);
  const episodeNum = parseInt(episodeNumber);

  if (isNaN(tvId) || isNaN(seasonNum) || isNaN(episodeNum)) {
    notFound();
  }

  let tvShow;
  let episode;
  try {
    [tvShow, episode] = await Promise.all([
      fetchTVDetails(tvId),
      fetchEpisodeDetails(tvId, seasonNum, episodeNum),
    ]);
  } catch {
    notFound();
  }

  // Get guest stars and crew
  const guestStars = episode.guest_stars?.slice(0, 10) || [];
  const directors = episode.crew?.filter((c) => c.job === "Director") || [];
  const writers =
    episode.crew
      ?.filter((c) => c.job === "Writer" || c.department === "Writing")
      .slice(0, 3) || [];

  // Find adjacent episodes for navigation
  const currentSeason = tvShow.seasons?.find(
    (s) => s.season_number === seasonNum
  );
  const hasPrevEpisode = episodeNum > 1;
  const hasNextEpisode = currentSeason
    ? episodeNum < currentSeason.episode_count
    : false;

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section - Episode Still */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={
            episode.still_path
              ? getImageUrl(episode.still_path, "original")
              : getBackdropUrl(tvShow.backdrop_path, "original")
          }
          alt={episode.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

        {/* Play Button Overlay */}
        <EpisodePlayer 
          tmdbId={tvId}
          seasonNumber={seasonNum}
          episodeNumber={episodeNum}
          seriesTitle={tvShow.name}
          episodeTitle={episode.name}
        />
      </div>

      {/* Content */}
      <div className="relative -mt-32 z-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
            <Link
              href={`/tv/${tvId}`}
              className="hover:text-white transition-colors"
            >
              {tvShow.name}
            </Link>
            <span>/</span>
            <Link
              href={`/tv/${tvId}/season/${seasonNum}`}
              className="hover:text-white transition-colors"
            >
              Season {seasonNum}
            </Link>
            <span>/</span>
            <span className="text-white">Episode {episodeNum}</span>
          </div>

          {/* Episode Badge */}
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-primary px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
              S{seasonNum} E{episodeNum}
            </span>
            {episode.runtime && (
              <span className="text-sm text-gray-300">
                {episode.runtime} min
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {episode.name}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-300 mb-8">
            {episode.vote_average > 0 && (
              <span className="flex items-center text-green-400 font-bold">
                ★ {episode.vote_average.toFixed(1)}
              </span>
            )}
            {episode.air_date && (
              <span>
                Aired{" "}
                {new Date(episode.air_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {episode.vote_count > 0 && (
              <span>
                {episode.vote_count.toLocaleString()} votes
              </span>
            )}
          </div>

          {/* Overview */}
          <div className="max-w-4xl mb-12">
            <p className="text-lg text-gray-300 leading-relaxed">
              {episode.overview || "No description available for this episode."}
            </p>
          </div>

          {/* Crew Info */}
          {(directors.length > 0 || writers.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-gray-800 mb-12">
              {directors.length > 0 && (
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Directed by: </span>
                  <span className="text-white font-medium text-lg">
                    {directors.map((d) => d.name).join(", ")}
                  </span>
                </div>
              )}
              {writers.length > 0 && (
                <div>
                  <span className="block text-sm text-gray-500 mb-1">Written by: </span>
                  <span className="text-white font-medium text-lg">
                    {writers.map((w) => w.name).join(", ")}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Guest Stars */}
          {guestStars.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-1 h-6 bg-primary mr-3 rounded-full"></span>
                Guest Stars
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {guestStars.map((star) => (
                  <div
                    key={star.id}
                    className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      {star.profile_path ? (
                        <Image
                          src={getProfileUrl(star.profile_path, "w185")}
                          alt={star.name}
                          fill
                          className="object-cover"
                          sizes="112px"
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
                      <p className="font-bold text-sm truncate text-white">
                        {star.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {star.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Episode Navigation */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex items-center justify-between">
              {/* Previous Episode */}
              {hasPrevEpisode ? (
                <Link
                  href={`/tv/${tvId}/season/${seasonNum}/episode/${
                    episodeNum - 1
                  }`}
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Previous Episode</span>
                </Link>
              ) : (
                <div />
              )}

              {/* Season Link */}
              <Link
                href={`/tv/${tvId}/season/${seasonNum}`}
                className="hidden sm:block text-sm font-medium text-gray-500 hover:text-white transition-colors"
              >
                All Episodes
              </Link>

              {/* Next Episode */}
              {hasNextEpisode ? (
                <Link
                  href={`/tv/${tvId}/season/${seasonNum}/episode/${
                    episodeNum + 1
                  }`}
                  className="flex items-center text-gray-400 hover:text-white transition-colors group"
                >
                  <span>Next Episode</span>
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Back to Show */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href={`/tv/${tvId}`}
              className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1"
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
              <span>Back to {tvShow.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
