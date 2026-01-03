import MovieCard from '@/components/MovieCard';
import { searchMulti } from '@/lib/tmdb';
import { MediaItem } from '@/types/tmdb';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = typeof params?.q === 'string' ? params.q.trim() : '';

  if (!query) {
    return (
      <div className="min-h-screen bg-[#141414] pt-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-6 bg-gray-900 rounded-full border border-gray-800">
              <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Search Murflix</h1>
            <p className="text-gray-400">Find movies, TV shows, and more.</p>
          </div>
          
          <form action="/search" className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                name="q"
                className="w-full bg-gray-900 border border-gray-700 text-white px-6 py-4 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-gray-500 text-lg"
                placeholder="What do you want to watch?"
                autoFocus
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-800 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const data = await searchMulti(query);
  // Filter out person results and ensure valid items
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const results = (data.results as any[]).filter(
    (item) => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
  ) as MediaItem[];

  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Search Header */}
      <div className="max-w-[1920px] mx-auto mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-2xl text-gray-400 font-light">
              Results for: <span className="text-white font-bold">&quot;{query}&quot;</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {results.length} items found
            </p>
          </div>
          
          <form action="/search" className="w-full md:w-96">
            <div className="relative">
              <input
                type="text"
                name="q"
                defaultValue={query}
                className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded text-sm focus:outline-none focus:border-white transition-colors"
                placeholder="Search again..."
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2">
            {results.map((item) => (
              <MovieCard key={item.id} item={item} fullWidth />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-gray-600">
              <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No matches found</h3>
            <p className="text-gray-400 max-w-md">
              We couldn&apos;t find anything matching &quot;{query}&quot;. <br/>
              Try checking for typos or using broader keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
