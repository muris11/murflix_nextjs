import { reelshort } from "@/lib/sansekai";
import MediaRow from "@/components/media/MediaRow";
import DramaCard from "@/components/media/DramaCard";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ReelShortPage() {
  const homepage = await reelshort.getHomepage();

  return (
    <div className="min-h-screen bg-[#141414] pb-8 sm:pb-10 md:pb-12 pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8">
       <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">ReelShort</h1>
       
       <div className="space-y-8">
         {homepage.status && (
           <MediaRow 
             title="Featured on ReelShort" 
             items={homepage.data} 
             renderItem={(item) => <DramaCard item={item} provider="reelshort" />}
           />
         )}
       </div>
    </div>
  );
}
