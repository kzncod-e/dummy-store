/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      // Tambahkan lainnya jika perlu
    ],
  },
};

module.exports = nextConfig;
