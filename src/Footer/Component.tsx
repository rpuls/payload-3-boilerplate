import Link from 'next/link'
import React from 'react'

export async function Footer() {
  return (
    <footer className="ti-footer">
      <div className="ti-shell">
        <div className="ti-footer-top">
          <Link className="ti-wordmark ti-wordmark-footer" href="/">THE<span>INSPIRATION</span></Link>
          <p>Independent creative studio<br />İstanbul — Worldwide</p>
        </div>
        <div className="ti-footer-links">
          <div><span>Keşfet</span><Link href="/#services">Hizmetler</Link><Link href="/#work">İşler</Link><Link href="/blog">İçgörüler</Link></div>
          <div><span>Konuşalım</span><Link href="/get-a-quote">Teklif alın</Link><a href="mailto:hello@theinspiration.studio">hello@theinspiration.studio</a></div>
          <div><span>Sosyal</span><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">Behance</a></div>
        </div>
        <div className="ti-footer-bottom">
          <span>© {new Date().getFullYear()} The Inspiration</span>
          <span>Made with intent, not templates.</span>
          <Link href="/kvkk-gizlilik-politikasi">Gizlilik</Link>
        </div>
      </div>
    </footer>
  )
}
