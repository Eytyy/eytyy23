import { RiLayoutColumnLine, RiQuoteText } from 'react-icons/ri';
import { defineType, defineField } from 'sanity';
import { FaVideo } from 'react-icons/fa';

export default defineType({
  name: 'projectSection',
  title: '2 Cols Project Section',
  type: 'object',
  icon: RiLayoutColumnLine,
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
        { type: 'imageBlock' },
        { type: 'videoBlock', icon: FaVideo },
        {
          type: 'contentModule',
          title: 'Content',
          icon: RiQuoteText,
        },
      ],
    }),
    defineField({
      name: 'sideContent',
      type: 'projectSectionColBlock',
      title: 'Side Content',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: '2 Cols Section',
      media: RiLayoutColumnLine,
    }),
  },
});
