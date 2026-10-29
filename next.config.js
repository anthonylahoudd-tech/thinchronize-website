/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve WebP (and AVIF where supported) instead of JPEG/PNG
    formats: ['image/webp', 'image/avif'],
    // Cache optimised images for 30 days on CDN
    minimumCacheTTL: 2592000,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'mir-s3-cdn-cf.behance.net' },
    ],
  },
  // Required for Sanity Studio embedded in Next.js
  transpilePackages: ['sanity'],
  async redirects() {
    return [
      // Services became Production (2026-07-15 restructure); fragments survive the redirect.
      { source: '/services', destination: '/production', permanent: true },
    ]
  },
}

module.exports = nextConfig
