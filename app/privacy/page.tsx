
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-gray-400">How we collect, use, and protect your data.</p>
        </div>
        
        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none space-y-12 text-gray-300">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Last Updated: January 2026</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Information We Collect</h2>
            <p>
              We receive and store information about you such as:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-primary">
              <li>Information you provide to us: your name, email address, payment method(s), and telephone number.</li>
              <li>Information we collect automatically: we collect information about you and your use of our service, your interactions with us and our advertising.</li>
              <li>Information from other sources: we also obtain information from other sources. We protect this information according to the practices described in this Privacy Statement.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Use of Information</h2>
            <p>
              We use information to provide, analyze, administer, enhance and personalize our services and marketing efforts, to process your registration, your orders and your payments, and to communicate with you on these and other topics.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Disclosure of Information</h2>
            <p>
              We disclose your information for certain purposes and to third parties, as described below:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-primary">
              <li>The Murflix family of companies</li>
              <li>Service Providers</li>
              <li>Promotional offers</li>
              <li>Protection of Murflix and others</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Your Choices</h2>
            <p>
              You can manage your information and privacy settings in your Account page. You can also unsubscribe from our marketing communications at any time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
