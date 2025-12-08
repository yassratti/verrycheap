import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "user-images.trustpilot.com",
      },
      {
        protocol: "https",
        hostname: "zdrwtzgueprucndkatlm.supabase.co",
      },
    ],
  },
};

export default nextConfig;
