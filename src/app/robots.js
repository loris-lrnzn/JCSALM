const BASE_URL = 'https://jcsalm.vercel.app'

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
