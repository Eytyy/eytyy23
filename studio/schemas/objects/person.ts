import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'person',
  type: 'object',
  title: 'Person',
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Role',
      name: 'role',
      type: 'string',
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'url',
    }),
  ],
})
