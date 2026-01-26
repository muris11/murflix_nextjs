import { dramabox } from "@/lib/sansekai";
import MediaRow from "@/components/media/MediaRow";
import DramaCard from "@/components/media/DramaCard";

export const revalidate = 3600; // Revalidate every hour

export default async function DramaBoxPage() {
  const [trending, latest, forYou, vip] = await Promise.all([
    dramabox.getTrending(),
    dramabox.getLatest(),
    dramabox.getForYou(),
    dramabox.getVip()
  ]);

  return (
    <div className="min-h-screen bg-[#141414] pb-8 sm:pb-10 md:pb-12 pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8">
       <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">DramaBox</h1>
       
       <div className="space-y-8">
         {trending.status && (
           <MediaRow 
             title="Trending Now" 
             items={trending.data} 
             renderItem={(item) => <DramaCard item={item} provider="dramabox" />}
           />
         )}

         {latest.status && (
           <MediaRow 
             title="Latest Releases" 
             items={latest.data} 
             renderItem={(item) => <DramaCard item={item} provider="dramabox" />}
           />
         )}

         {forYou.status && (
           <MediaRow 
             title="Recommended For You" 
             items={forYou.data} 
             renderItem={(item) => <DramaCard item={item} provider="dramabox" />}
           />
         )}

         {vip.status && (
           <MediaRow 
             title="VIP Content" 
             items={vip.data} 
             renderItem={(item) => <DramaCard item={item} provider="dramabox" />}
           />
         )}
       </div>
    </div>
  );
}
