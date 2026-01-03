
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-xl text-gray-400">The rules and conditions for using Murflix.</p>
        </div>
        
        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none space-y-12 text-gray-300">
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Last Updated: January 2026</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
            <p>
              Welcome to Murflix. By accessing our website and using our services, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Use of Service</h2>
            <p>
              Murflix provides a personalized subscription service that allows our members to access entertainment content (&quot;Murflix content&quot;) over the Internet on certain Internet-connected TV&apos;s, computers and other devices.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. User Content</h2>
            <p>
              You are responsible for any content you post or share on Murflix. We reserve the right to remove any content that violates our policies or is deemed inappropriate.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Intellectual Property</h2>
            <p>
              The Murflix service and any content viewed through the service are for your personal and non-commercial use only. We grant you a limited, non-exclusive, non-transferable license to access the Murflix service and view Murflix content.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Termination</h2>
            <p>
              We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
