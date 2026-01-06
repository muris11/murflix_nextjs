import PageHeader from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white selection:bg-primary selection:text-white">
      <PageHeader 
        title="About Murflix" 
        subtitle="Redefining the way the world watches movies."
      />

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-24">
        {/* Mission Statement */}
        <section className="text-center space-y-8 animate-slide-up">
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-gray-200">
            &ldquo;We believe stories have the power to move us. They make us feel more emotion, see new perspectives, and bring us closer to each other.&rdquo;
          </p>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/5">
          {[
            { label: "Founded", value: "2024" },
            { label: "Countries", value: "190+" },
            { label: "Languages", value: "30+" },
            { label: "Members", value: "200M+" }
          ].map((stat) => (
            <div key={stat.label} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Narrative Sections */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <div className="w-12 h-1 bg-primary rounded-full" />
            <p className="text-gray-400 leading-relaxed text-lg">
              Murflix began with a simple idea: entertainment should be accessible, seamless, and boundless. What started as a small project in a dorm room has grown into a global phenomenon, connecting millions of people through the universal language of storytelling.
            </p>
          </div>
          <div className="relative h-64 md:h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/5 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
             <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse">
           <div className="relative h-64 md:h-80 bg-gradient-to-bl from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/5 shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 md:order-1">
             <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
          </div>
          <div className="space-y-6 md:order-2">
            <h2 className="text-3xl font-bold">Global Reach</h2>
            <div className="w-12 h-1 bg-primary rounded-full" />
            <p className="text-gray-400 leading-relaxed text-lg">
              From Tokyo to Toronto, Murflix is there. We are committed to delivering high-quality streaming without buffering, supporting local content creators, and bringing diverse stories to the global stage.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-16 border-t border-white/5">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Murflix, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}