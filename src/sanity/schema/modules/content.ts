import {defineType, defineField} from 'sanity'
import {BiBookContent} from 'react-icons/bi'

export default defineType({
  type: 'object',
  title: 'Content Module',
  name: 'contentModule',
  icon: BiBookContent,
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'This is the title of the module, it will not be displayed on the page.',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'contentBlock',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        media: BiBookContent,
        title: title || 'Content Module',
      }
    },
  },
})
