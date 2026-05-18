const BASE_URL = 'https://jcsalm.vercel.app'

export default function sitemap() {
  return [
    { url: BASE_URL,                                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/actualites`,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/disciplines/judo`,              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/disciplines/pilates`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/disciplines/cardio-training`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
