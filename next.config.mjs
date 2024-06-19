/** @type {import('next').NextConfig} */
const nextConfig = {
    // next.config.mjs
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.chucknorris.io/:path*',
      },
    ];
  },

};

export default nextConfig;

