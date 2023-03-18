import {defineType, defineField} from 'sanity'
import {MdMoreHoriz} from 'react-icons/md'

export default defineType({
  type: 'document',
  title: 'Menu',
  name: 'menu',
  icon: MdMoreHoriz,

  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [{type: 'navPage'}, {type: 'navStatic'}, {type: 'navLink'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
