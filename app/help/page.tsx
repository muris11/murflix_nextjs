import Link from 'next/link';

export default function HelpCenterPage() {
  const categories = [
    { 
      title: 'Getting Started', 
      description: 'Everything you need to know to start watching.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      title: 'Account & Billing', 
      description: 'Manage your account details and payment methods.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    { 
      title: 'Watching on Murflix', 
      description: 'Device support, subtitles, and playback features.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      title: 'Troubleshooting', 
      description: 'Fix buffering, login issues, and error messages.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
          <p className="text-xl text-gray-400">Search or browse categories to get support fast.</p>
          
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="What can we help you with?"
              className="w-full bg-gray-900 border border-gray-700 rounded-full py-4 px-6 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pl-12 transition-all shadow-lg"
            />
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div 
              key={category.title} 
              className="bg-gray-900 p-8 rounded-xl border border-gray-800 hover:border-gray-600 hover:bg-gray-800 transition-all cursor-pointer group"
            >
              <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300 w-fit">
                {category.icon}
              </div>
              <h2 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                {category.title}
              </h2>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-xl border border-gray-800 text-center space-y-4">
          <p className="text-gray-400">Can&apos;t find what you&apos;re looking for?</p>
          <Link 
            href="/contact"
            className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
