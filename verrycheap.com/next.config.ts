import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "user-images.trustpilot.com",
      },
    ],
  },
};

export default nextConfig;
