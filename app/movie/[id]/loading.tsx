export default function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#141414] animate-pulse">
      {/* Hero Skeleton */}
      <div className="relative h-[50vh] md:h-[85vh] w-full bg-[#1f1f1f]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Info Skeleton */}
          <div className="flex-1 space-y-6 pt-10">
            {/* Title */}
            <div className="h-10 md:h-16 w-3/4 bg-[#333] rounded-md" />
            
            {/* Meta Line */}
            <div className="flex items-center gap-4">
              <div className="h-6 w-20 bg-[#333] rounded" />
              <div className="h-6 w-16 bg-[#333] rounded" />
              <div className="h-6 w-12 bg-[#333] rounded" />
            </div>

            {/* Overview */}
            <div className="space-y-3 max-w-2xl pt-4">
              <div className="h-4 w-full bg-[#333] rounded" />
              <div className="h-4 w-full bg-[#333] rounded" />
              <div className="h-4 w-2/3 bg-[#333] rounded" />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <div className="h-12 w-32 bg-[#333] rounded" />
              <div className="h-12 w-32 bg-[#333] rounded" />
            </div>
          </div>
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="h-8 w-48 bg-[#333] rounded mb-6" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-[2/3] bg-[#222] rounded-md" />
              ))}
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="h-8 w-32 bg-[#333] rounded" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-[#222] rounded" />
              <div className="h-4 w-3/4 bg-[#222] rounded" />
              <div className="h-4 w-5/6 bg-[#222] rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}