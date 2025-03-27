/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript checking during production builds
    ignoreBuildErrors: true,
  },
  // Setup parameter handling through rewrites
  async rewrites() {
    return [
      {
        // Capture all paths that aren't specific known routes and treat them as parameters
        // This will allow /matthigham254 to be rendered by the root page
        source: '/:path((?!checkout|success|api|_next|favicon.ico|collection[1-4].jpg|challenges.png|teaching-series.png).+)',
        destination: '/',
      }
    ];
  }
};

module.exports = nextConfig; 