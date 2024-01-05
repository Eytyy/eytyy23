import { defineType, defineField } from 'sanity';
import { FaImages } from 'react-icons/fa';

export default defineType({
  type: 'object',
  title: 'Media Gallery',
  name: 'mediaModule',
  icon: FaImages,
  fields: [
    defineField({
      type: 'array',
      title: 'Media',
      name: 'media',
      of: [{ type: 'imageBlock' }, { type: 'videoBlock' }],
    }),
    defineField({
      type: 'string',
      title: 'Gallery Format',
      name: 'format',
      description: 'Default is slider.',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Slider', value: 'slider' },
        ],
      },
      initialValue: 'slider',
      hidden: ({ parent }) => {
        return (
          typeof parent === 'undefined' || parent?.media?.length <= 1
        );
      },
    }),
  ],

  preview: {
    select: {
      media: 'media',
      format: 'format',
    },
    prepare: ({ media }) => {
      return {
        title: 'Media',
        media: media?.[0]?.image || FaImages,
      };
    },
  },
});
