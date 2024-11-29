/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
  trailingSlash: true,
  staticPageGenerationTimeout: 1000,
}

module.exports = nextConfig 