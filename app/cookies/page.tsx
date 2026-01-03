import PageHeader from "@/components/PageHeader";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <PageHeader 
        title="Cookie Preferences" 
        subtitle="Manage how we use cookies to improve your experience."
      />

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-6">
          
          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 shadow-xl">
             <div className="flex items-start justify-between gap-6">
               <div>
                 <h3 className="text-xl font-bold text-white mb-2">Essential Cookies</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">
                   Strictly necessary cookies that allow you to browse the website and use its features, such as accessing secure areas. The website cannot function properly without these.
                 </p>
               </div>
               <div className="flex-shrink-0 pt-1">
                 <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold uppercase rounded-full tracking-wider">Required</div>
               </div>
             </div>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 shadow-xl transition-colors hover:border-white/10">
             <div className="flex items-start justify-between gap-6">
               <div>
                 <h3 className="text-xl font-bold text-white mb-2">Performance & Analytics</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">
                   Help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our platform.
                 </p>
               </div>
               <div className="flex-shrink-0 pt-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
               </div>
             </div>
          </div>

          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5 shadow-xl transition-colors hover:border-white/10">
             <div className="flex items-start justify-between gap-6">
               <div>
                 <h3 className="text-xl font-bold text-white mb-2">Marketing & Ads</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">
                   Used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                 </p>
               </div>
               <div className="flex-shrink-0 pt-1">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
               </div>
             </div>
          </div>

        </div>

        <div className="mt-12 flex justify-end">
           <button className="bg-white text-black font-bold py-4 px-12 rounded-full hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
             Save Preferences
           </button>
        </div>
      </div>
    </div>
  );
}