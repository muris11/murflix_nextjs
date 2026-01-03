import PageHeader from "@/components/PageHeader";

export default function MediaPage() {
  const news = [
    {
      date: "January 15, 2026",
      category: "Content",
      title: "Murflix Announces New Global Originals Slate for 2026",
      desc: "An exciting lineup of movies and series from top creators around the world."
    },
    {
      date: "January 10, 2026",
      category: "Product",
      title: "Introducing 8K Streaming Support",
      desc: "Experience cinema-quality resolution in the comfort of your home with our new ultra-HD tier."
    },
    {
      date: "January 05, 2026",
      category: "Corporate",
      title: "Murflix Reaches 250 Million Subscribers",
      desc: "A milestone achievement marking our continued growth and global expansion."
    }
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <PageHeader 
        title="Media Center" 
        subtitle="Latest news, assets, and press resources."
      />

      <div className="max-w-6xl mx-auto px-6 pb-24">
        
        {/* Quick Access */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
           {["Brand Assets", "Executive Bios", "Fact Sheet"].map((item) => (
             <div key={item} className="bg-neutral-900/40 p-8 rounded-2xl border border-white/5 hover:bg-neutral-900 hover:border-primary/30 transition-all cursor-pointer group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{item}</h3>
                <p className="text-gray-400 text-sm mb-4">Download high-res logos and guides.</p>
                <div className="text-primary text-sm font-bold uppercase tracking-wider flex items-center">
                  Access <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
             </div>
           ))}
        </div>

        {/* Latest News */}
        <section>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <button className="text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-white transition-colors">View Archive</button>
          </div>

          <div className="space-y-6">
             {news.map((item, i) => (
               <div key={i} className="flex flex-col md:flex-row gap-8 p-8 rounded-3xl bg-neutral-900/20 border border-white/5 hover:bg-neutral-900/40 transition-colors group cursor-pointer">
                  <div className="md:w-1/4 flex flex-col justify-center">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                    <span className="text-gray-400 text-sm">{item.date}</span>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </section>

      </div>
    </div>
  );
}