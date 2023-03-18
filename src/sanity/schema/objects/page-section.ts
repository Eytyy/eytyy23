import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pageSection',
  title: 'Section',
  type: 'object',
  fieldsets: [
    {
      name: 'mainmedia',
      title: 'Main Media',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'hasBody',
      title: 'Has body?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'contentBlock',
      hidden: ({parent}) => !parent.hasBody,
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {type: 'imageBlock'},
        {type: 'videoBlock'},
        {type: 'mediaModule'},
        {type: 'contentBlock'},
      ],
    }),
  ],
})
