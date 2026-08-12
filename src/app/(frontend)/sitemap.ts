import type { MetadataRoute } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getServerSideURL } from '@/utilities/getURL'
import { prixPageCatalog } from '@/content/prix-page-catalog.generated'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = getServerSideURL()
  const entries: MetadataRoute.Sitemap = prixPageCatalog.map((page) => ({
    url: `${baseURL}${page.path === '/' ? '' : page.path}`,
    changeFrequency: page.kind === 'blog' || page.kind === 'glossary' ? 'monthly' : 'weekly',
    priority: page.path === '/' ? 1 : page.kind === 'landing' ? 0.9 : 0.75,
  }))
  const knownURLs = new Set(entries.map((entry) => entry.url))

  try {
    const payload = await getPayload({ config: configPromise })
    const [pages, posts, caseStudies] = await Promise.all([
      payload.find({ collection: 'pages', draft: false, limit: 1000, pagination: false }),
      payload.find({ collection: 'posts', draft: false, limit: 1000, pagination: false }),
      payload.find({ collection: 'case-studies', draft: false, limit: 1000, pagination: false }),
    ])

    pages.docs.forEach((page) => {
      if ((!page.slug && !page.path) || page.slug === 'home') return
      const url = `${baseURL}${page.path || `/${page.slug}`}`
      if (knownURLs.has(url)) return
      entries.push({
        url,
        lastModified: page.updatedAt,
        changeFrequency: page.pageType === 'tool' ? 'monthly' : 'weekly',
        priority: page.pageType === 'service' ? 0.9 : 0.75,
      })
    })

    posts.docs.forEach((post) => {
      if (!post.slug) return
      entries.push({ url: `${baseURL}/posts/${post.slug}`, lastModified: post.updatedAt, changeFrequency: 'monthly', priority: 0.7 })
    })

    caseStudies.docs.forEach((study) => {
      if (!study.slug) return
      entries.push({ url: `${baseURL}/case-study/${study.slug}`, lastModified: study.updatedAt, changeFrequency: 'monthly', priority: 0.8 })
    })
  } catch {
    // Keep the home entry available before the production database is initialized.
  }

  return entries
}
