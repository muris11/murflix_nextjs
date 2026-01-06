import MovieCard from "@/components/MovieCard";
import { discoverByProvider, fetchMovieWatchProvidersList } from "@/lib/tmdb";
import { MediaItem } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProviderPageProps {
  params: Promise<{ providerId: string }>;
  searchParams: Promise<{ type?: string; page?: string }>;
}

export default async function ProviderPage({
  params,
  searchParams,
}: ProviderPageProps) {
  const { providerId } = await params;
  const { type = "movie" } = await searchParams;
  const provId = parseInt(providerId);

  if (isNaN(provId)) {
    notFound();
  }

  // Fetch providers list to get provider name and logo
  const providersList = await fetchMovieWatchProvidersList("US");
  const provider = providersList.results.find((p) => p.provider_id === provId);

  if (!provider) {
    notFound();
  }

  // Fetch content from this provider (2 pages for 24 items)
  const isMovie = type === "movie";
  const [data1, data2] = await Promise.all([
    discoverByProvider(provId, isMovie ? "movie" : "tv", "US", 1),
    discoverByProvider(provId, isMovie ? "movie" : "tv", "US", 2),
  ]);

  const items: MediaItem[] = [...data1.results, ...data2.results].slice(0, 24).map(
    (item) =>
      ({
        ...item,
        media_type: isMovie ? "movie" : "tv",
      } as MediaItem)
  );

  // Popular providers for quick links
  const popularProviders = providersList.results
    .sort((a, b) => a.display_priority - b.display_priority)
    .slice(0, 12);

  const providerLogo = provider.logo_path
    ? `https://image.tmdb.org/t/p/w92${provider.logo_path}`
    : "/placeholder.svg";

  return (
    <div className="min-h-screen bg-[#141414] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-[1920px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            {/* Provider Logo */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-white/5 shadow-lg">
              <Image
                src={providerLogo}
                alt={provider.provider_name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white">
                  Streaming
                </span>
              </div>
              <h1 className="text-3xl font-bold text-white">{provider.provider_name}</h1>
              <p className="text-gray-400 mt-1">
                {data1.total_results.toLocaleString()}{" "}
                {isMovie ? "movies" : "TV shows"} available
              </p>
            </div>
          </div>

          {/* Type Toggle */}
          <div className="flex space-x-4 bg-gray-900 p-1 rounded-lg">
            <Link
              href={`/browse/provider/${providerId}?type=movie`}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                isMovie ? "bg-gray-800 text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              Movies
            </Link>
            <Link
              href={`/browse/provider/${providerId}?type=tv`}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                !isMovie ? "bg-gray-800 text-white shadow-sm" : "text-gray-400 hover:text-white"
              }`}
            >
              TV Shows
            </Link>
          </div>
        </div>

        {/* Popular Providers */}
        <div className="flex flex-wrap gap-3 py-4 border-y border-gray-800">
          {popularProviders.map((p) => (
            <Link
              key={p.provider_id}
              href={`/browse/provider/${p.provider_id}?type=${type}`}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-colors ${
                p.provider_id === provId
                  ? "bg-white/10 border-white/20 text-white"
                  : "border-transparent bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src={
                    p.logo_path
                      ? `https://image.tmdb.org/t/p/w45${p.logo_path}`
                      : "/placeholder.svg"
                  }
                  alt={p.provider_name}
                  fill
                  className="object-cover"
                  sizes="20px"
                />
              </div>
              <span className="text-xs font-medium">
                {p.provider_name}
              </span>
            </Link>
          ))}
        </div>

        {/* Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {items.map((item) => (
              <MovieCard key={item.id} item={item} fullWidth />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No content found on {provider.provider_name}
            </p>
          </div>
        )}

        {/* Info */}
        {data1.total_pages > 1 && (
          <div className="flex justify-center items-center space-x-4 pt-8">
            <span className="text-gray-400">
              Showing 24 of {data1.total_results.toLocaleString()} results
            </span>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-8 border-t border-gray-800">
          <Link
            href="/browse/movies"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
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
            <span>Back to Browse</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
