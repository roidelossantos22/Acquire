import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // For Docker/deployment
  // Enable static generation where possible
  experimental: {
    // Add any experimental features you need
  },
};

export default nextConfig;
