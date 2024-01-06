import { RiLayoutRowLine } from 'react-icons/ri';
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'projectTechSection',
  title: 'Technical Details Section',
  type: 'object',
  icon: RiLayoutRowLine,
  fields: [
    defineField({
      name: 'name',
      title: 'Section Name',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'object',
          title: 'Technology',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
            }),
            defineField({
              name: 'technology',
              title: 'Technology',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'technology' }] }],
            }),
          ],
        },
        {
          title: 'link',
          type: 'navLink',
          name: 'link',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }) => ({
      title,
      subtitle: 'Full Width Section',
      media: RiLayoutRowLine,
    }),
  },
});
