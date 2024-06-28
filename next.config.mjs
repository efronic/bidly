/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'pub-168175758d3847e8a8cc1ed48110a7cc.r2.dev',
        protocol: 'https',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        // Include any specific port if necessary, otherwise, it can be omitted
        // port: '',
        pathname: '/a/**', // Adjust the pathname pattern to match your image URLs
      },
    ],
    // If you want to support additional image formats, include them here
    // formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
