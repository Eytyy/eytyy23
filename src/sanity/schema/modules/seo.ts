import {defineType, defineField} from 'sanity'

export default defineType({
  type: 'object',
  title: 'SEO',
  name: 'seoModule',
  fields: [
    defineField({
      name: 'meta_title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'meta_description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'meta_image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
