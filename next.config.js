/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    images: {
        domains: ['localhost', 'xjoipcfbmhsbhtcasxnk.supabase.co'],
    },
}

module.exports = nextConfig
