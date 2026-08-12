import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { LogoCloudGrid } from '../../blocks/LogoCloudGrid/config'
import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { getServerSideURL } from '@/utilities/getURL'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pagess'>
  defaultPopulate: {
    title: true,
    slug: true,
    path: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
        })

        return `${getServerSideURL()}${path}`
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
      })

      return `${getServerSideURL()}${path}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'pageType',
      type: 'select',
      defaultValue: 'landing',
      required: true,
      options: [
        { label: 'Ana sayfa', value: 'home' },
        { label: 'Hizmet', value: 'service' },
        { label: 'Sektör', value: 'industry' },
        { label: 'Teknoloji', value: 'technology' },
        { label: 'Lokasyon', value: 'location' },
        { label: 'Fiyatlandırma', value: 'pricing' },
        { label: 'Araç', value: 'tool' },
        { label: 'Genel landing page', value: 'landing' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'path',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'İç içe sayfalar için tam adres. Örnek: /blog/marka-stratejisi',
      },
    },
    {
      name: 'seoStrategy',
      type: 'group',
      label: 'SEO İçerik Stratejisi',
      fields: [
        { name: 'primaryKeyword', type: 'text', label: 'Birincil anahtar kelime' },
        { name: 'searchIntent', type: 'select', options: ['informational', 'commercial', 'transactional', 'local'] },
        {
          name: 'schemaType',
          type: 'select',
          defaultValue: 'WebPage',
          options: ['WebPage', 'Service', 'Article', 'FAQPage', 'LocalBusiness', 'SoftwareApplication'],
        },
        {
          name: 'relatedPages',
          type: 'relationship',
          relationTo: 'pages',
          hasMany: true,
          admin: { description: 'İç bağlantı kümesinde gösterilecek ilgili sayfalar.' },
        },
        {
          name: 'faqs',
          type: 'array',
          label: 'Sık sorulan sorular',
          fields: [
            { name: 'question', type: 'text', required: true },
            { name: 'answer', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock, LogoCloudGrid],
              required: true,
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
