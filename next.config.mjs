/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options',      value: 'nosniff' },
  { key: 'X-Frame-Options',             value: 'DENY' },
  { key: 'Referrer-Policy',             value: 'strict-origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://cdn.sanity.io",
      "connect-src 'self' https://*.sanity.io https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
]

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}
export default nextConfig
