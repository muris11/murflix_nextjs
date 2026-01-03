
export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 border-b border-gray-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tight">Cookie Preferences</h1>
          <p className="text-xl text-gray-400">Control how Murflix personalizes your experience.</p>
        </div>
        
        <div className="space-y-8">
          <p className="text-gray-300 text-lg">
            We use cookies and other technologies to keep our website secure, reliable, and personalized for you. You can manage your preferences below.
          </p>

          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex items-center justify-between">
              <div className="pr-8">
                <h3 className="text-lg font-bold text-white mb-2">Essential Cookies</h3>
                <p className="text-gray-400 text-sm">
                  These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs font-bold uppercase tracking-wider text-green-500 bg-green-500/10 px-3 py-1 rounded-full">Always Active</span>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex items-center justify-between">
              <div className="pr-8">
                <h3 className="text-lg font-bold text-white mb-2">Performance & Analytics</h3>
                <p className="text-gray-400 text-sm">
                  These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-700 checked:right-0 checked:border-green-400"/>
                  <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"></label>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 flex items-center justify-between">
              <div className="pr-8">
                <h3 className="text-lg font-bold text-white mb-2">Advertising</h3>
                <p className="text-gray-400 text-sm">
                  These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests.
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle2" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-700 checked:right-0 checked:border-green-400"/>
                  <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer"></label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-800">
            <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
