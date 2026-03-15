import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@sala-funcionando/ui",
    "@sala-funcionando/domain",
    "@sala-funcionando/application",
    "@sala-funcionando/infrastructure",
    "@sala-funcionando/database",
    "@sala-funcionando/shared"
  ],
};

export default nextConfig;
