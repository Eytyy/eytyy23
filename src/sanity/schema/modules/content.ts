import { defineType, defineField } from 'sanity';
import { RiQuoteText } from 'react-icons/ri';

export default defineType({
  type: 'object',
  title: 'Content Module',
  name: 'contentModule',
  icon: RiQuoteText,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description:
        'This is the title of the module, it will not be displayed on the page.',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'contentBlock',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        media: RiQuoteText,
        title: title || 'Content Module',
      };
    },
  },
});
