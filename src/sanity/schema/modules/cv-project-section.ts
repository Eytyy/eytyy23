import { defineType, defineField } from 'sanity';
import { BiBookContent } from 'react-icons/bi';
import { blocks } from '../blocks';

export default defineType({
  type: 'object',
  title: 'Cv Project Section',
  name: 'cvSection',
  fields: [
    defineField({
      title: 'Anchor',
      name: 'anchor',
      type: 'string',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {
            title: 'Blue',
            value: 'blue',
          },
          {
            title: 'Black',
            value: 'black',
          },
          {
            title: 'White',
            value: 'white',
          },
        ],
      },
      initialValue: 'black',
    }),
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description:
        'This is the title of the module, it will not be displayed on the page.',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'contentBlock',
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'navLink',
    }),
    defineField({
      title: 'Main blocks',
      name: 'mainBlocks',
      type: 'array',
      of: blocks,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        media: BiBookContent,
        title: title || 'Content Module',
      };
    },
  },
});
