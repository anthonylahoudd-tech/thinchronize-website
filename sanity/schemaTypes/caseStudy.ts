import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Identity', value: 'brand-identity' },
          { title: 'Brand Strategy', value: 'brand-strategy' },
          { title: 'Visual Identity', value: 'visual-identity' },
          { title: 'Brand System', value: 'brand-system' },
          { title: 'Brand Activation', value: 'brand-activation' },
        ],
      },
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),
    defineField({
      name: 'tagline',
      title: 'Short Tagline',
      type: 'string',
      description: 'One-line project description shown on cards',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (Full Width)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'overview',
      title: 'Project Overview',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services Delivered',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Year, Newest First',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
    },
  },
})
