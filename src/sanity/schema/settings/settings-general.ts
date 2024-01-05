import { defineField, defineType } from 'sanity';

export default defineType({
  type: 'document',
  title: 'General Settings',
  name: 'generalSettings',
  groups: [
    { title: 'Site', name: 'details', default: true },
    { title: 'Landing Pages', name: 'landing' },
  ],
  fields: [
    defineField({
      title: 'Home Page',
      name: 'home',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'This page will show at the root of your domain',
      group: 'landing',
    }),
    defineField({
      title: 'Work Page',
      name: 'work',
      type: 'reference',
      to: [{ type: 'work' }],
      description: 'This page will show at "/work"',
      group: 'landing',
    }),
    defineField({
      title: 'Blog Page',
      name: 'blog',
      type: 'reference',
      to: [{ type: 'page' }],
      description: 'This page will show at "/blog"',
      group: 'landing',
    }),
    defineField({
      title: 'Error Page (404)',
      name: 'error',
      type: 'reference',
      to: [{ type: 'page' }],
      description:
        'This page will show for any URL at your domain that does not exist yet',
      group: 'landing',
    }),

    defineField({
      title: 'Site Title',
      name: 'siteTitle',
      type: 'string',
      description:
        'The name of your site, usually your company/brand name',
      group: 'details',
    }),

    defineField({
      title: 'Site Main Visual',
      description: 'For pop-up menus and such',
      name: 'mainVisual',
      type: 'array',
      of: [
        { type: 'imageBlock' },
        { type: 'videoBlock' },
        { type: 'sketchBlock' },
      ],
      group: 'details',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings',
      };
    },
  },
});
