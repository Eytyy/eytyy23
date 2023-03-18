import {defineType, defineField} from 'sanity'
import {MdAnimation} from 'react-icons/md'

export default defineType({
  type: 'object',
  title: 'Sketch Block',
  name: 'sketchBlock',
  icon: MdAnimation,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'sketch',
      title: 'Sketch',
      type: 'reference',
      to: [{type: 'sketch'}],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({
      title,
      media: MdAnimation,
    }),
  },
})
