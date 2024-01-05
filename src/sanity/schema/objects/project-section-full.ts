import { RiLayoutRowLine } from 'react-icons/ri';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'projectSectionFull',
  title: 'Full Width Project Section',
  type: 'object',
  icon: RiLayoutRowLine,
  fields: [
    defineField({
      name: 'name',
      title: 'Section Name',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'mediaModule', title: 'Gallery' },
        { type: 'imageBlock', title: 'Image' },
        { type: 'videoBlock', title: 'Video' },
        { type: 'contentModule', title: 'Content' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: 'Full Width Section',
      media: RiLayoutRowLine,
    }),
  },
});
