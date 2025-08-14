/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable src directory
  distDir: '.next',
  
  // Performance optimizations
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ['react-icons'],
  },
  
  // Image optimization
  images: {
    // Enable modern image formats for better compression
    formats: ['image/webp', 'image/avif'],
    // Add domains if you have external images
    domains: [],
    // Configure image sizes for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
