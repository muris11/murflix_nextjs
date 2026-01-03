import MovieControls from "@/components/MovieControls";
import MovieCard from "@/components/MovieCard";
import EpisodesList from "@/components/EpisodesList";
import { fetchTVDetails, fetchSeasonDetails, getBackdropUrl } from "@/lib/tmdb";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TVPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string }>;
}

export async function generateMetadata({ params }: TVPageProps): Promise<Metadata> {
  const { id } = await params;
  const tvId = parseInt(id);
  
  if (isNaN(tvId)) return { title: "TV Show Not Found" };

  try {
    const tvShow = await fetchTVDetails(tvId);
    return {
      title: `${tvShow.name} - Murflix`,
      description: tvShow.overview,
      openGraph: {
        title: `${tvShow.name} | Watch on Murflix`,
        description: tvShow.overview || "Watch this TV show on Murflix",
        images: [
          {
            url: getBackdropUrl(tvShow.backdrop_path || tvShow.poster_path, "w780"),
            width: 780,
            height: 439,
            alt: tvShow.name,
          },
        ],
      },
    };
  } catch {
    return { title: "TV Show Not Found - Murflix" };
  }
}

export default async function TVPage({ params, searchParams }: TVPageProps) {
  const { id } = await params;
  const { season } = await searchParams;
  const tvId = parseInt(id);

  if (isNaN(tvId)) {
    notFound();
  }

  let tvShow;
  let seasonData;
  const selectedSeasonNumber = season ? parseInt(season) : 1;

  try {
    tvShow = await fetchTVDetails(tvId);
    
    // Validate season number, default to 1 or first available > 0
    let targetSeason = selectedSeasonNumber;
    const hasSeason = tvShow.seasons.some(s => s.season_number === targetSeason);
    if (!hasSeason && tvShow.seasons.length > 0) {
       const firstValid = tvShow.seasons.find(s => s.season_number > 0);
       targetSeason = firstValid ? firstValid.season_number : tvShow.seasons[0].season_number;
    }

    seasonData = await fetchSeasonDetails(tvId, targetSeason);

  } catch {
    notFound();
  }

  const creator = tvShow.created_by?.[0];
  const cast = tvShow.credits?.cast.slice(0, 15) || [];
  
  // Find trailer
  const videos = tvShow.videos?.results || [];
  const trailer = videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
                 videos.find((v) => v.type === "Teaser" && v.site === "YouTube") ||
                 videos.find((v) => v.site === "YouTube");

  const similarShows = tvShow.similar?.results || [];
  const recommendations = tvShow.recommendations?.results || [];

  // Combine recommendations and similar shows, remove duplicates
  const allRelatedShows = [...recommendations, ...similarShows]
    .filter((item, index, self) => 
      index === self.findIndex((t) => t.id === item.id)
    )
    .filter((item) => item.id !== tvId) // Remove current show
    .slice(0, 24); // Limit to 24 items
  
  // Get US content rating
  const usRating = tvShow.content_ratings?.results.find(
    (r) => r.iso_3166_1 === "US"
  );
  const contentRating = usRating?.rating || "TV-MA";

  return (
    <div className="min-h-screen bg-[#141414] text-white pb-20">
      
      {/* 1. Immersive Hero Section */}
      <div className="relative h-[70vh] md:h-[85vh] w-full">
        {/* Backdrop */}
        <div className="absolute inset-0">
          <Image
            src={getBackdropUrl(tvShow.backdrop_path, "original")}
            alt={tvShow.name}
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
                   {tvShow.name}
                 </h1>
                 
                 {/* Metadata Line */}
                 <div className="flex items-center space-x-4 text-sm md:text-base font-medium text-gray-200">
                    <span className="text-[#46d369] font-bold">{Math.round(tvShow.vote_average * 10)}% Match</span>
                    <span>{tvShow.first_air_date?.split("-")[0]}</span>
                    <span className="border border-gray-400 px-2 py-0.5 text-xs rounded text-gray-300">{contentRating}</span>
                    <span>{tvShow.number_of_seasons} Season{tvShow.number_of_seasons > 1 ? 's' : ''}</span>
                    <span className="border border-white/40 px-2 py-0.5 text-xs rounded">HD</span>
                 </div>
              </div>

              {/* Tagline & Overview */}
              <div>
                 {tvShow.tagline && <p className="text-lg text-gray-300 italic mb-2 opacity-80">{tvShow.tagline}</p>}
                 <p className="text-lg text-white drop-shadow-md line-clamp-3 leading-relaxed font-normal">
                   {tvShow.overview}
                 </p>
              </div>

              {/* Actions */}
              <div className="pt-2">
                <MovieControls
                  id={tvId}
                  mediaType="tv"
                  trailerKey={trailer?.key}
                  title={tvShow.name}
                />
              </div>

              {/* Quick Cast/Creator (Hero Footer) */}
              <div className="hidden md:block pt-4 text-sm text-gray-400">
                 <p>
                   <span className="text-gray-500">Starring: </span>
                   {cast.slice(0, 3).map(c => c.name).join(", ")}
                 </p>
                 {creator && (
                   <p className="mt-1">
                     <span className="text-gray-500">Created by: </span>
                     <span className="text-white">{creator.name}</span>
                   </p>
                 )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid (Episodes & Details) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Episodes List (Main Focus) */}
          <div className="lg:col-span-8">
             <EpisodesList 
               tvId={tvId}
               season={seasonData}
               seasons={tvShow.seasons}
               currentSeasonNumber={selectedSeasonNumber}
               showName={tvShow.name}
             />
          </div>

          {/* RIGHT: About Section (Sidebar) */}
          <div className="lg:col-span-4 space-y-10">
             
             {/* About Metadata */}
             <div>
               <h3 className="text-lg font-medium text-white mb-4">About <span className="font-bold">{tvShow.name}</span></h3>
               
               <div className="space-y-4 text-sm">
                 <div>
                   <span className="block text-gray-500 mb-1">Creators</span>
                   <div className="text-white">
                     {tvShow.created_by?.map(c => c.name).join(", ") || "Unknown"}
                   </div>
                 </div>
                 
                 <div>
                   <span className="block text-gray-500 mb-1">Cast</span>
                   <div className="flex flex-wrap gap-x-2 gap-y-1 text-white leading-relaxed">
                     {cast.map((c) => (
                       <span key={c.id} className="cursor-pointer hover:underline">{c.name},</span>
                     ))}
                     <span className="text-gray-500 italic">more</span>
                   </div>
                 </div>

                 <div>
                   <span className="block text-gray-500 mb-1">Genres</span>
                   <div className="flex flex-wrap gap-2">
                     {tvShow.genres.map((g) => (
                       <Link key={g.id} href={`/browse/genre/${g.id}`} className="text-white hover:underline">
                         {g.name}
                       </Link>
                     ))}
                   </div>
                 </div>

                 <div>
                   <span className="block text-gray-500 mb-1">Maturity Rating</span>
                   <div className="flex items-center gap-2">
                     <span className="border border-white/40 px-2 py-0.5 text-xs rounded text-white">{contentRating}</span>
                     <span className="text-white">Recommended for ages {contentRating === 'TV-MA' ? '17+' : '14+'}</span>
                   </div>
                 </div>
               </div>
             </div>

          </div>
        </div>

        {/* 3. More Like This (Grid Layout) */}
        {allRelatedShows.length > 0 && (
          <div className="mt-24 border-t border-[#404040] pt-12">
            <h2 className="text-2xl font-bold mb-6 text-white">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {allRelatedShows.map((show) => (
                <div key={show.id} className="transform transition-transform hover:scale-105 duration-300">
                   <MovieCard 
                     item={{ ...show, media_type: 'tv' }} 
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
