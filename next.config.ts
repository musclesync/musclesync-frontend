import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: false,
  },
  images: {
    domains: ["localhost", "musclesync.net"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
