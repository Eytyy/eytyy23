import {defineType, defineField} from 'sanity'

export default defineType({
  type: 'document',
  title: 'Menu',
  name: 'menu',
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
      of: [{type: 'navPage'}, {type: 'navLink'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
