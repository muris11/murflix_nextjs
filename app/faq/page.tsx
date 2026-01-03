export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-400">Quick answers about Murflix and how it works.</p>
        </div>
        
        {/* Content */}
        <div className="space-y-6">
          {[
            {
              q: "What is Murflix?",
              a: "Murflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices."
            },
            {
              q: "How much does Murflix cost?",
              a: "Murflix is currently free to use. You can watch as much as you want, whenever you want without a single ad – all for free."
            },
            {
              q: "Where can I watch?",
              a: "Watch anywhere, anytime. Sign in with your Murflix account to watch instantly on the web at murflix.com from your personal computer or on any internet-connected device that offers the Murflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles."
            },
            {
              q: "How do I cancel?",
              a: "Murflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
            },
            {
              q: "What can I watch on Murflix?",
              a: "Murflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Murflix originals, and more. Watch as much as you want, anytime you want."
            }
          ].map((item, index) => (
            <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
              <h2 className="text-xl font-bold text-white mb-3 flex items-start">
                <span className="text-primary mr-3 text-lg mt-1">Q.</span>
                {item.q}
              </h2>
              <div className="flex">
                <span className="text-gray-500 mr-3 text-lg font-bold ml-0.5">A.</span>
                <p className="text-gray-300 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
