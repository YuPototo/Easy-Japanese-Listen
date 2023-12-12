/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
    },
    // allow image from localhost
    images: {
        domains: ['localhost', 'https://xjoipcfbmhsbhtcasxnk.supabase.co'],
    },
}

module.exports = nextConfig
