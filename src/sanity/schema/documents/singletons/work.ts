import { defineType, defineField } from 'sanity';

import { CgWorkAlt } from 'react-icons/cg';

export default defineType({
  type: 'document',
  title: 'Work',
  name: 'work',
  icon: CgWorkAlt,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title,
      media: CgWorkAlt,
    }),
  },
});
