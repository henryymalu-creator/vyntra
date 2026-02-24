/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: 'export', // Disabled for now - using standard Next.js deployment
  images: {
    // unoptimized: true, // Only needed for static export
    domains: ['maps.googleapis.com', 'maps.google.com'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
