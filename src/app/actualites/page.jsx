export const dynamic = 'force-dynamic'

import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getActualites, getParametres } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/formatDate'

export const metadata = {
  title: 'Actualités',
  description: 'Toutes les actualités du Judo Club de Salm à Senones (Vosges) — résultats, événements, informations sur le judo, le pilates et le cardio-training.',
  alternates: { canonical: 'https://jcsalm.vercel.app/actualites' },
  openGraph: {
    title: 'Actualités — Judo Club de Salm',
    description: 'Actualités du Judo Club de Salm à Senones (Vosges).',
    url: 'https://jcsalm.vercel.app/actualites',
  },
}

export default async function ActualitesPage() {
  const [posts, parametres] = await Promise.all([
    getActualites().catch(() => []),
    getParametres().catch(() => null),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Actualités — Judo Club de Salm',
    url: 'https://jcsalm.vercel.app/actualites',
    publisher: {
      '@type': 'SportsClub',
      name: 'Judo Club de Salm',
      url: 'https://jcsalm.vercel.app',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil',     item: 'https://jcsalm.vercel.app' },
        { '@type': 'ListItem', position: 2, name: 'Actualités',  item: 'https://jcsalm.vercel.app/actualites' },
      ],
    },
    blogPost: posts.map(p => ({
      '@type': 'BlogPosting',
      headline: p.titre,
      datePublished: p.date,
      description: p.texte || '',
      url: 'https://jcsalm.vercel.app/actualites',
    })),
  }

  return (
    <main className="bg-zinc-950 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <section className="px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-7xl mx-auto">

          <p className="text-xs tracking-widest uppercase text-club-red mb-3">Judo Club de Salm</p>

          <div className="flex items-end justify-between gap-6 mb-16 border-b border-zinc-800/50 pb-10">
            <h1 className="font-display text-zinc-100 leading-none" style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>
              ACTUALITÉS
            </h1>
            <span className="text-xs tracking-widest uppercase text-zinc-600 pb-2 shrink-0">
              {posts.length} publication{posts.length > 1 ? 's' : ''}
            </span>
          </div>

          {posts.length === 0 ? (
            <p className="text-zinc-600 text-sm tracking-widest uppercase">Aucune publication pour le moment.</p>
          ) : (
            <div className="space-y-0">
              {posts.map((post, i) => {
                const hasPhoto = !!post.photo?.asset
                const isJudo = post.discipline === 'Judo'
                return (
                  <article
                    key={post._id}
                    className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-0 border-b border-zinc-800/50 py-10 group"
                  >
                    <div className="flex flex-col justify-between pr-0 md:pr-12">
                      <div className="flex items-center gap-4 mb-4">
                        {post.discipline && (
                          <span className={`text-xs tracking-widest uppercase ${isJudo ? 'text-club-red' : 'text-zinc-500'}`}>
                            {post.discipline}
                          </span>
                        )}
                        <span className="text-xs text-zinc-600">{formatDate(post.date)}</span>
                      </div>
                      <h2 className="font-display text-3xl lg:text-4xl text-zinc-100 leading-tight mb-4 group-hover:text-white transition-colors duration-200">
                        {post.titre}
                      </h2>
                      {post.texte && (
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-xl mb-6">
                          {post.texte}
                        </p>
                      )}
                      {post.lien_url && (
                        <a
                          href={post.lien_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="self-start flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-100 transition-colors duration-200 group/link"
                        >
                          <span className="w-8 h-px bg-zinc-600 group-hover/link:w-12 group-hover/link:bg-zinc-300 transition-all duration-300" />
                          {post.lien_label || 'En savoir plus'}
                        </a>
                      )}
                    </div>

                    {hasPhoto && (
                      <div className="relative overflow-hidden mt-6 md:mt-0" style={{ height: '200px' }}>
                        <Image
                          src={urlFor(post.photo.asset).width(640).url()}
                          alt={post.titre}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          )}

        </div>
      </section>

      <Footer parametres={parametres} />
    </main>
  )
}
