import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'projectType',
  type: 'document',
  title: 'Project Type',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name',
    }),
  ],
})
