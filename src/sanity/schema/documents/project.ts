import {FaVideo} from 'react-icons/fa'
import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Project',
  name: 'project',
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
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          {value: 'detailed', title: 'Detailed'},
          {value: 'link', title: 'Link'},
        ],
        layout: 'radio',
      },
      initialValue: 'link',
      group: 'main',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      group: 'main',
    }),
    defineField({
      name: 'blocks',
      type: 'array',
      title: 'Blocks',
      of: [
        {type: 'contentModule'},
        {type: 'imageBlock'},
        {type: 'videoBlock', icon: FaVideo},
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
