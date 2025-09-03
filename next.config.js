/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'


module.exports = {
output: 'export', // enables `next export` for static output
images: {
unoptimized: true, // required for static export
},
// On org/user pages (envirocast.github.io), no basePath needed.
// If you later host under a subpath, set basePath & assetPrefix accordingly.
}
