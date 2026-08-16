/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "musclesync.net"],
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
