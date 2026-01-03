
export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Corporate Information</h1>
          <p className="text-xl text-gray-400">Leadership, facts, and investor information.</p>
        </div>
        
        {/* Content */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-primary pl-4">Leadership</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👨‍💼</div>
                <h3 className="text-lg font-bold text-white">Rifqy</h3>
                <p className="text-primary text-sm font-medium">Founder & CEO</p>
              </div>
              {/* Add more placeholders if needed */}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-primary pl-4">Company Facts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-sm mb-1">Headquarters</p>
                <p className="text-white font-medium">Jakarta, ID</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-sm mb-1">Founded</p>
                <p className="text-white font-medium">2024</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-sm mb-1">Employees</p>
                <p className="text-white font-medium">100+</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-sm mb-1">Subscribers</p>
                <p className="text-white font-medium">1 Million+</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Investor Relations</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Murflix is committed to creating long-term value for our shareholders. For financial reports, stock information, and corporate governance, please visit our Investor Relations site.
            </p>
            <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors">
              View Investor Relations
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
