import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 🔹 Local backend (DEV)
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",   // 👈 Add this block
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: 'https',
        hostname: 'ij2j5wri4k.ufs.sh',
        port: '',
        pathname: '/f/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // 🔹 Existing external sources
      
    ],
  },
};

export default nextConfig;
