/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['edamam-product-images.s3.amazonaws.com', 'www.edamam.com'],
    },
    exportPathMap: async function ( ) {
        return {}
    },
};

module.exports = nextConfig;
