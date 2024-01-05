import { BiSolidCategory } from 'react-icons/bi';
import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'Discipline',
  name: 'discipline',
  type: 'document',
  icon: BiSolidCategory,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
  ],
});
