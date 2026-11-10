import type { NextConfig } from "next";

// R2 public URL for this environment (staging or production). Allows next/image
// to optimize images that live in the bucket.
const assetsHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_ASSETS_BASE_URL
      ? new URL(process.env.NEXT_PUBLIC_ASSETS_BASE_URL).hostname
      : null;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats first; Next negotiates per Accept header and falls
    // back to the original automatically.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "staticmap.openstreetmap.de" },
      // R2 public URLs: the r2.dev development URL (staging) and the custom
      // domain (production). The env derived host below also covers any other
      // custom domain set in NEXT_PUBLIC_ASSETS_BASE_URL.
      { protocol: "https", hostname: "*.r2.dev" },
      { protocol: "https", hostname: "assets.daffabadranthoriq.com" },
      ...(assetsHost ? [{ protocol: "https" as const, hostname: assetsHost }] : []),
    ],
  },
  experimental: {
    // Load only the icons/animation helpers actually used instead of the whole
    // barrel file. (Next auto-optimizes some libs; listing is a safe explicit hint.)
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
