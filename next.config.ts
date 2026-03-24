import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: workspaceRoot,
  },
  async redirects() {
    return [
      {
        source: "/about-3",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
