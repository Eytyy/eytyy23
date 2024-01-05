import { BiSolidCategoryAlt } from 'react-icons/bi';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sector',
  type: 'document',
  title: 'Sector',
  icon: BiSolidCategoryAlt,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
    }),
  ],
});
