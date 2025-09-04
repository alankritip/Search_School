import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   experimental: {
    serverActions: {
      // Server Actions enabled
      bodySizeLimit: "8mb"
    }
  },
  images: {
    // If using next/image for local images
    unoptimized: true
  }
};

export default nextConfig;
