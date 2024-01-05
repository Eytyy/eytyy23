import { defineType, defineField } from 'sanity';
import { RiQuoteText } from 'react-icons/ri';

export default defineType({
  type: 'object',
  title: 'Content Module',
  name: 'contentModule',
  icon: RiQuoteText,
  fields: [
    defineField({
      title: 'Body',
      name: 'body',
      type: 'contentBlock',
    }),
  ],
  preview: {
    select: {
      body: 'body',
    },
    prepare({ body }) {
      console.log(body);
      return {
        media: RiQuoteText,
        title: 'Text',
      };
    },
  },
});
