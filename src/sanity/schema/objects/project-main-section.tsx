import { RiLayoutColumnLine } from 'react-icons/ri';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'projectMainSection',
  title: 'Main Project Section',
  type: 'object',
  description: 'A section of a project page',
  groups: [
    {
      title: 'Main',
      name: 'main',
      default: true,
    },
    {
      title: 'Info',
      name: 'info',
    },
  ],
  icon: RiLayoutColumnLine,
  fields: [
    defineField({
      name: 'name',
      title: 'Section Name',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'media',
      type: 'mediaModule',
      title: 'Media',
      group: 'main',
    }),
    defineField({
      name: 'projectInfo',
      type: 'projectInfo',
      title: 'Project Info',
      group: 'info',
    }),
    defineField({
      name: 'content',
      type: 'contentBlock',
      title: 'Content',
      group: 'main',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }) => ({
      title,
      media: RiLayoutColumnLine,
    }),
  },
});
