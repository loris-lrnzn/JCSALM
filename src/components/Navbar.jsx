'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

const DISCIPLINES = [
  { label: 'Judo',            href: '/disciplines/judo'           },
  { label: 'Pilates',         href: '/disciplines/pilates'        },
  { label: 'Cardio-Training', href: '/disciplines/cardio-training'},
]

export default function Navbar() {
  const [open, setOpen]               = useState(false)
  const [dropOpen, setDropOpen]       = useState(false)
  const [mobileDiscOpen, setMobileDiscOpen] = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const pathname                      = usePathname()
  const isHome                        = pathname === '/'
  const isDiscipline                  = pathname.startsWith('/disciplines/')

  const anchorHref = (anchor) => (isHome || isDiscipline) ? `#${anchor}` : `/#${anchor}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/95 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo + name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 shrink-0">
              <Image src="/logo.png" alt="SALM Judo Club" fill sizes="56px" className="object-contain" />
            </div>
            <span className="font-display text-zinc-100 text-xl tracking-wider hidden sm:block">
              Judo Club de Salm
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-10">

            {/* Accueil — uniquement sur les pages secondaires */}
            {!isHome && (
              <Link href="/" className="text-xs tracking-widest uppercase text-zinc-100 hover:text-club-red transition-colors duration-200">
                Accueil
              </Link>
            )}

            {/* Disciplines dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropOpen(true)}
              onMouseLeave={() => setDropOpen(false)}
            >
              <button className="flex items-center gap-1 text-xs tracking-widest uppercase text-zinc-100 hover:text-club-red transition-colors duration-200">
                Disciplines
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${dropOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {dropOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-44 pt-2">
                  <div className="bg-zinc-900/95 backdrop-blur-sm border border-zinc-800">
                    {DISCIPLINES.map(({ label, href }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center justify-between px-4 py-3 text-xs tracking-widest uppercase text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border-b border-zinc-800 last:border-0 transition-colors duration-150"
                      >
                        {label}
                        <span className="text-zinc-700">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a href={anchorHref('horaires')} className="text-xs tracking-widest uppercase text-zinc-100 hover:text-club-red transition-colors duration-200">
              Horaires
            </a>
            <a href={anchorHref('tarifs')} className="text-xs tracking-widest uppercase text-zinc-100 hover:text-club-red transition-colors duration-200">
              Tarifs
            </a>
            <a href={anchorHref('contact')} className="text-xs tracking-widest uppercase text-zinc-100 hover:text-club-red transition-colors duration-200">
              Contact
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-zinc-500 hover:text-zinc-100 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800">

          {/* Accueil — uniquement sur les pages secondaires */}
          {!isHome && (
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase text-zinc-400 hover:text-club-red border-b border-zinc-800 transition-colors duration-200"
            >
              Accueil
              <span className="text-zinc-700">→</span>
            </Link>
          )}

          {/* Disciplines avec sous-menu */}
          <div>
            <button
              onClick={() => setMobileDiscOpen(!mobileDiscOpen)}
              className="w-full flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase text-zinc-400 hover:text-club-red border-b border-zinc-800 transition-colors duration-200"
            >
              Disciplines
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${mobileDiscOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileDiscOpen && (
              <div className="bg-zinc-800/40">
                {DISCIPLINES.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between pl-10 pr-6 py-3 text-xs tracking-widest uppercase text-zinc-500 hover:text-zinc-100 border-b border-zinc-800/60 last:border-0 transition-colors duration-200"
                  >
                    {label}
                    <span className="text-zinc-700">→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href={anchorHref('horaires')}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase text-zinc-400 hover:text-club-red border-b border-zinc-800 transition-colors duration-200"
          >
            Horaires
            <span className="text-zinc-700">→</span>
          </a>
          <a
            href={anchorHref('tarifs')}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase text-zinc-400 hover:text-club-red border-b border-zinc-800 transition-colors duration-200"
          >
            Tarifs
            <span className="text-zinc-700">→</span>
          </a>
          <a
            href={anchorHref('contact')}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between px-6 py-4 text-xs tracking-widest uppercase text-zinc-400 hover:text-club-red transition-colors duration-200"
          >
            Contact
            <span className="text-zinc-700">→</span>
          </a>
        </div>
      )}
    </header>
  )
}
