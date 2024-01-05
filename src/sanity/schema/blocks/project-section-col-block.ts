import { defineType, defineField } from 'sanity';
import { RiLayoutLeft2Line } from 'react-icons/ri';
export default defineType({
  name: 'projectSectionColBlock',
  title: 'Section Column Block',
  type: 'object',
  icon: RiLayoutLeft2Line,
  fields: [
    defineField({
      name: 'content',
      type: 'contentBlock',
      title: 'Content',
    }),
  ],
});
