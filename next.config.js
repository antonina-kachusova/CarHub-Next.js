/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.imagin.studio',
                pathname: '/getimage/**',
            },
        ],
    },
}

module.exports = nextConfig
