import PageHeader from "@/components/PageHeader";

export default function FAQPage() {
  const faqs = [
    {
      q: "What is Murflix?",
      a: "Murflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price."
    },
    {
      q: "How much does Murflix cost?",
      a: "Watch Murflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from Basic to Premium. No extra costs, no contracts."
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
      q: "Is Murflix good for kids?",
      a: "The Murflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see."
    }
  ];

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <PageHeader 
        title="Frequently Asked Questions" 
        subtitle="Everything you need to know about Murflix."
      />

      <div className="max-w-3xl mx-auto px-6 pb-24 space-y-8">
        {faqs.map((item, index) => (
          <div 
            key={index} 
            className="group bg-neutral-900/50 hover:bg-neutral-900 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden"
          >
            <div className="p-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-start gap-4">
                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold">Q</span>
                {item.q}
              </h3>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8" /> {/* Spacer for alignment */}
                <p className="text-gray-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Still have questions? */}
        <div className="mt-16 text-center bg-gradient-to-r from-gray-900 to-black p-10 rounded-3xl border border-white/5">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Can't find the answer you're looking for? Please chat to our friendly team.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}