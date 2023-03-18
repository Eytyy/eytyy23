import {defineType, defineField} from 'sanity'
import {FaLink} from 'react-icons/fa'

export default defineType({
  name: 'navType',
  title: 'Nav Type',
  type: 'object',
  icon: FaLink,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Type',
      name: 'type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: ['project', 'blogPost', 'sketch'],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
      type: 'type',
    },
    prepare({title, url, type}) {
      return {
        title: title ?? `${type}s`,
        subtitle: title && `${type}s`,
        media: FaLink,
      }
    },
  },
})
