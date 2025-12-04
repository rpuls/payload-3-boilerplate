import type { CollectionConfig } from "payload"

export const Capabilities: CollectionConfig = {
  slug: "capabilities",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly version (e.g., discover, strategize)",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          admin: { description: "Small text above title" },
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "primaryCta",
          type: "group",
          fields: [
            { name: "text", type: "text", required: true },
            { name: "url", type: "text", required: true },
          ],
        },
        {
          name: "secondaryCta",
          type: "group",
          fields: [
            { name: "text", type: "text", required: true },
            { name: "url", type: "text", required: true },
          ],
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "problem",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "painPoints",
          type: "array",
          fields: [{ name: "text", type: "text", required: true }],
        },
      ],
    },
    {
      name: "solution",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "features",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "text", required: true },
            { name: "icon", type: "text", admin: { description: "Icon name or emoji" } },
          ],
        },
      ],
    },
    {
      name: "workflow",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "steps",
          type: "array",
          fields: [
            { name: "number", type: "number", required: true },
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "featuresIncluded",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "keyCapabilities",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "text", required: true },
            { name: "icon", type: "text" },
          ],
        },
      ],
    },
    {
      name: "integrationMagic",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "integrations",
          type: "array",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "description", type: "text", required: true },
            { name: "logo", type: "upload", relationTo: "media" },
          ],
        },
      ],
    },
    {
      name: "useCases",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "cases",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            { name: "persona", type: "text", required: true },
            {
              name: "metrics",
              type: "array",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "value", type: "text", required: true },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "cta",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "buttonText", type: "text", required: true },
        { name: "buttonUrl", type: "text", required: true },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
}
