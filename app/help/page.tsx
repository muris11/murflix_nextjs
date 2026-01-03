import PageHeader from "@/components/PageHeader";
import Link from "next/link";

export default function HelpPage() {
  const categories = [
    { 
      title: 'Getting Started', 
      desc: 'Account setup, profiles, and parental controls.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      title: 'Billing & Account', 
      desc: 'Payment methods, plans, and billing history.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    { 
      title: 'Watching Murflix', 
      desc: 'Supported devices, downloading, and subtitles.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      title: 'Troubleshooting', 
      desc: 'Fixing buffering, login, and error codes.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <PageHeader 
        title="Help Center" 
        subtitle="How can we help you today?"
      />

      <div className="max-w-5xl mx-auto px-6 pb-24">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto -mt-20 mb-16 relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <input 
              type="text" 
              placeholder="Search for answers..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-full py-5 px-8 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pl-14 transition-all shadow-2xl text-lg relative z-10"
            />
            <svg className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 z-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {categories.map((cat) => (
            <div 
              key={cat.title} 
              className="group bg-neutral-900/40 hover:bg-neutral-900 p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {cat.icon}
                </div>
                <h2 className="text-xl font-bold">{cat.title}</h2>
              </div>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors pl-[4.5rem]">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-8 px-2">Popular Topics</h3>
          <div className="grid md:grid-cols-3 gap-6">
             {['How to reset password', 'Payment methods', 'Download to watch offline'].map((topic, i) => (
               <Link 
                 href="#" 
                 key={i}
                 className="block p-6 bg-neutral-900/30 rounded-xl border border-white/5 hover:border-white/20 hover:bg-neutral-900 transition-all text-gray-300 hover:text-white font-medium"
               >
                 {topic} &rarr;
               </Link>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}