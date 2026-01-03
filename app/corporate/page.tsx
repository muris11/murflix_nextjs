import PageHeader from "@/components/PageHeader";

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <PageHeader 
        title="Corporate Information" 
        subtitle="Building the future of entertainment, together."
      />

      <div className="max-w-6xl mx-auto px-6 pb-24 space-y-24">
        
        {/* At a Glance */}
        <section>
           <h2 className="text-3xl font-bold mb-12 flex items-center">
             <span className="w-2 h-8 bg-primary mr-4 rounded-full"/>
             Murflix at a Glance
           </h2>
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Headquarters", val: "Jakarta, Indonesia", icon: "🏢" },
                { title: "Employees", val: "500+ Worldwide", icon: "👥" },
                { title: "Streaming In", val: "190+ Countries", icon: "🌍" },
              ].map((item, i) => (
                <div key={i} className="bg-neutral-900/40 border border-white/5 p-8 rounded-2xl text-center hover:bg-neutral-900 transition-colors">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{item.title}</h3>
                  <p className="text-xl font-bold text-white">{item.val}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Leadership */}
        <section>
          <h2 className="text-3xl font-bold mb-12 flex items-center">
             <span className="w-2 h-8 bg-primary mr-4 rounded-full"/>
             Our Leadership
           </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { name: "Rifqy", role: "Founder & CEO" },
               { name: "Sarah Chen", role: "Chief Content Officer" },
               { name: "Marcus Johnson", role: "CTO" },
               { name: "Elena Rodriguez", role: "CFO" }
             ].map((leader, i) => (
               <div key={i} className="group">
                  <div className="aspect-[3/4] bg-neutral-800 rounded-xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-neutral-700">
                      <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{leader.name}</h3>
                  <p className="text-primary text-sm">{leader.role}</p>
               </div>
             ))}
          </div>
        </section>

        {/* Investor Relations */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-neutral-900 to-black border border-white/5">
           <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
           <div className="relative z-10 p-12 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Investor Relations</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Find financial reports, stock information, corporate governance, and upcoming events for investors.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <button className="bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 transition-colors">
                   Annual Reports
                 </button>
                 <button className="bg-transparent border border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/10 transition-colors">
                   Stock Information
                 </button>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}