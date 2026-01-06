import MovieCard from '@/components/MovieCard';
import { fetchNowPlayingMovies, fetchPopularMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '@/lib/tmdb';
import Link from 'next/link';

export default async function BrowseMoviesPage() {
  const [
    popular1, popular2,
    topRated1, topRated2,
    nowPlaying1, nowPlaying2,
    upcoming1, upcoming2,
  ] = await Promise.all([
    fetchPopularMovies(1),
    fetchPopularMovies(2),
    fetchTopRatedMovies(1),
    fetchTopRatedMovies(2),
    fetchNowPlayingMovies(1),
    fetchNowPlayingMovies(2),
    fetchUpcomingMovies(1),
    fetchUpcomingMovies(2),
  ]);

  const categories = [
    { title: 'Popular Movies', items: [...popular1.results, ...popular2.results].slice(0, 24) },
    { title: 'Top Rated', items: [...topRated1.results, ...topRated2.results].slice(0, 24) },
    { title: 'Now Playing', items: [...nowPlaying1.results, ...nowPlaying2.results].slice(0, 24) },
    { title: 'Upcoming', items: [...upcoming1.results, ...upcoming2.results].slice(0, 24) },
  ];

  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-[1920px] mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center">
              <span className="w-2 h-8 bg-primary mr-4 rounded-full"></span>
              Movies
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl">
              Blockbusters, indie gems, and everything in between. Discover your next favorite film.
            </p>
          </div>
          <div className="flex bg-gray-900 p-1 rounded-lg self-start md:self-auto">
            <Link 
              href="/browse/movies"
              className="px-6 py-2 rounded-md bg-gray-800 text-white font-medium shadow-sm transition-all"
            >
              Movies
            </Link>
            <Link 
              href="/browse/tv"
              className="px-6 py-2 rounded-md text-gray-400 hover:text-white font-medium transition-all"
            >
              TV Shows
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-[1920px] mx-auto space-y-16">
        {categories.map((category) => (
          <section key={category.title}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center group cursor-pointer">
                <span className="mr-2 text-primary group-hover:translate-x-1 transition-transform">|</span>
                {category.title}
                <svg className="w-5 h-5 ml-2 text-gray-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </h2>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {category.items.map((movie) => (
                <MovieCard key={movie.id} item={{ ...movie, media_type: 'movie' }} fullWidth />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
