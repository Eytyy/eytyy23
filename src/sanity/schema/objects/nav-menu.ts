import {defineType, defineField} from 'sanity'
import {MdMoreHoriz} from 'react-icons/md'

export default defineType({
  name: 'navMenu',
  title: 'Nav Menu',
  type: 'object',
  icon: MdMoreHoriz,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Menu',
      name: 'menu',
      type: 'reference',
      to: [{type: 'menu'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title,
        media: MdMoreHoriz,
      }
    },
  },
})
