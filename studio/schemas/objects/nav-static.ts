import {defineType, defineField} from 'sanity'

import {FaLink} from 'react-icons/fa'

export default defineType({
  name: 'navStatic',
  title: 'Static Link',
  type: 'object',
  icon: FaLink,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare({title, slug}) {
      return {
        title: title ?? slug,
        subtitle: title && slug,
      }
    },
  },
})
