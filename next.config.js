// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ensures static export
  images: {
    unoptimized: true, // GitHub Pages doesn’t handle Next.js Image optimization
  },
  basePath: '', // keep empty since you're using org.github.io root
}

module.exports = nextConfig
