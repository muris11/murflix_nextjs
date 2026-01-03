import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHeader({ title, subtitle, backgroundImage }: PageHeaderProps) {
  return (
    <div className="relative w-full h-[40vh] md:h-[50vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden mb-12">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover opacity-30"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141414]/80 via-[#141414]/90 to-[#141414]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-[#141414]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-fade-in">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Back Button */}
      <Link 
        href="/"
        className="absolute top-8 left-8 z-20 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors group"
      >
        <div className="p-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
        <span className="text-sm font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">Back Home</span>
      </Link>
    </div>
  );
}