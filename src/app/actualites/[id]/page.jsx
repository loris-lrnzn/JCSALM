export const dynamic = 'force-dynamic'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getActualiteById, getParametres } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/formatDate'

export default async function ActualitePage({ params }) {
  const [post, parametres] = await Promise.all([
    getActualiteById(params.id).catch(() => null),
    getParametres().catch(() => null),
  ])

  if (!post) notFound()

  const isJudo = post.discipline === 'Judo'

  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />

      <article className="px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-3xl mx-auto">

          <Link
            href="/actualites"
            className="inline-block text-xs tracking-widest uppercase text-zinc-600 hover:text-zinc-400 transition-colors duration-200 mb-10"
          >
            ← Actualités
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              {post.discipline && (
                <span className={`text-xs tracking-widest uppercase ${isJudo ? 'text-club-red' : 'text-zinc-500'}`}>
                  {post.discipline}
                </span>
              )}
              <span className="text-xs text-zinc-600 tracking-wide">{formatDate(post.date)}</span>
            </div>
            <h1 className="font-display text-zinc-100 leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}>
              {post.titre}
            </h1>
          </div>

          {/* Photo */}
          {post.photo?.asset && (
            <div className="relative w-full overflow-hidden mb-10" style={{ height: 'clamp(220px, 45vw, 480px)' }}>
              <Image
                src={urlFor(post.photo.asset).width(1200).url()}
                alt={post.titre}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Texte */}
          {post.texte && (
            <div className="border-t border-zinc-800 pt-10 mb-10">
              <p className="text-zinc-300 leading-relaxed text-base whitespace-pre-line">
                {post.texte}
              </p>
            </div>
          )}

          {/* Lien externe */}
          {post.lien_url && (
            <a
              href={post.lien_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-100 transition-colors duration-200 group"
            >
              <span className="w-8 h-px bg-zinc-600 group-hover:w-12 group-hover:bg-zinc-300 transition-all duration-300" />
              {post.lien_label || 'En savoir plus'}
            </a>
          )}

        </div>
      </article>

      <Footer parametres={parametres} />
    </main>
  )
}
