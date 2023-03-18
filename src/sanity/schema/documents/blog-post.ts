import {FaVideo} from 'react-icons/fa'
import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Blog Post',
  name: 'blogPost',
  type: 'document',
  groups: [
    {name: 'main', title: 'Main', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}],
      group: 'main',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['draft', 'ready'],
      },
      initialValue: 'draft',
      group: 'main',
    }),
    defineField({
      type: 'contentBlock',
      name: 'summary',
      title: 'Summary',
      group: 'main',
    }),
    defineField({
      name: 'blocks',
      type: 'array',
      title: 'Blocks',
      of: [
        {type: 'advancedContentModule'},
        {type: 'imageBlock'},
        {type: 'videoBlock'},
        {type: 'navPage'},
        {type: 'navLink'},
        {type: 'navStatic'},
        {type: 'mediaModule'},
      ],
      group: 'main',
      hidden: ({parent}) => parent.format === 'link',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'main',
      hidden: ({parent}) => parent.format === 'link',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoModule',
      group: 'seo',
    }),
  ],
})
