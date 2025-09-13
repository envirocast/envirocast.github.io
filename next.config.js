/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Next.js image optimization (important for GitHub Pages / static export)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },

  // Handle missing files gracefully
  async rewrites() {
    return [
      {
        source: "/terms.txt",
        destination: "/api/not-found",
      },
      {
        source: "/privacy.txt",
        destination: "/api/not-found",
      },
    ];
  },

  // Optional headers for missing files
  async headers() {
    return [
      {
        source: "/terms.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
      {
        source: "/privacy.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
