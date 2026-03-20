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
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/**",
      },
      // 🔹 UploadThing
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "ij2j5wri4k.ufs.sh",
        port: "",
        pathname: "/f/**",
      },
      // 🔹 Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // 🔹 LIVE Render Backend (Required so avatars load in Production)
      {
        protocol: "https",
        hostname: "blogzilla-050s.onrender.com",
        pathname: "/**",
      },
    ],
  },

  // 🔹 API Rewrites (Fixes the 401 Third-Party Cookie block!)
  async rewrites() {
    return [
      {
        source: '/api/admin/:path*',
        destination: 'https://blogzilla-050s.onrender.com/api/admin/:path*',
      },
    ];
  },
};

export default nextConfig;