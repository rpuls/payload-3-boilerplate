import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const SOURCE = 'https://prix-studio.com/sitemap.xml'
const OUTPUT = resolve('src/content/prix-page-catalog.generated.ts')
const DATA_OUTPUT = resolve('src/content/prix-page-catalog.generated.json')

const response = await fetch(SOURCE)
if (!response.ok) throw new Error(`Sitemap could not be fetched: ${response.status}`)

const xml = await response.text()
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim())

const entityMap = { amp: '&', apos: "'", gt: '>', lt: '<', nbsp: ' ', quot: '"', '#x27': "'", '#39': "'" }
const cleanText = (value = '') => value
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, key) => {
    const normalized = key.toLowerCase()
    if (entityMap[normalized]) return entityMap[normalized]
    if (normalized.startsWith('#x')) return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16))
    if (normalized.startsWith('#')) return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10))
    return entity
  })
  .replace(/\s+/g, ' ')
  .trim()

const adaptBrand = (value = '') => value
  .replace(/Prix Studio'nun/gi, "The Inspiration'ın")
  .replace(/Prix Studio ile/gi, 'The Inspiration ile')
  .replace(/Prix Studio/gi, 'The Inspiration')
  .replace(/Prix'in/gi, "The Inspiration'ın")
  .replace(/Prix'i/gi, "The Inspiration'ı")
  .replace(/Prix/gi, 'The Inspiration')

const ignoredHeadings = new Set([
  'Reklam & SEO', 'Web Tasarım', 'Referanslar', 'Fiyatlar', 'Araçlar',
  'Blog', 'İletişim', 'Hizmetler', 'Bir sonraki büyüme hamlenizi birlikte tasarlayalım.',
  'Bültene Katıl', 'Faydalı Kaynaklar - Blog', 'Sık Sorulan Sorular',
])

const extractContent = (html) => {
  const rawHeadings = [...html.matchAll(/<(h[1-3])[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => ({ level: Number(match[1].slice(1)), heading: cleanText(match[2]) }))
    .filter(({ heading }) => heading.length > 2 && heading.length < 180 && !ignoredHeadings.has(heading))

  const seenHeadings = new Set()
  const headings = rawHeadings.filter(({ heading }) => {
    const key = heading.toLocaleLowerCase('tr-TR')
    if (seenHeadings.has(key)) return false
    seenHeadings.add(key)
    return true
  })

  const hero = headings.find(({ level }) => level === 1)?.heading
  const sections = headings
    .filter(({ heading }) => heading !== hero)
    .map(({ heading, level }) => ({ heading: adaptBrand(heading), level }))

  return { hero: adaptBrand(hero), sections }
}

async function mapConcurrent(values, concurrency, mapper) {
  const results = new Array(values.length)
  let cursor = 0
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (cursor < values.length) {
      const index = cursor++
      results[index] = await mapper(values[index], index)
    }
  }))
  return results
}

const kindFor = (path) => {
  if (path === '/') return 'home'
  if (path.startsWith('/blog/')) return 'blog'
  if (path.startsWith('/case-study/')) return 'case-study'
  if (path.startsWith('/glossary/')) return 'glossary'
  if (path.startsWith('/prix-tools/')) return 'tool'
  if (path.startsWith('/web-site-ornekleri/')) return 'example'
  if (path.startsWith('/seo-agencies/')) return 'location'
  return 'landing'
}

const words = {
  ai: 'AI', aeo: 'AEO', api: 'API', b2b: 'B2B', b2c: 'B2C', cms: 'CMS', crm: 'CRM', cro: 'CRO', css: 'CSS',
  geo: 'GEO', html: 'HTML', kdv: 'KDV', kvkk: 'KVKK', ppc: 'PPC', qr: 'QR', roi: 'ROI', saas: 'SaaS', seo: 'SEO', serp: 'SERP', ui: 'UI', ux: 'UX',
  shopify: 'Shopify', tiktok: 'TikTok', webflow: 'Webflow', wordpress: 'WordPress',
  woocommerce: 'WooCommerce', youtube: 'YouTube', google: 'Google', instagram: 'Instagram',
  linkedin: 'LinkedIn', meta: 'Meta', ecommerce: 'E-ticaret', eticaret: 'E-ticaret', website: 'Web Sitesi', web: 'Web',
  ajansi: 'Ajansı', araci: 'Aracı', cozumu: 'Çözümü', danismanligi: 'Danışmanlığı', fiyatlari: 'Fiyatları',
  hizmeti: 'Hizmeti', hizmetleri: 'Hizmetleri', icin: 'İçin', nasil: 'Nasıl', ornekleri: 'Örnekleri',
  rehberi: 'Rehberi', sirketi: 'Şirketi', sirketleri: 'Şirketleri', tasarim: 'Tasarım', tasarimi: 'Tasarımı',
}

const titleFor = (slug) => slug
  .split('-')
  .filter(Boolean)
  .map((word) => words[word] ?? `${word.charAt(0).toLocaleUpperCase('tr-TR')}${word.slice(1)}`)
  .join(' ')

const seen = new Set()
const baseEntries = urls
  .map((value) => {
    const url = new URL(value)
    const path = decodeURI(url.pathname).replace(/\/$/, '') || '/'
    const slug = path.split('/').filter(Boolean).at(-1) ?? 'home'
    return { path, slug, kind: kindFor(path), title: path === '/' ? 'The Inspiration' : titleFor(slug) }
  })
  .filter((entry) => !seen.has(entry.path) && seen.add(entry.path))
  .sort((a, b) => a.path.localeCompare(b.path, 'tr'))

let completed = 0
const entries = await mapConcurrent(baseEntries, 8, async (entry) => {
  if (entry.path === '/') return { ...entry, sourceURL: SOURCE.replace('/sitemap.xml', ''), sections: [] }
  try {
    const pageResponse = await fetch(new URL(entry.path, SOURCE), { signal: AbortSignal.timeout(20000) })
    if (!pageResponse.ok) throw new Error(String(pageResponse.status))
    const content = extractContent(await pageResponse.text())
    completed += 1
    if (completed % 40 === 0) console.log(`Extracted ${completed}/${baseEntries.length - 1} pages`)
    return {
      ...entry,
      title: content.hero || entry.title,
      sourceURL: new URL(entry.path, SOURCE).href,
      sections: content.sections,
    }
  } catch (error) {
    console.warn(`Could not extract ${entry.path}: ${error.message}`)
    return { ...entry, sourceURL: new URL(entry.path, SOURCE).href, sections: [] }
  }
})

const source = `// Generated by scripts/sync-prix-pages.mjs. Do not edit manually.\n` +
  `import catalogData from './prix-page-catalog.generated.json'\n\n` +
  `export type CatalogPageKind = 'home' | 'landing' | 'blog' | 'case-study' | 'glossary' | 'tool' | 'example' | 'location'\n\n` +
  `export type CatalogSection = { heading: string; level: number }\n\n` +
  `export type CatalogPage = { path: string; slug: string; kind: CatalogPageKind; title: string; sourceURL: string; sections: CatalogSection[] }\n\n` +
  `export const prixPageCatalog = catalogData as CatalogPage[]\n\n` +
  `export const prixPageByPath = new Map(prixPageCatalog.map((page) => [page.path, page]))\n`

await mkdir(dirname(OUTPUT), { recursive: true })
await writeFile(DATA_OUTPUT, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')
await writeFile(OUTPUT, source, 'utf8')

const counts = Object.groupBy(entries, (entry) => entry.kind)
console.log(`Wrote ${entries.length} routes to ${OUTPUT}`)
console.log(Object.fromEntries(Object.entries(counts).map(([kind, pages]) => [kind, pages.length])))
