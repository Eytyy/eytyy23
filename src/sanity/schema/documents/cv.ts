import { FaVideo } from 'react-icons/fa';
import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'CV',
  name: 'cv',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [{ type: 'cvSection' }],
    }),
  ],
});
