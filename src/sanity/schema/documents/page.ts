import { defineType, defineField } from 'sanity';

import { CgWebsite } from 'react-icons/cg';
import { blocks } from '../blocks';

export default defineType({
  type: 'document',
  title: 'Page',
  name: 'page',
  icon: CgWebsite,
  groups: [
    { title: 'Main', name: 'main', default: true },
    { title: 'SEO', name: 'seo' },
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Main blocks',
      name: 'mainBlocks',
      type: 'array',
      of: blocks,
      group: 'main',
    }),
    defineField({
      name: 'seo',
      type: 'seoModule',
      title: 'SEO',
      group: 'seo',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title,
      media: CgWebsite,
    }),
  },
});
