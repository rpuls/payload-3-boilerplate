import type { Metadata } from 'next'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { AgencyCatalogPage } from '@/components/TheInspiration/AgencyCatalogPage'
import { prixPageByPath, prixPageCatalog } from '@/content/prix-page-catalog.generated'
import { getCatalogDescription } from '@/content/adaptCatalogContent'
import { RenderHero } from '@/heros/RenderHero'
import type { Page as PageType } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

type Args = { params: Promise<{ slug: string[] }> }

export function generateStaticParams() {
  return prixPageCatalog
    .filter((page) => page.path !== '/')
    .map((page) => ({ slug: page.path.slice(1).split('/') }))
}

export default async function Page({ params }: Args) {
  const { slug } = await params
  const path = `/${slug.join('/')}`
  const catalogPage = prixPageByPath.get(path)

  if (catalogPage) return <AgencyCatalogPage page={catalogPage} />

  const cmsPage = await queryPage(path, slug.at(-1) ?? '')
  if (!cmsPage) notFound()

  return <article className="pt-16 pb-24"><RenderHero {...cmsPage.hero} /><RenderBlocks blocks={cmsPage.layout} /></article>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const path = `/${slug.join('/')}`
  const page = prixPageByPath.get(path)
  if (!page) return { title: 'The Inspiration' }

  const label = page.kind === 'blog' ? 'Stüdyo Notları' : page.kind === 'case-study' ? 'Vaka Çalışması' : 'The Inspiration'
  const description = getCatalogDescription(page)
  const seoTitle = page.title.length > 58 ? `${page.title.slice(0, 55).trim()}…` : page.title

  return {
    title: `${seoTitle} | ${label}`,
    description,
    alternates: { canonical: path },
    openGraph: { title: page.title, description, type: page.kind === 'blog' ? 'article' : 'website', url: path },
  }
}

const queryPage = cache(async (path: string, slug: string): Promise<PageType | null> => {
  try {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages', draft, limit: 1, pagination: false, overrideAccess: draft,
      where: { or: [{ path: { equals: path } }, { slug: { equals: slug } }] },
    })
    return result.docs[0] ?? null
  } catch {
    return null
  }
})
