import type { CollectionConfig } from "payload/types"

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
      name: "page_title",
      type: "text",
      required: true,
      label: "Page Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Slug",
      admin: {
        description: 'URL-friendly version (e.g., "discover", "strategize", "deliver")',
      },
    },
    {
      name: "meta",
      type: "group",
      label: "Meta Information",
      fields: [
        {
          name: "description",
          type: "textarea",
          required: true,
          label: "SEO Description",
        },
        {
          name: "keywords",
          type: "textarea",
          label: "SEO Keywords",
          admin: {
            description: "Comma-separated keywords",
          },
        },
      ],
    },
    {
      name: "hero",
      type: "group",
      label: "Hero Section",
      fields: [
        {
          name: "headline",
          type: "textarea",
          required: true,
          label: "Headline",
        },
        {
          name: "subheadline",
          type: "textarea",
          required: true,
          label: "Subheadline",
        },
        {
          name: "supporting_text",
          type: "textarea",
          required: true,
          label: "Supporting Text",
        },
        {
          name: "primary_cta",
          type: "group",
          label: "Primary CTA",
          fields: [
            { name: "text", type: "text", required: true },
            { name: "url", type: "text", required: true },
          ],
        },
        {
          name: "secondary_cta",
          type: "group",
          label: "Secondary CTA",
          fields: [
            { name: "text", type: "text", required: true },
            { name: "url", type: "text", required: true },
          ],
        },
        {
          name: "hero_image",
          type: "group",
          label: "Hero Image",
          fields: [
            { name: "url", type: "text", required: true },
            { name: "alt", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "problem",
      type: "group",
      label: "Problem Section",
      fields: [
        { name: "headline", type: "textarea", required: true },
        { name: "subheadline", type: "textarea", required: true },
        {
          name: "pain_points",
          type: "array",
          label: "Pain Points",
          fields: [
            { name: "icon", type: "text", required: true, admin: { description: "Emoji or icon" } },
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "solution",
      type: "group",
      label: "Solution Section",
      fields: [
        { name: "headline", type: "textarea", required: true },
        { name: "subheadline", type: "textarea", required: true },
        {
          name: "features",
          type: "array",
          label: "Features",
          fields: [
            { name: "icon", type: "text", required: true },
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "capability_workflow",
      type: "group",
      label: "Capability Workflow",
      fields: [
        { name: "headline", type: "textarea", required: true },
        { name: "subheadline", type: "textarea", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "steps",
          type: "array",
          label: "Workflow Steps",
          fields: [
            { name: "step", type: "number", required: true },
            { name: "feature", type: "text", required: true },
            { name: "icon", type: "text", required: true },
            { name: "title", type: "textarea", required: true },
            { name: "description", type: "textarea", required: true },
            {
              name: "what_you_create",
              type: "array",
              label: "What You Create",
              fields: [{ name: "item", type: "text" }],
            },
            {
              name: "capabilities",
              type: "array",
              label: "Capabilities",
              fields: [{ name: "capability", type: "text" }],
            },
            { name: "outcome", type: "textarea", required: true },
            { name: "next_step", type: "textarea" },
            { name: "continuous_loop", type: "textarea" },
          ],
        },
      ],
    },
    {
      name: "features_included",
      type: "group",
      label: "Features Included",
      fields: [
        { name: "headline", type: "text", required: true },
        { name: "subheadline", type: "text", required: true },
        {
          name: "features",
          type: "array",
          label: "Features",
          fields: [
            { name: "name", type: "text", required: true },
            { name: "icon", type: "text", required: true },
            { name: "tagline", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            { name: "key_capabilities", type: "array", fields: [{ name: "capability", type: "text" }] },
            { name: "business_value", type: "textarea", required: true },
            { name: "integration", type: "textarea", required: true },
            { name: "learn_more_url", type: "text" },
          ],
        },
      ],
    },
    {
      name: "integration_magic",
      type: "group",
      label: "Integration Magic",
      fields: [
        { name: "headline", type: "text", required: true },
        { name: "subheadline", type: "text", required: true },
        {
          name: "integrations",
          type: "array",
          label: "Integrations",
          fields: [
            { name: "from", type: "text", required: true },
            { name: "to", type: "text", required: true },
            { name: "icon", type: "text", required: true },
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            { name: "benefit", type: "textarea", required: true },
            { name: "technical_detail", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "use_cases",
      type: "group",
      label: "Use Cases",
      fields: [
        { name: "headline", type: "textarea", required: true },
        {
          name: "cases",
          type: "array",
          label: "Cases",
          fields: [
            { name: "title", type: "textarea", required: true },
            { name: "subtitle", type: "text", required: true },
            { name: "company_size", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            { name: "workflow", type: "array", fields: [{ name: "step", type: "text" }] },
            {
              name: "metrics",
              type: "array",
              fields: [
                { name: "label", type: "text" },
                { name: "value", type: "text" },
              ],
            },
            { name: "outcome", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      label: "Published Date",
      admin: {
        position: "sidebar",
      },
    },
  ],
}
