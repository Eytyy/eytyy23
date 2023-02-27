import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'status',
  type: 'document',
  title: 'Status',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'weight',
      type: 'number',
      title: 'Weight',
    }),
  ],
})
