// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export', // enables `next export` for static output
  images: {
    unoptimized: true, // required for static export
  },
}
