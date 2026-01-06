"use client";

import { SeasonDetails } from "@/types/tmdb";
import { getImageUrl } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EpisodePlayer from "@/components/EpisodePlayer";

interface EpisodesListProps {
  tvId: number;
  season: SeasonDetails;
  seasons: { id: number; season_number: number; name: string }[];
  currentSeasonNumber: number;
  showName: string;
}

export default function EpisodesList({ tvId, season, seasons, currentSeasonNumber, showName }: EpisodesListProps) {
  const router = useRouter();
  const validSeasons = seasons.filter(s => s.season_number > 0);

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSeason = e.target.value;
    router.push(`/tv/${tvId}?season=${newSeason}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      {/* Header & Season Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-white">Episodes</h2>
        
        <div className="relative">
           {/* Mobile: Native Dropdown (Select) - Netflix Style */}
           <div className="sm:hidden relative">
             <select
               value={currentSeasonNumber}
               onChange={handleSeasonChange}
               className="appearance-none bg-[#333] text-white font-bold py-2 pl-4 pr-10 rounded border border-gray-600 focus:outline-none focus:border-white w-full"
             >
               {validSeasons.map((s) => (
                 <option key={s.id} value={s.season_number} className="text-black">
                   {s.season_number === 0 ? "Specials" : `Season ${s.season_number}`}
                 </option>
               ))}
             </select>
             {/* Custom Arrow */}
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
               <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                 <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
               </svg>
             </div>
           </div>

           {/* Desktop: Tab Style */}
           <div className="hidden sm:flex flex-wrap gap-2">
             {validSeasons.map((s) => (
               <Link
                 key={s.id}
                 href={`/tv/${tvId}?season=${s.season_number}`}
                 scroll={false}
                 className={`px-4 py-2 rounded font-bold text-lg transition-colors ${
                   s.season_number === currentSeasonNumber
                     ? "text-white border-b-4 border-[#E50914]"
                     : "text-gray-400 hover:text-white"
                 }`}
               >
                 {s.season_number === 0 ? "Specials" : `Season ${s.season_number}`}
               </Link>
             ))}
           </div>
        </div>
      </div>

      <div className="text-gray-400 text-sm mb-4">
        <span className="font-bold text-white">Season {season.season_number}</span>
        <span className="mx-2">•</span>
        <span>{season.air_date?.split('-')[0] || "Unknown Year"}</span>
        <span className="mx-2">•</span>
        <span>{season.vote_average ? `${season.vote_average.toFixed(1)} Rating` : "Not Rated"}</span>
      </div>

      <div className="space-y-4">
        {season.episodes?.map((episode) => (
          <div 
            key={episode.id} 
            className="group relative flex flex-col sm:flex-row gap-4 p-4 rounded-md border border-[#333] hover:bg-[#333] transition-colors overflow-hidden"
          >
            <div className="hidden sm:flex items-center justify-center w-8 text-2xl font-bold text-gray-500">
              {episode.episode_number}
            </div>

            <div className="relative flex-shrink-0 w-full sm:w-48 aspect-video rounded overflow-hidden bg-[#222]">
              <Image
                src={getImageUrl(episode.still_path, "w500")}
                alt={episode.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <EpisodePlayer 
                 tmdbId={tvId} 
                 seasonNumber={season.season_number} 
                 episodeNumber={episode.episode_number}
                 seriesTitle={showName}
                 episodeTitle={episode.name}
              />
            </div>

            <div className="flex-1 py-1 min-w-0">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-bold text-white truncate pr-4">
                  {episode.name}
                </h3>
                <span className="text-sm text-gray-400 whitespace-nowrap">
                  {episode.runtime ? `${episode.runtime}m` : ""}
                </span>
              </div>
              <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                {episode.overview || "No description available for this episode."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
