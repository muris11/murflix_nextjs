import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import {
    fetchAiringTodayTV,
    fetchNowPlayingMovies,
    fetchOnTheAirTV,
    fetchPopularMovies,
    fetchPopularTV,
    fetchTopRatedMovies,
    fetchTopRatedTV,
    fetchTrending,
    fetchUpcomingMovies,
} from '@/lib/tmdb';

export default async function HomePage() {
  const [
    trendingData,
    trendingMoviesData,
    trendingTVData,
    popularMoviesData,
    popularTVData,
    topRatedMoviesData,
    topRatedTVData,
    nowPlayingData,
    upcomingData,
    onTheAirData,
    airingTodayData,
  ] = await Promise.all([
    fetchTrending('all', 'week'),
    fetchTrending('movie', 'day'),
    fetchTrending('tv', 'day'),
    fetchPopularMovies(),
    fetchPopularTV(),
    fetchTopRatedMovies(),
    fetchTopRatedTV(),
    fetchNowPlayingMovies(),
    fetchUpcomingMovies(),
    fetchOnTheAirTV(),
    fetchAiringTodayTV(),
  ]);

  return (
    <div className="min-h-screen bg-[#141414] pb-8 sm:pb-10 md:pb-12">
      {/* Hero Section */}
      <Hero items={trendingData.results} />

      {/* Content Container - pulled up over Hero */}
      <div className="relative z-20 -mt-4 sm:-mt-6 md:-mt-10 lg:-mt-14 xl:-mt-16 2xl:-mt-20 space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4 overflow-x-hidden">
        
        {/* Main Trending Row (Priority) */}
        <MovieRow
          title="Trending Now"
          items={trendingData.results}
          priority
        />

        <MovieRow
          title="Popular on Murflix"
          items={popularMoviesData.results.map(m => ({ ...m, media_type: 'movie' as const }))}
        />

        <MovieRow
          title="Trending Movies"
          items={trendingMoviesData.results}
        />

        <MovieRow
          title="Popular TV Shows"
          items={popularTVData.results.map(t => ({ ...t, media_type: 'tv' as const }))}
        />

        <MovieRow
          title="Trending TV Shows"
          items={trendingTVData.results}
        />

        <MovieRow
          title="Top Rated Movies"
          items={topRatedMoviesData.results.map(m => ({ ...m, media_type: 'movie' as const }))}
        />

        <MovieRow
          title="Top Rated TV Shows"
          items={topRatedTVData.results.map(t => ({ ...t, media_type: 'tv' as const }))}
        />

        <MovieRow
          title="Now Playing in Theaters"
          items={nowPlayingData.results.map(m => ({ ...m, media_type: 'movie' as const }))}
        />

        <MovieRow
          title="Coming Soon"
          items={upcomingData.results.map(m => ({ ...m, media_type: 'movie' as const }))}
        />

        <MovieRow
          title="Airing Today"
          items={airingTodayData.results.map(t => ({ ...t, media_type: 'tv' as const }))}
        />

        <MovieRow
          title="Currently Airing TV Shows"
          items={onTheAirData.results.map(t => ({ ...t, media_type: 'tv' as const }))}
        />
      </div>
    </div>
  );
}
