import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
