import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Editorial records and local credentials are runtime-only private data.
  outputFileTracingExcludes: {
    "/*": ["./.eba-private/**/*", "./.env*"],
  },
  experimental: {
    // Avoid restoring a damaged persistent compiler cache during local development.
    turbopackFileSystemCacheForDev: false,
  },
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
