import { anime } from "@/lib/sansekai";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const revalidate = 3600;

interface PageProps {
  searchParams: Promise<{ url: string }>;
}

export default async function AnimeDetailPage({ searchParams }: PageProps) {
  const { url } = await searchParams;

  if (!url) {
    notFound();
  }

  const detail = await anime.getDetail(url);

  if (!detail.status || !detail.data) {
    notFound();
  }

  const animeData = detail.data;

  return (
    <div className="min-h-screen bg-[#141414] pb-12">
      {/* Header / Backdrop Area */}
      <div className="relative w-full aspect-video md:aspect-[3/1] max-h-[400px]">
        <div className="absolute inset-0">
          {animeData.thumb && (
            <Image
              src={animeData.thumb}
              alt={animeData.title}
              fill
              className="object-cover opacity-30 blur-sm"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
        </div>

        <div className="absolute top-4 left-4 z-50">
           <Link href="/anime" className="flex items-center text-white hover:text-gray-300 transition-colors">
              <ChevronLeft className="w-6 h-6 mr-1" /> Back
           </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-12 z-20 flex flex-col md:flex-row gap-6 items-end">
           {/* Poster */}
           <div className="relative w-32 md:w-48 aspect-[2/3] flex-shrink-0 shadow-2xl rounded-md overflow-hidden border-2 border-white/10 hidden md:block">
              {animeData.thumb && (
                <Image
                  src={animeData.thumb}
                  alt={animeData.title}
                  fill
                  className="object-cover"
                />
              )}
           </div>
           
           {/* Info */}
           <div className="flex-1 space-y-3 pb-2">
              <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg leading-tight">
                {animeData.title}
              </h1>
              
              {animeData.genres && (
                <div className="flex flex-wrap gap-2">
                   {animeData.genres.map((genre: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-red-600/80 text-white text-[10px] md:text-xs font-medium rounded">
                         {genre}
                      </span>
                   ))}
                </div>
              )}

              {animeData.synopsis && (
                 <p className="text-gray-300 text-sm md:text-base max-w-4xl line-clamp-4 md:line-clamp-none">
                    {animeData.synopsis}
                 </p>
              )}
           </div>
        </div>
      </div>

      {/* Mobile Poster (Visible only on small screens) */}
      <div className="md:hidden px-4 -mt-12 relative z-30 mb-6 flex gap-4">
          <div className="relative w-28 aspect-[2/3] flex-shrink-0 shadow-xl rounded border border-white/20">
            {animeData.thumb && (
                <Image
                  src={animeData.thumb}
                  alt={animeData.title}
                  fill
                  className="object-cover rounded"
                />
              )}
          </div>
      </div>

      {/* Content Area */}
      <div className="px-4 md:px-8 lg:px-12 mt-8 space-y-8">
         
         {/* Metadata Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#202020] rounded-lg border border-white/5">
            {Object.entries(animeData).map(([key, value]) => {
               if (['title', 'thumb', 'synopsis', 'genres', 'episodes', 'url'].includes(key)) return null;
               if (typeof value !== 'string' && typeof value !== 'number') return null;
               
               return (
                 <div key={key} className="flex flex-col">
                    <span className="text-gray-500 text-xs uppercase tracking-wider">{key.replace(/_/g, ' ')}</span>
                    <span className="text-white text-sm font-medium truncate">{value}</span>
                 </div>
               );
            })}
         </div>

         {/* Episode List */}
         <div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
              Episodes 
              <span className="ml-3 text-sm font-normal text-gray-400 bg-[#202020] px-2 py-1 rounded-full">
                {animeData.episodes ? animeData.episodes.length : 0}
              </span>
            </h2>
            
            {animeData.episodes && animeData.episodes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {animeData.episodes.map((ep: any, idx: number) => (
                      <Link 
                        key={idx}
                        // For now, link to a placeholder watch page. Ideally we need an /anime/watch page.
                        // We'll pass the episode URL as a query param.
                        href={`/anime/watch?url=${encodeURIComponent(ep.url)}`} 
                        className="group bg-[#1a1a1a] hover:bg-[#252525] border border-white/5 hover:border-white/20 transition-all rounded p-3 flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-300 group-hover:text-white font-medium truncate flex-1">
                           {ep.title}
                        </span>
                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                           {ep.date}
                        </span>
                      </Link>
                  ))}
                </div>
            ) : (
                <div className="text-gray-500 italic">No episodes found.</div>
            )}
         </div>
      </div>
    </div>
  );
}
