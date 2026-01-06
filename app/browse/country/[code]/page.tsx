import LoadMore from '@/components/LoadMore';
import MovieCard from '@/components/MovieCard';
import { discoverMoviesByCountry, discoverTVByCountry } from '@/lib/tmdb';
import { MediaItem } from '@/types/tmdb';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface CountryPageProps {
  params: Promise<{ code: string }>;
  searchParams: Promise<{ type?: string }>;
}

// Popular countries for movies/TV
const COUNTRIES: { [code: string]: string } = {
  'US': 'United States',
  'GB': 'United Kingdom',
  'KR': 'South Korea',
  'JP': 'Japan',
  'IN': 'India',
  'FR': 'France',
  'DE': 'Germany',
  'ES': 'Spain',
  'IT': 'Italy',
  'CN': 'China',
  'CA': 'Canada',
  'AU': 'Australia',
  'MX': 'Mexico',
  'BR': 'Brazil',
  'ID': 'Indonesia',
  'TH': 'Thailand',
  'TR': 'Turkey',
  'PH': 'Philippines',
  'TW': 'Taiwan',
  'HK': 'Hong Kong',
};

export default async function CountryPage({ params, searchParams }: CountryPageProps) {
  const { code } = await params;
  const { type = 'movie' } = await searchParams;
  const countryCode = code.toUpperCase();

  const countryName = COUNTRIES[countryCode];
  if (!countryName) {
    notFound();
  }

  // Fetch content based on type (2 pages for 24 items)
  const isMovie = type === 'movie';
  const [data1, data2] = await Promise.all([
    isMovie ? discoverMoviesByCountry(countryCode, 1) : discoverTVByCountry(countryCode, 1),
    isMovie ? discoverMoviesByCountry(countryCode, 2) : discoverTVByCountry(countryCode, 2),
  ]);

  const items: MediaItem[] = [...data1.results, ...data2.results].slice(0, 24).map((item) => ({
    ...item,
    media_type: isMovie ? 'movie' : 'tv'
  } as MediaItem));

  return (
    <div className="min-h-screen bg-[#141414] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1920px] mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-baseline space-x-4">
            <span className="text-4xl font-bold text-gray-700 select-none">
              {countryCode}
            </span>
            <h1 className="text-3xl font-bold text-white">{countryName}</h1>
          </div>
          <p className="text-gray-400">
            {data1.total_results.toLocaleString()} {isMovie ? 'movies' : 'TV shows'} from {countryName}
          </p>

          {/* Type Toggle */}
          <div className="flex space-x-4">
            <Link
              href={`/browse/country/${code}?type=movie`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isMovie ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Movies
            </Link>
            <Link
              href={`/browse/country/${code}?type=tv`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !isMovie ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              TV Shows
            </Link>
          </div>
        </div>

        {/* Quick Country Links */}
        <div className="flex flex-wrap gap-2 text-sm">
          {Object.entries(COUNTRIES).slice(0, 10).map(([c, name]) => (
            <Link
              key={c}
              href={`/browse/country/${c}?type=${type}`}
              className={`px-3 py-1 rounded-full transition-colors ${
                c === countryCode 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {items.map((item, index) => (
              <MovieCard key={`${item.id}-${index}`} item={item} fullWidth />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No {isMovie ? 'movies' : 'TV shows'} found from {countryName}</p>
          </div>
        )}

        {/* Load More */}
        <LoadMore 
          initialPage={2} 
          countryCode={countryCode}
          type={isMovie ? 'movie' : 'tv'} 
          totalPages={Math.min(data1.total_pages, 500)} 
        />

        {/* Back Link */}
        <div className="pt-8 border-t border-gray-800">
          <Link
            href="/browse/movies"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Browse</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
