/** @type {import('next').NextConfig} */
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

module.exports = nextConfig
