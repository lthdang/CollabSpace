import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    output: 'standalone', // Required for Docker deployment
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    // Enable React strict mode for better development experience
    reactStrictMode: true,
};

export default nextConfig;
