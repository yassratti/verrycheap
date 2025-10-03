/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!

    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true
  },
  // Indica que estamos usando el compilador SWC de Next.js
  swcMinify: true,
};

export default nextConfig;
