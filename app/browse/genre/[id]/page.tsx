import LoadMore from '@/components/LoadMore';
import MovieCard from '@/components/MovieCard';
import { discoverMoviesByGenre, discoverTVByGenre, fetchMovieGenres, fetchTVGenres } from '@/lib/tmdb';
import { MediaItem } from '@/types/tmdb';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface GenrePageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ type?: string; page?: string }>;
}

export default async function GenrePage({ params, searchParams }: GenrePageProps) {
  const { id } = await params;
  const { type = 'movie' } = await searchParams;
  const genreId = parseInt(id);
  const initialPage = 1;

  if (isNaN(genreId)) {
    notFound();
  }

  // Fetch genres to get the name
  const [movieGenres, tvGenres] = await Promise.all([
    fetchMovieGenres(),
    fetchTVGenres(),
  ]);

  const allGenres = [...movieGenres.genres, ...tvGenres.genres];
  const genre = allGenres.find(g => g.id === genreId);
  
  if (!genre) {
    notFound();
  }

  // Fetch content based on type (Initial Load)
  const isMovie = type === 'movie';
  const data = isMovie 
    ? await discoverMoviesByGenre(genreId, initialPage)
    : await discoverTVByGenre(genreId, initialPage);

  const items: MediaItem[] = data.results.map(item => ({
    ...item,
    media_type: isMovie ? 'movie' : 'tv'
  } as MediaItem));

  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-[1920px] mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-primary font-medium tracking-wider text-sm uppercase mb-1">
              <span className="w-8 h-0.5 bg-primary"></span>
              <span>Genre</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {genre.name}
            </h1>
            <p className="text-gray-400">
              {data.total_results.toLocaleString()} {isMovie ? 'movies' : 'TV shows'} available
            </p>
          </div>

          <div className="flex bg-gray-900 p-1 rounded-lg self-start md:self-auto">
            <Link
              href={`/browse/genre/${genreId}?type=movie`}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                isMovie ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              Movies
            </Link>
            <Link
              href={`/browse/genre/${genreId}?type=tv`}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                !isMovie ? 'bg-gray-800 text-white shadow-sm' : 'text-gray-400 hover:text-white'
              }`}
            >
              TV Shows
            </Link>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {items.map((item) => (
            <MovieCard key={item.id} item={item} fullWidth />
          ))}
        </div>

        {/* Load More Component */}
        <LoadMore 
          initialPage={initialPage} 
          genreId={genreId} 
          type={isMovie ? 'movie' : 'tv'} 
          totalPages={Math.min(data.total_pages, 500)} 
        />

        {/* Back Link */}
        <div className="pt-8 border-t border-gray-800 mt-12">
          <Link
            href="/browse/movies"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Browse</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
