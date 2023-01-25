/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {},
      exportPathMap: async function ( ) {
          return {}
      },
};

module.exports = nextConfig;
