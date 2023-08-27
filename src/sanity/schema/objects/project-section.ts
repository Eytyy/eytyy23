import { RiLayoutBottom2Line, RiQuoteText } from 'react-icons/ri';
import { defineType, defineField } from 'sanity';
import { FaVideo } from 'react-icons/fa';

export default defineType({
  name: 'projectSection',
  title: 'Project Section',
  type: 'object',
  icon: RiLayoutBottom2Line,
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'mediaModule', title: 'Gallery' },
        { type: 'imageBlock' },
        { type: 'videoBlock', icon: FaVideo },
        {
          type: 'contentModule',
          title: 'Content',
          icon: RiQuoteText,
        },
      ],
    }),
    defineField({
      name: 'sideContent',
      type: 'array',
      title: 'Side Content',
      of: [{ type: 'projectSectionColBlock' }],
      validation: (Rule) => {
        return Rule.max(2);
      },
    }),
    defineField({
      name: 'showSideFirst',
      title: 'Show Side Content First',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Blue', value: 'blue' },
          { title: 'Black', value: 'black' },
          { title: 'White', value: 'white' },
        ],
      },
      initialValue: 'black',
    }),
  ],
});
