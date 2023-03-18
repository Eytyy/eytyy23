import {defineType, defineField} from 'sanity'
import {CgMenuGridO} from 'react-icons/cg'

export default defineType({
  type: 'object',
  title: 'Mega Menu Block',
  name: 'megaMenuBlock',
  icon: CgMenuGridO,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {type: 'navMenu'},
        {type: 'navGroup'},
        {type: 'navPage'},
        {type: 'navStatic'},
        {type: 'navLink'},
      ],
    }),
    defineField({
      title: 'Orientation',
      name: 'orientation',
      type: 'string',
      options: {
        list: [
          {value: 'vertical', title: 'Vertical'},
          {value: 'horizontal', title: 'Horizontal'},
        ],
        layout: 'radio',
      },
      hidden: ({parent}) => parent.isDropdown,
      initialValue: 'vertical',
    }),
    defineField({
      title: 'Expand dropdown by default?',
      name: 'expand',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Allow toggle?',
      name: 'toggle',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => {
      return {
        title,
        media: CgMenuGridO,
      }
    },
  },
})
