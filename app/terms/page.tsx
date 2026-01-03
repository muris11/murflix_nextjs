import PageHeader from "@/components/PageHeader";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <PageHeader 
        title="Terms of Service" 
        subtitle="Last Updated: January 2026"
      />

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="p-8 md:p-12 bg-neutral-900/30 rounded-3xl border border-white/5 space-y-12">
            
            <section>
              <h3 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h3>
              <p className="text-gray-400 leading-relaxed">
                By accessing and using Murflix, including accessing the website, mobile applications, and other services provided by Murflix, you agree to these Terms of Use and our Privacy Policy. If you do not agree to these Terms, you may not use our Service.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-4">2. Subscription & Billing</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Your Murflix subscription will continue until terminated. To use the Murflix service you must have Internet access and a Murflix ready device, and provide us with one or more Payment Methods.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>We may change our subscription plans and the price of our service from time to time.</li>
                <li>You can cancel your Murflix membership at any time, and you will continue to have access to the Murflix service through the end of your billing period.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-white mb-4">3. Content Limitations</h3>
              <p className="text-gray-400 leading-relaxed">
                The Murflix service and any content viewed through the service are for your personal and non-commercial use only. During your Murflix membership we grant you a limited, non-exclusive, non-transferable right to access the Murflix service and view Murflix content.
              </p>
            </section>

             <section>
              <h3 className="text-2xl font-bold text-white mb-4">4. Governing Law</h3>
              <p className="text-gray-400 leading-relaxed">
                These Terms of Use shall be governed by and construed in accordance with the laws of the jurisdiction in which Murflix is headquartered, without regard to its conflict of law provisions.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}