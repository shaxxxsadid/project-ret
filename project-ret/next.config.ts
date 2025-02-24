import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ['picsum.photos', "lh3.googleusercontent.com"],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
            
        ],
    },
};

export default nextConfig;
