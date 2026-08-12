import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['person', 'company', 'isDemo', 'updatedAt'],
    useAsTitle: 'person',
  },
  fields: [
    { name: 'person', type: 'text', required: true },
    { name: 'role', type: 'text' },
    { name: 'company', type: 'text', required: true },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    {
      name: 'isDemo',
      type: 'checkbox',
      defaultValue: true,
      label: 'Kurgusal örnek içerik',
      admin: { description: 'Gerçek müşteri onayı olmadan bu işareti kaldırmayın.' },
    },
  ],
}
