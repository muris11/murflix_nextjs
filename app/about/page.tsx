
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            About <span className="text-primary">Murflix</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            A curated home for movie lovers with a clean, cinematic browsing experience.
          </p>
        </div>
        
        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none space-y-12">
          <section>
            <p className="lead text-lg text-gray-300">
              Murflix is the world&apos;s leading streaming entertainment service with over 200 million paid memberships in over 190 countries enjoying TV series, documentaries, feature films and mobile games across a wide variety of genres and languages.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-10">
            <section className="bg-gray-900/50 p-8 rounded-2xl border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-1 h-6 bg-red-600 mr-3 rounded-full"></span>
                Our Story
              </h3>
              <p className="text-gray-400">
                Founded in 2024, Murflix began as a small project to make entertainment accessible to everyone. Today, we&apos;re redefining how the world watches movies and TV shows with our cutting-edge streaming technology.
              </p>
            </section>
            
            <section className="bg-gray-900/50 p-8 rounded-2xl border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="w-1 h-6 bg-red-600 mr-3 rounded-full"></span>
                Our Mission
              </h3>
              <p className="text-gray-400">
                We want to entertain the world. Whatever your taste, and no matter where you live, we give you access to best-in-class TV shows, movies and documentaries.
              </p>
            </section>
          </div>

          <section className="text-center bg-gradient-to-b from-gray-900 to-black p-10 rounded-3xl border border-gray-800">
            <h2 className="text-3xl font-bold text-white mb-6">Global Reach</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Members can watch as much as they want, anytime, anywhere, on any internet-connected screen. Members can play, pause and resume watching, all without commercials or commitments.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
