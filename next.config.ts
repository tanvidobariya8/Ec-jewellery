import type { NextConfig } from "next";

import { OPTIMIZED_IMAGE_HOSTS } from "./lib/images";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  images: {
    // Hosts live in lib/images.ts; other hosts render `unoptimized` (see isOptimizedImage).
    // Object form (not `new URL()`), so query strings like `?text=` are allowed.
    remotePatterns: OPTIMIZED_IMAGE_HOSTS.map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/**",
    })),
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
