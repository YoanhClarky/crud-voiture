import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Comme dans votre configuration précédente
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['*']
    }
  },
  serverRuntimeConfig: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
}

export default config;

