import MovieControls from "@/components/MovieControls";
import MovieCard from "@/components/MovieCard";
import CastSlider from "@/components/CastSlider"; 
import { fetchMovieDetails, getBackdropUrl } from "@/lib/tmdb";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MoviePageProps): Promise<Metadata> {
  const { id } = await params;
  const movieId = parseInt(id);
  
  if (isNaN(movieId)) return { title: "Movie Not Found" };

  try {
    const movie = await fetchMovieDetails(movieId);
    return {
      title: `${movie.title} - Murflix`,
      description: movie.overview,
      openGraph: {
        title: `${movie.title} | Watch on Murflix`,
        description: movie.overview || "Watch this movie on Murflix",
        images: [
          {
            url: getBackdropUrl(movie.backdrop_path || movie.poster_path, "w780"),
            width: 780,
            height: 439,
            alt: movie.title,
          },
        ],
      },
    };
  } catch {
    return { title: "Movie Not Found - Murflix" };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;
  const movieId = parseInt(id);

  if (isNaN(movieId)) {
    notFound();
  }

  let movie;
  try {
    movie = await fetchMovieDetails(movieId);
  } catch {
    notFound();
  }

  const director = movie.credits?.crew.find((c) => c.job === "Director");
  const writers =
    movie.credits?.crew
      .filter((c) => c.job === "Writer" || c.job === "Screenplay")
      .slice(0, 3) || [];
  const cast = movie.credits?.cast.slice(0, 20) || [];
  
  const videos = movie.videos?.results || [];
  const trailer = videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
                 videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
                 videos.find((v) => v.site === "YouTube");

  const similarMovies = movie.similar?.results || [];
  const recommendations = movie.recommendations?.results || [];
  
  // Combine recommendations and similar movies, remove duplicates
  const allRelatedMovies = [...recommendations, ...similarMovies]
    .filter((item, index, self) => 
      index === self.findIndex((t) => t.id === item.id)
    )
    .filter((item) => item.id !== movieId) // Remove current movie
    .slice(0, 24); // Limit to 24 items
  
  const usRelease = movie.release_dates?.results.find(
    (r) => r.iso_3166_1 === "US"
  );
  const certification =
    usRelease?.release_dates.find((rd) => rd.certification)?.certification ||
    "NR";

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white pb-20">
      
      {/* 1. Immersive Hero Section */}
      <div className="relative h-[70vh] md:h-[85vh] w-full">
        {/* Backdrop */}
        <div className="absolute inset-0">
          <Image
            src={getBackdropUrl(movie.backdrop_path, "original")}
            alt={movie.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20">
            <div className="max-w-2xl space-y-6">
              
              {/* Logo / Title Area */}
              <div className="space-y-4">
                 <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl leading-none tracking-tight">
                   {movie.title}
                 </h1>
                 
                 {/* Metadata Line */}
                 <div className="flex items-center space-x-4 text-sm md:text-base font-medium text-gray-200">
                    <span className="text-[#46d369] font-bold">{Math.round(movie.vote_average * 10)}% Match</span>
                    <span>{movie.release_date?.split("-")[0]}</span>
                    <span className="border border-gray-400 px-2 py-0.5 text-xs rounded text-gray-300">{certification}</span>
                    <span>{formatRuntime(movie.runtime)}</span>
                    <span className="border border-white/40 px-2 py-0.5 text-xs rounded">HD</span>
                 </div>
              </div>

              {/* Tagline & Overview */}
              <div>
                 {movie.tagline && <p className="text-lg text-gray-300 italic mb-2 opacity-80">{movie.tagline}</p>}
                 <p className="text-lg text-white drop-shadow-md line-clamp-3 leading-relaxed font-normal">
                   {movie.overview}
                 </p>
              </div>

              {/* Actions */}
              <div className="pt-2">
                <MovieControls id={movieId} trailerKey={trailer?.key} title={movie.title} />
              </div>

              {/* Quick Cast (Hero Footer) */}
              <div className="hidden md:block pt-4 text-sm text-gray-400">
                 <p>
                   <span className="text-gray-500">Starring: </span>
                   {cast.slice(0, 3).map(c => c.name).join(", ")}
                 </p>
                 {director && (
                   <p className="mt-1">
                     <span className="text-gray-500">Director: </span>
                     <span className="text-white">{director.name}</span>
                   </p>
                 )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Main Content */}
          <div className="lg:col-span-8 space-y-10">
             
             {/* Top Cast Slider */}
             <section>
               <h2 className="text-xl font-bold mb-4 text-white">Top Cast</h2>
               <CastSlider cast={cast} />
             </section>

          </div>

          {/* RIGHT: About Section (Sidebar) */}
          <div className="lg:col-span-4 space-y-10">
             
             {/* About Metadata */}
             <div>
               <h3 className="text-lg font-medium text-white mb-4">About <span className="font-bold">{movie.title}</span></h3>
               
               <div className="space-y-4 text-sm">
                 {director && (
                   <div>
                     <span className="block text-gray-500 mb-1">Director</span>
                     <div className="text-white">{director.name}</div>
                   </div>
                 )}
                 
                 {writers.length > 0 && (
                   <div>
                     <span className="block text-gray-500 mb-1">Writers</span>
                     <div className="text-white">{writers.map(w => w.name).join(", ")}</div>
                   </div>
                 )}

                 <div>
                   <span className="block text-gray-500 mb-1">Genres</span>
                   <div className="flex flex-wrap gap-2">
                     {movie.genres.map((g) => (
                       <Link key={g.id} href={`/browse/genre/${g.id}`} className="text-white hover:underline">
                         {g.name}
                       </Link>
                     ))}
                   </div>
                 </div>

                 <div>
                   <span className="block text-gray-500 mb-1">Maturity Rating</span>
                   <div className="flex items-center gap-2">
                     <span className="border border-white/40 px-2 py-0.5 text-xs rounded text-white">{certification}</span>
                     <span className="text-white">Recommended for ages {certification === 'R' ? '17+' : '13+'}</span>
                   </div>
                 </div>
               </div>
             </div>

          </div>
        </div>

        {/* 3. More Like This (Grid Layout) */}
        {allRelatedMovies.length > 0 && (
          <div className="mt-24 border-t border-[#404040] pt-12">
            <h2 className="text-2xl font-bold mb-6 text-white">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {allRelatedMovies.map((m) => (
                <div key={m.id} className="transform transition-transform hover:scale-105 duration-300">
                   <MovieCard 
                     item={{ ...m, media_type: 'movie' }} 
                     fullWidth
                   />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
