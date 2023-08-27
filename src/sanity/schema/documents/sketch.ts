import { defineType, defineField } from 'sanity';
import { MdAnimation } from 'react-icons/md';

export default defineType({
  title: 'Sketch',
  name: 'sketch',
  type: 'document',
  icon: MdAnimation,
  groups: [
    { name: 'main', title: 'Main', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'main',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {
            title: 'Blue',
            value: 'blue',
          },
          {
            title: 'Black',
            value: 'black',
          },
          {
            title: 'White',
            value: 'white',
          },
        ],
      },
      group: 'main',
      initialValue: 'black',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'contentBlock',
      group: 'main',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'main',
      hidden: ({ parent }) => parent.format === 'link',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoModule',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title,
      media: MdAnimation,
    }),
  },
});
