import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        /* Placeholder images for development — remove in production */
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
