import { defineType, defineField } from 'sanity';
import { RiLayoutLeft2Line } from 'react-icons/ri';
export default defineType({
  name: 'projectSectionColBlock',
  title: 'Section Column Block',
  type: 'object',
  icon: RiLayoutLeft2Line,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'contentBlock',
      title: 'Content',
    }),

    defineField({
      name: 'fullWidth',
      type: 'boolean',
      title: 'Full Width?',
      initialValue: true,
    }),
  ],
});
