import type { NextConfig } from "next";

const config: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
            allowedOrigins: ['*']
        }
    },
    swcMinify: false, // Désactive la minification de SWC
};

export default config;
