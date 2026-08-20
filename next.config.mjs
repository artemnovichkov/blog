/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Legacy Teletype blog subdomain
      {
        source: "/",
        has: [{ type: "host", value: "blog.artemnovichkov.com" }],
        destination: "https://artemnovichkov.com/blog",
        permanent: true,
      },
      {
        source: "/:slug*",
        has: [{ type: "host", value: "blog.artemnovichkov.com" }],
        destination: "https://artemnovichkov.com/blog/:slug*",
        permanent: true,
      },
    ]
  },
  // PostHog is proxied first-party so content blockers, which this audience
  // uses heavily, do not silently drop analytics.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ]
  },
  // PostHog's API rejects the trailing-slash redirect Next would otherwise add.
  skipTrailingSlashRedirect: true,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: [
              '</feed.xml>; rel="alternate"; type="application/rss+xml"; title="Artem Novichkov Blog"',
              '</sitemap.xml>; rel="sitemap"; type="application/xml"',
              '</llms.txt>; rel="alternate"; type="text/plain"; title="Post index for LLMs"',
              '</.well-known/api-catalog>; rel="api-catalog"',
              '</.well-known/oauth-protected-resource>; rel="oauth-protected-resource"',
            ].join(", "),
          },
        ],
      },
    ]
  },
  // Enable src directory
  distDir: '.next',
  
  // Performance optimizations
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ['react-icons'],
  },
  
  // Turbopack configuration (Next.js 16+ default)
  turbopack: {},

  // Fix CSS minification compatibility issue with Tailwind v4 (for webpack builds)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimize = false;
    }
    return config;
  },

  // Image optimization
  images: {
    // Enable modern image formats for better compression
    formats: ['image/webp', 'image/avif'],
    // Configure image sizes for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
