import { anime } from "@/lib/sansekai";
import MediaRow from "@/components/media/MediaRow";
import AnimeCard from "@/components/media/AnimeCard";

export const revalidate = 3600;

export default async function AnimePage() {
  const [latest, recommended, movie] = await Promise.all([
    anime.getLatest(),
    anime.getRecommended(),
    anime.getMovie()
  ]);

  return (
    <div className="min-h-screen bg-[#141414] pb-8 sm:pb-10 md:pb-12 pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8">
       <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">Anime</h1>
       
       <div className="space-y-8">
         {latest.status && (
           <MediaRow 
             title="Latest Episodes" 
             items={latest.data} 
             renderItem={(item) => <AnimeCard item={item} />}
           />
         )}

         {recommended.status && (
           <MediaRow 
             title="Recommended Anime" 
             items={recommended.data} 
             renderItem={(item) => <AnimeCard item={item} />}
           />
         )}

         {movie.status && (
           <MediaRow 
             title="Anime Movies" 
             items={movie.data} 
             renderItem={(item) => <AnimeCard item={item} />}
           />
         )}
       </div>
    </div>
  );
}
