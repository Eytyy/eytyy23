import { TbFriends } from 'react-icons/tb';
import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'Technology',
  name: 'technology',
  type: 'document',
  icon: TbFriends,
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
      }
    }),
  ],
});
