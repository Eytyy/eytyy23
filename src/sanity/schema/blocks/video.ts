import { defineType, defineField } from 'sanity';
import { FaVideo } from 'react-icons/fa';

export default defineType({
  type: 'object',
  title: 'Video',
  name: 'videoBlock',
  icon: FaVideo,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
    }),

    defineField({
      name: 'autoPlay',
      title: 'Auto Play',
      type: 'boolean',
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
    }),
    defineField({
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'addBorder',
      title: 'Add Border',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          { title: 'original', value: 'original' },
          { title: 'full', value: 'full' },
          { title: 'medium', value: 'medium' },
          { title: 'small', value: 'small' },
        ],
      },
      initialValue: 'original',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: 'square', value: 'square' },
          { title: 'landscape', value: 'landscape' },
        ],
      },
      initialValue: 'landscape',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title,
        media: FaVideo,
      };
    },
  },
});
