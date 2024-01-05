import { defineType, defineField } from 'sanity';
import { FaImage } from 'react-icons/fa';

export default defineType({
  type: 'object',
  title: 'Image',
  name: 'imageBlock',
  icon: FaImage,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'alt',
      title: 'Alt',
      type: 'string',
      initialValue: 'Image with no alt text',
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
          { title: 'full', value: 'full' },
          { title: 'medium', value: 'medium' },
          { title: 'small', value: 'small' },
        ],
        layout: 'radio',
      },
      initialValue: 'full',
    }),

    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: 'default', value: 'default' },
          { title: 'square', value: 'square' },
          { title: 'landscape', value: 'landscape' },
        ],
        layout: 'radio',
      },
      initialValue: 'original',
    }),
  ],
  preview: {
    select: { media: 'image', title: 'alt' },
    prepare: ({ title, media }) => ({
      title,
      media,
    }),
  },
});
