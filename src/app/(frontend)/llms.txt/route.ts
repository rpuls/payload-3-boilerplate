import { getServerSideURL } from '@/utilities/getURL'

export function GET() {
  const baseURL = getServerSideURL()
  const content = `# The Inspiration

> Marka stratejisi, dijital deneyim, SEO ve performans pazarlaması alanlarında çalışan bağımsız yaratıcı stüdyo.

## Temel sayfalar
- [Ana sayfa](${baseURL})
- [Hizmetler](${baseURL}/#services)
- [Seçili işler](${baseURL}/#work)
- [Blog](${baseURL}/blog)
- [Teklif alın](${baseURL}/get-a-quote)

## İçerik politikası
The Inspiration uzmanlık içerikleri açık başlıklar, kaynak gösterimi ve güncel yayın tarihleriyle hazırlanır.
Demo müşteri, proje ve sonuç verileri açıkça kurgusal olarak etiketlenir.
`

  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
