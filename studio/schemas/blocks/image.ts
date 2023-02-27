import {defineType, defineField} from 'sanity'
import {FaImage} from 'react-icons/fa'
export default defineType({
  type: 'object',
  title: 'Image',
  name: 'imageBlock',
  icon: FaImage,
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'alt',
      title: 'Alt',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          {title: 'square', value: 'square'},
          {title: 'landscape', value: 'landscape'},
        ],
      },
    }),
  ],
  preview: {
    select: {media: 'image', title: 'alt'},
  },
})
