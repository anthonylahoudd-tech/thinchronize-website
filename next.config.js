/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['mir-s3-cdn-cf.behance.net'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'mir-s3-cdn-cf.behance.net' },
    ],
  },
  // Required for Sanity Studio embedded in Next.js
  transpilePackages: ['sanity'],
}

module.exports = nextConfig
