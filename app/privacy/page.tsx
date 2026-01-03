import PageHeader from "@/components/PageHeader";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <PageHeader 
        title="Privacy Policy" 
        subtitle="Your privacy is important to us."
      />

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="p-8 md:p-12 bg-neutral-900/30 rounded-3xl border border-white/5 space-y-12">
            
            <section>
              <h3 className="text-2xl font-bold text-white mb-4">1. Data Collection</h3>
              <p className="text-gray-400 leading-relaxed">
                We receive and store information about you such as:
                <br /><br />
                <strong className="text-white">Information you provide to us:</strong> This includes your name, email address, address or postal code, payment method(s), and telephone number.
                <br /><br />
                <strong className="text-white">Information we collect automatically:</strong> We collect information about you and your use of our service, your interactions with us and our advertising, as well as information regarding your network, network devices, and your computer or other Murflix capable devices you might use to access our service.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-4">2. Use of Information</h3>
              <p className="text-gray-400 leading-relaxed">
                We use information to provide, analyze, administer, enhance and personalize our services and marketing efforts, to process your registration, your orders and your payments, and to communicate with you on these and other topics.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-4">3. Data Security</h3>
              <p className="text-gray-400 leading-relaxed">
                We use reasonable administrative, logical, physical and managerial measures to safeguard your personal information against loss, theft and unauthorized access, use and modification. Unfortunately, no measures can be guaranteed to provide 100% security.
              </p>
            </section>

             <section>
              <h3 className="text-2xl font-bold text-white mb-4">4. Your Rights</h3>
              <p className="text-gray-400 leading-relaxed">
                You can request access to your personal information, or correct or update out-of-date or inaccurate personal information we hold about you. You may also request that we delete personal information that we hold about you.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}