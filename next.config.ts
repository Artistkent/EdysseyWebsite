import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'export',
   images: {
    unoptimized: true, // REQUIRED if you're using `next/image`
  },
};

export default nextConfig;
