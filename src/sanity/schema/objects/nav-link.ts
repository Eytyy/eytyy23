import {defineType, defineField} from 'sanity'
import {FaExternalLinkSquareAlt} from 'react-icons/fa'

export default defineType({
  name: 'navLink',
  title: 'External Link',
  type: 'object',
  icon: FaExternalLinkSquareAlt,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare({title, url}) {
      return {
        title: title ?? url,
        subtitle: title && url,
        media: FaExternalLinkSquareAlt,
      }
    },
  },
})
