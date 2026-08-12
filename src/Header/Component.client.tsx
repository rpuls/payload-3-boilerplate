'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

export const HeaderClient: React.FC = () => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setHeaderTheme(null)
    setMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="ti-header" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="ti-shell ti-header-inner">
        <Link className="ti-wordmark" href="/" aria-label="The Inspiration ana sayfa">
          THE<span>INSPIRATION</span>
        </Link>
        <nav className="ti-desktop-nav" aria-label="Ana navigasyon">
          <Link href="/#services">Hizmetler</Link>
          <Link href="/#work">İşler</Link>
          <Link href="/blog">İçgörüler</Link>
          <Link href="/get-a-quote">Teklif alın <ArrowUpRight size={14} /></Link>
        </nav>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          className="ti-menu-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`ti-mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <nav className="ti-shell" aria-label="Mobil navigasyon">
          <Link href="/#services">Hizmetler</Link>
          <Link href="/#work">Seçili işler</Link>
          <Link href="/#process">Çalışma biçimi</Link>
          <Link href="/blog">İçgörüler</Link>
          <Link href="/get-a-quote">Birlikte çalışalım <ArrowUpRight /></Link>
        </nav>
      </div>
    </header>
  )
}
