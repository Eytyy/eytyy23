import { defineType, defineField } from 'sanity';

import { CgWebsite } from 'react-icons/cg';
import { blocks, column_blocks } from '../blocks';

export default defineType({
  type: 'document',
  title: 'Page',
  name: 'page',
  icon: CgWebsite,
  groups: [
    { title: 'Left', name: 'left' },
    { title: 'Main', name: 'main', default: true },
    { title: 'Right', name: 'right' },
    { title: 'Footer', name: 'footer' },
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
      title: 'Top Left Column Blocks',
      name: 'topLeft',
      type: 'array',
      of: column_blocks,
      group: 'left',
    }),
    defineField({
      title: 'Center Left Column Blocks',
      name: 'leftCenter',
      type: 'array',
      of: column_blocks,
      group: 'left',
    }),
    defineField({
      title: 'Bottom Left Column Blocks',
      name: 'bottomLeft',
      type: 'array',
      of: column_blocks,
      group: 'left',
    }),
    defineField({
      title: 'Right Column Blocks',
      description:
        'The blocks will be displayed in the "center" of the column. The top and bottom part are reserved for the logo and footer respectively.',
      name: 'right',
      type: 'array',
      of: column_blocks,
      group: 'right',
    }),
    defineField({
      title: 'Footer Blocks',
      name: 'footer',
      type: 'array',
      of: column_blocks,
      group: 'footer',
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
