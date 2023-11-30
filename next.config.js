/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    // allow image from localhost
    images: {
        domains: ['localhost'],
    },
}

module.exports = nextConfig
