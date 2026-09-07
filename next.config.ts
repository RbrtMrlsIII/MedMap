import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
