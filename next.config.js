/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'enka.network',
            port: '',
            pathname: '/ui/hsr/**',
          },
        ],
      },
}

module.exports = withBundleAnalyzer(nextConfig)
