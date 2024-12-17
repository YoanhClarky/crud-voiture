import type { NextConfig } from "next";

const config: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['*']
    }
  },
  swcMinify: false, // Désactive la minification de SWC
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ne pas inclure ces modules côté client
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  // Assurez-vous que NextAuth.js peut être résolu correctement
  transpilePackages: ['next-auth'],
};

export default config;

