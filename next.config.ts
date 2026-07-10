import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats first; Next negotiates per Accept header and falls
    // back to the original automatically.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "staticmap.openstreetmap.de" },
    ],
  },
  experimental: {
    // Load only the icons/animation helpers actually used instead of the whole
    // barrel file. (Next auto-optimizes some libs; listing is a safe explicit hint.)
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
