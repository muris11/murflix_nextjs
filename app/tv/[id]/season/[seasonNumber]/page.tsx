import {
  fetchSeasonDetails,
  fetchTVDetails,
  getBackdropUrl,
  getImageUrl,
} from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SeasonPageProps {
  params: Promise<{ id: string; seasonNumber: string }>;
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  const { id, seasonNumber } = await params;
  const tvId = parseInt(id);
  const seasonNum = parseInt(seasonNumber);

  if (isNaN(tvId) || isNaN(seasonNum)) {
    notFound();
  }

  let tvShow;
  let season;
  try {
    [tvShow, season] = await Promise.all([
      fetchTVDetails(tvId),
      fetchSeasonDetails(tvId, seasonNum),
    ]);
  } catch {
    notFound();
  }

  // Sort episodes by episode number
  const episodes = [...(season.episodes || [])].sort(
    (a, b) => a.episode_number - b.episode_number
  );

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        {/* Backdrop Image (use TV show backdrop) */}
        <Image
          src={getBackdropUrl(tvShow.backdrop_path, "original")}
          alt={season.name}
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
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Season Poster */}
            <div className="flex-shrink-0 mx-auto md:mx-0 w-64 md:w-72 rounded-lg shadow-2xl overflow-hidden transform md:-translate-y-16">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={getImageUrl(season.poster_path, "w500")}
                  alt={season.name}
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 pt-4 md:pt-0">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-gray-400 mb-4">
                <Link
                  href={`/tv/${tvId}`}
                  className="hover:text-white transition-colors"
                >
                  {tvShow.name}
                </Link>
                <span>/</span>
                <span className="text-white">{season.name}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {season.name}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center space-x-4 text-sm text-gray-300 mb-6">
                {season.vote_average > 0 && (
                  <span className="font-bold text-green-400">
                    ★ {season.vote_average.toFixed(1)}
                  </span>
                )}
                {season.air_date && (
                  <span>{season.air_date.split("-")[0]}</span>
                )}
                <span>{episodes.length} Episodes</span>
              </div>

              {/* Overview */}
              {season.overview && (
                <div className="max-w-3xl">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {season.overview}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Episodes List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-l-4 border-primary pl-4">
              Episodes ({episodes.length})
            </h2>

            <div className="grid gap-4">
              {episodes.map((episode) => (
                <Link
                  key={episode.id}
                  href={`/tv/${tvId}/season/${seasonNum}/episode/${episode.episode_number}`}
                  className="flex flex-col md:flex-row bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors group"
                >
                  {/* Episode Thumbnail */}
                  <div className="relative w-full md:w-64 aspect-video flex-shrink-0">
                    {episode.still_path ? (
                      <Image
                        src={getImageUrl(episode.still_path, "w500")}
                        alt={episode.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 280px"
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
                    {/* Episode Number Badge */}
                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-white border border-white/10">
                      {episode.episode_number}
                    </div>
                    {/* Play Icon on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                      <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                        <svg
                          className="w-8 h-8 text-white fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Episode Info */}
                  <div className="p-4 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">
                        {episode.name}
                      </h3>
                      {episode.runtime && (
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {episode.runtime}m
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-gray-400 mb-3">
                      {episode.air_date && (
                        <span>
                          {new Date(episode.air_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      )}
                      {episode.vote_average > 0 && (
                        <span className="text-green-400 font-bold">
                          ★ {episode.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2">
                      {episode.overview || "No description available."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
