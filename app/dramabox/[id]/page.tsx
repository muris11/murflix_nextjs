import { dramabox } from "@/lib/sansekai";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DramaBoxDetailPage({ params }: PageProps) {
  const { id } = await params;
  const detail = await dramabox.getDetail(id);

  if (!detail.status || !detail.data) {
    notFound();
  }

  const drama = detail.data;

  return (
    <div className="min-h-screen bg-[#141414] pb-12">
      {/* Backdrop / Header */}
      <div className="relative w-full aspect-video md:aspect-[3/1] max-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={drama.cover}
            alt={drama.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
        </div>

        <div className="absolute top-4 left-4 z-50">
           <Link href="/dramabox" className="flex items-center text-white hover:text-gray-300 transition-colors">
              <ChevronLeft className="w-6 h-6 mr-1" /> Back
           </Link>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 lg:p-12 z-20 flex flex-col md:flex-row gap-6 items-end">
           <div className="relative w-32 md:w-48 aspect-[2/3] flex-shrink-0 shadow-xl rounded-md overflow-hidden border-2 border-white/20 hidden md:block">
              <Image
                src={drama.cover}
                alt={drama.title}
                fill
                className="object-cover"
              />
           </div>
           
           <div className="flex-1 space-y-4 pb-4">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">{drama.title}</h1>
              
              <div className="flex flex-wrap gap-2">
                 {drama.category && (Array.isArray(drama.category) ? drama.category : [drama.category]).map((cat: string, i: number) => (
                    <span key={i} className="px-2 py-1 bg-white/10 text-white text-xs rounded border border-white/20">
                       {cat}
                    </span>
                 ))}
              </div>

              {drama.intro && (
                 <p className="text-gray-300 max-w-3xl line-clamp-3 md:line-clamp-none text-sm md:text-base">
                    {drama.intro}
                 </p>
              )}
           </div>
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="px-4 md:px-8 lg:px-12 mt-8">
         <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>
         
         {drama.episodes && drama.episodes.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
               {drama.episodes.map((ep, idx) => (
                  <Link 
                    key={idx} 
                    href={`/dramabox/watch/${id}/${ep.episodeNumber}`}
                    className="bg-[#202020] hover:bg-[#303030] transition-colors rounded-md p-3 group flex flex-col gap-2"
                  >
                     <div className="relative aspect-video rounded overflow-hidden bg-black">
                        <div className="absolute inset-0 flex items-center justify-center">
                           <span className="text-white font-bold text-lg">EP {ep.episodeNumber}</span>
                        </div>
                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                     </div>
                     <p className="text-gray-400 text-xs group-hover:text-white truncate">Episode {ep.episodeNumber}</p>
                  </Link>
               ))}
            </div>
         ) : (
            <p className="text-gray-500">No episodes available.</p>
         )}
      </div>
    </div>
  );
}
