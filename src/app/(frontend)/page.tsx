import type { Metadata } from 'next'

import { AgencyHome } from '@/components/TheInspiration/AgencyHome'

export const metadata: Metadata = {
  title: 'The Inspiration — Marka, Dijital Deneyim ve Büyüme Stüdyosu',
  description:
    'The Inspiration; marka stratejisi, web tasarım, teknoloji, SEO ve performans pazarlamasını bir araya getiren bağımsız yaratıcı stüdyo.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'The Inspiration — Fikirlere şekil, markalara hareket.',
    description: 'Hatırlanan markalar ve dönüşüm yaratan dijital deneyimler tasarlıyoruz.',
    type: 'website',
  },
}

export default function HomePage() {
  return <AgencyHome />
}
