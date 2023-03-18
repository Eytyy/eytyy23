import {defineType, defineField} from 'sanity'
import {MdMoreHoriz} from 'react-icons/md'

export default defineType({
  type: 'object',
  title: 'Menu Block',
  name: 'menuBlock',
  icon: MdMoreHoriz,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'reference',
      to: [{type: 'menu'}],
      validation: (R) => R.required(),
    }),
    defineField({
      title: 'Show as dropdown?',
      name: 'isDropdown',
      type: 'boolean',
      initialValue: true,
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
      hidden: ({parent}) => !parent.isDropdown,
      initialValue: false,
    }),
    defineField({
      title: 'Allow toggle?',
      name: 'toggle',
      type: 'boolean',
      hidden: ({parent}) => !parent.isDropdown,
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => {
      return {
        title,
        media: MdMoreHoriz,
      }
    },
  },
})
