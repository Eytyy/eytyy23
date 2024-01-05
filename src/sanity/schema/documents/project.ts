import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'Project',
  name: 'project',
  type: 'document',
  groups: [
    { name: 'main', title: 'Main', default: true },
    { name: 'details', title: 'Details' },
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
      },
      initialValue: 'link',
      group: 'main',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'date',
      group: 'main',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      group: 'main',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'contentBlock',
      group: 'main',
    }),
    defineField({
      name: 'mainMedia',
      title: 'Main Media',
      type: 'mediaModule',
      group: 'main',
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sector' }] }],
      group: 'details',
    }),
    defineField({
      name: 'discipline',
      title: 'Discipline',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'discipline' }] }],
      group: 'details',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collaborator' }] }],
      group: 'details',
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'projectMainSection' },
        { type: 'projectSectionFull' },
        { type: 'projectSection' },
        { type: 'mediaModule' },
        { type: 'imageBlock' },
        { type: 'videoBlock' },
      ],
      group: 'details',
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
      group: 'details',
      initialValue: 'black',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'details',
      hidden: ({ parent }) => parent.format === 'link',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoModule',
      group: 'seo',
    }),
  ],
});
