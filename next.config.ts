import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  // Handle missing files to prevent 404 errors
  async rewrites() {
    return [
      {
        source: '/terms.txt',
        destination: '/api/not-found',
      },
      {
        source: '/privacy.txt',
        destination: '/api/not-found',
      },
    ];
  },
  // Optional: Add headers to handle these requests gracefully
  async headers() {
    return [
      {
        source: '/terms.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
      {
        source: '/privacy.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
