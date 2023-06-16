import { defineType, defineField } from 'sanity';
import { FaVideo } from 'react-icons/fa';

export default defineType({
  type: 'object',
  title: 'Video',
  name: 'videoBlock',
  icon: FaVideo,
  fields: [
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'alt',
      title: 'Alt',
      type: 'string',
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
      name: 'cropTop',
      title: 'Crop Top',
      type: 'boolean',
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
    }),
  ],
  preview: {
    select: {
      caption: 'caption',
      alt: 'alt',
    },
    prepare({ caption, alt }) {
      return {
        title: caption ? caption : alt,
        media: FaVideo,
      };
    },
  },
});
