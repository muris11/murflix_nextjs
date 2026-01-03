import MovieCard from '@/components/MovieCard';
import { discoverMoviesByYear, discoverTVByYear } from '@/lib/tmdb';
import { MediaItem } from '@/types/tmdb';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface YearPageProps {
  params: Promise<{ year: string }>;
  searchParams: Promise<{ type?: string; page?: string }>;
}

export default async function YearPage({ params, searchParams }: YearPageProps) {
  const { year: yearStr } = await params;
  const { type = 'movie', page = '1' } = await searchParams;
  const year = parseInt(yearStr);
  const pageNum = parseInt(page);
  const currentYear = new Date().getFullYear();

  // Validate year
  if (isNaN(year) || year < 1900 || year > currentYear + 2) {
    notFound();
  }

  // Fetch content based on type
  const isMovie = type === 'movie';
  const data = isMovie 
    ? await discoverMoviesByYear(year, pageNum)
    : await discoverTVByYear(year, pageNum);

  const items: MediaItem[] = data.results.map(item => ({
    ...item,
    media_type: isMovie ? 'movie' : 'tv'
  } as MediaItem));

  // Generate year links (current year down to 10 years ago)
  const yearLinks = Array.from({ length: 12 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-[#141414] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1920px] mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-baseline space-x-4">
            <span className="text-xl font-medium text-gray-400 uppercase tracking-widest">
              Year
            </span>
            <h1 className="text-5xl font-bold text-white">{year}</h1>
          </div>
          <p className="text-gray-400">
            {data.total_results.toLocaleString()} {isMovie ? 'movies' : 'TV shows'} from {year}
          </p>

          {/* Type Toggle */}
          <div className="flex space-x-4">
            <Link
              href={`/browse/year/${year}?type=movie`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isMovie ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Movies
            </Link>
            <Link
              href={`/browse/year/${year}?type=tv`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !isMovie ? 'bg-white text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              TV Shows
            </Link>
          </div>
        </div>

        {/* Quick Year Links */}
        <div className="flex flex-wrap gap-2 text-sm py-4 border-y border-gray-800">
          {yearLinks.map((y) => (
            <Link
              key={y}
              href={`/browse/year/${y}?type=${type}`}
              className={`px-3 py-1 rounded-full transition-colors ${
                y === year 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {y}
            </Link>
          ))}
        </div>

        {/* Decade Links */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          {[2020, 2010, 2000, 1990, 1980, 1970].map((decade) => (
            <Link
              key={decade}
              href={`/browse/year/${decade}?type=${type}`}
              className="hover:text-white transition-colors"
            >
              {decade}s
            </Link>
          ))}
        </div>

        {/* Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {items.map((item) => (
              <MovieCard key={item.id} item={item} fullWidth />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No {isMovie ? 'movies' : 'TV shows'} found from {year}</p>
          </div>
        )}

        {/* Pagination */}
        {data.total_pages > 1 && (
          <div className="flex justify-center items-center space-x-4 pt-8">
            {pageNum > 1 && (
              <Link
                href={`/browse/year/${year}?type=${type}&page=${pageNum - 1}`}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Previous
              </Link>
            )}
            <span className="text-gray-400">
              Page {pageNum} of {Math.min(data.total_pages, 500)}
            </span>
            {pageNum < Math.min(data.total_pages, 500) && (
              <Link
                href={`/browse/year/${year}?type=${type}&page=${pageNum + 1}`}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        )}

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
