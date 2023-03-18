import {defineType, defineField} from 'sanity'
import {IoMdExpand} from 'react-icons/io'

export default defineType({
  name: 'navGroup',
  title: 'Link(s) Group',
  type: 'object',
  icon: IoMdExpand,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [{type: 'navPage'}, {type: 'navStatic'}, {type: 'navLink'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
