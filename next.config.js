/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    // allow image from localhost
    images: {
        domains: ['localhost', 'https://jlpt-2023.vercel.app'],
    },
}

module.exports = nextConfig
