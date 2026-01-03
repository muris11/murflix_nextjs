
export default function MediaCenterPage() {
  const newsItems = [
    {
      date: 'January 15, 2026',
      title: 'Murflix Announces New Global Originals Slate',
      category: 'Content'
    },
    {
      date: 'January 10, 2026',
      title: 'Murflix Expands to 50 New Countries',
      category: 'Business'
    },
    {
      date: 'January 5, 2026',
      title: 'Introducing 4K HDR Streaming for All Plans',
      category: 'Product'
    }
  ];

  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-800 pb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Media Center</h1>
            <p className="text-xl text-gray-400">Latest news, assets, and press releases.</p>
          </div>
          <button className="bg-white text-black font-bold py-3 px-6 rounded-md hover:bg-gray-200 transition-colors">
            Download Press Kit
          </button>
        </div>
        
        {/* Resources Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-colors group cursor-pointer">
            <h3 className="text-xl font-bold text-white mb-2">Brand Assets</h3>
            <p className="text-gray-400 mb-6 text-sm">Logos, colors, and typography guidelines.</p>
            <span className="text-primary font-medium group-hover:underline">View Assets &rarr;</span>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-colors group cursor-pointer">
            <h3 className="text-xl font-bold text-white mb-2">Image Library</h3>
            <p className="text-gray-400 mb-6 text-sm">High-res images of our shows and executives.</p>
            <span className="text-primary font-medium group-hover:underline">Browse Library &rarr;</span>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition-colors group cursor-pointer">
            <h3 className="text-xl font-bold text-white mb-2">Contact Press</h3>
            <p className="text-gray-400 mb-6 text-sm">Get in touch with our PR team.</p>
            <span className="text-primary font-medium group-hover:underline">Contact Us &rarr;</span>
          </div>
        </div>

        {/* Latest News */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Latest News</h2>
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer group">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-primary text-xs font-bold uppercase tracking-wider">{item.category}</span>
                    <span className="text-gray-600 text-xs">•</span>
                    <span className="text-gray-500 text-xs">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
                <svg className="w-5 h-5 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
