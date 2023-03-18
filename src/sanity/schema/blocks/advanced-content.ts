import {defineType, defineField, defineArrayMember} from 'sanity'

export const linksAnnotation = [
  {
    title: 'External Link',
    name: 'link',
    type: 'object',
    fields: [
      {title: 'URL', name: 'href', type: 'url'},
      {
        title: 'Open in new tab',
        name: 'blank',
        type: 'boolean',
      },
    ],
  },
  {
    title: 'Internal Link',
    name: 'internalLink',
    type: 'object',

    fields: [
      {
        title: 'Reference',
        name: 'reference',
        type: 'reference',
        to: [{type: 'project'}, {type: 'page'}],
        options: {disableNew: true},
      },
    ],
  },
]

export default defineType({
  title: 'Block Content',
  name: 'advancedContentBlock',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [...linksAnnotation],
      },
    }),
    defineField({
      type: 'code',
      name: 'myCodeField',
      options: {
        withFilename: true,
      },
    }),
    defineField({type: 'imageBlock', name: 'imageBlock'}),
  ],
})
