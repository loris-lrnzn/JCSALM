import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'
import { formatDate } from '@/lib/formatDate'

function DisciplineTag({ discipline }) {
  if (!discipline) return null
  const isJudo = discipline === 'Judo'
  return (
    <span className={`text-xs tracking-widest uppercase ${isJudo ? 'text-club-red' : 'text-zinc-500'}`}>
      {discipline}
    </span>
  )
}

function FeaturedPost({ post }) {
  const hasPhoto = !!post.photo?.asset
  return (
    <Link href={`/actualites/${post._id}`} className="block">
    <article className="grid grid-cols-1 lg:grid-cols-2 border-b border-zinc-800 pb-0 mb-0 group cursor-pointer">
      {/* Texte */}
      <div className="flex flex-col justify-between py-10 pr-0 lg:pr-16 order-2 lg:order-1">
        <div className="flex items-center gap-4 mb-6">
          <DisciplineTag discipline={post.discipline} />
          {post.discipline && <span className="text-zinc-800">·</span>}
          <span className="text-xs text-zinc-600 tracking-wide">{formatDate(post.date)}</span>
        </div>

        <div className="flex-1">
          <h3 className="font-display text-4xl lg:text-5xl text-zinc-100 leading-none mb-6 group-hover:text-white transition-colors duration-300">
            {post.titre}
          </h3>
          {post.texte && (
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 max-w-md">
              {post.texte}
            </p>
          )}
        </div>

        <span className="mt-8 self-start flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-600 group-hover:text-zinc-300 transition-all duration-300">
          <span className="w-6 h-px bg-zinc-700 group-hover:w-10 group-hover:bg-zinc-400 transition-all duration-300" />
          Lire la suite
        </span>
      </div>

      {/* Photo ou placeholder */}
      <div className="relative order-1 lg:order-2 overflow-hidden" style={{ minHeight: 'clamp(200px, 45vw, 340px)' }}>
        {hasPhoto ? (
          <>
            <Image
              src={urlFor(post.photo.asset).width(800).url()}
              alt={post.titre}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-transparent lg:block hidden" />
          </>
        ) : (
          <div className="absolute inset-0 bg-zinc-900/40 border border-zinc-800/40 flex items-center justify-center">
            <span className="font-display text-7xl text-zinc-800 select-none">JCS</span>
          </div>
        )}
      </div>
    </article>
    </Link>
  )
}

function CompactPost({ post }) {
  return (
    <Link href={`/actualites/${post._id}`} className="block">
    <article className="py-5 border-b border-zinc-800/50 group hover:border-zinc-700 transition-colors duration-200 cursor-pointer">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-xs text-zinc-600 tracking-wide tabular-nums">{formatDate(post.date)}</span>
        <DisciplineTag discipline={post.discipline} />
      </div>
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl text-zinc-300 leading-tight group-hover:text-zinc-100 transition-colors duration-200">
          {post.titre}
        </h3>
        <span className="text-zinc-700 group-hover:text-zinc-400 transition-colors duration-200 shrink-0 text-sm">→</span>
      </div>
    </article>
    </Link>
  )
}

export default function Actualites({ posts = [], total = 0, facebook = null }) {
  if (!posts.length) return null

  const [featured, ...rest] = posts

  return (
    <section id="actualites" className="bg-zinc-950 py-14 md:py-24 px-6 lg:px-8 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-club-red mb-3">03</p>
            <h2 className="font-display text-5xl lg:text-6xl text-zinc-100 leading-none">ACTUALITÉS</h2>
          </div>
          <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block pb-1">
            {total} publication{total > 1 ? 's' : ''}
          </span>
        </div>

        <FeaturedPost post={featured} />

        {rest.length > 0 && (
          <div className="mt-0">
            {rest.map((post) => (
              <CompactPost key={post._id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-zinc-800/50 flex flex-wrap items-center gap-4 justify-between">
          <a
            href="/actualites"
            className="flex items-center gap-3 text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-100 transition-colors duration-200 group"
          >
            <span className="w-6 h-px bg-zinc-700 group-hover:w-10 group-hover:bg-zinc-400 transition-all duration-300" />
            Toutes les actualités {total > 0 && `(${total})`}
          </a>
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 border border-zinc-600 text-zinc-300 text-xs tracking-widest uppercase hover:border-zinc-100 hover:text-zinc-100 transition-colors duration-200"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
              Nous suivre sur Facebook
            </a>
          )}
        </div>

      </div>
    </section>
  )
}
