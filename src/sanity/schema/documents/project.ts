import { FaVideo } from 'react-icons/fa';
import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'Project',
  name: 'project',
  type: 'document',
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
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { value: 'detailed', title: 'Detailed' },
          { value: 'link', title: 'Link' },
        ],
        layout: 'radio',
      },
      initialValue: 'link',
      group: 'main',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      group: 'main',
    }),
    defineField({
      name: 'preview',
      type: 'mediaModule',
      group: 'main',
      hidden: ({ parent }) => parent.format === 'link',
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [{ type: 'projectSection' }],
      group: 'main',
      hidden: ({ parent }) => parent.format === 'link',
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
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Black', value: 'black' },
          { title: 'White', value: 'white' },
        ],
      },
      group: 'main',
      initialValue: 'black',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoModule',
      group: 'seo',
    }),
  ],
});
