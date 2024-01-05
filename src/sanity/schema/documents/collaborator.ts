import { TbFriends } from 'react-icons/tb';
import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'Collaborator',
  name: 'collaborator',
  type: 'document',
  icon: TbFriends,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
  ],
});
