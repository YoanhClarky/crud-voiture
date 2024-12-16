// next.config.ts
import type { NextConfig } from "next"

const config: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb', // ou la limite que vous souhaitez
            allowedOrigins: ['*'] // ou les origines spécifiques que vous autorisez
        }
    }
}

export default config