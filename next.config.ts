import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.nflxext.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.sansekai.my.id',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.douyinpic.com', // Common for Chinese dramas
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.tik-cdn.com', // Common for TikTok/ReelShort content
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
