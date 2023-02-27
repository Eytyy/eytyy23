import {defineType, defineField} from 'sanity'

import {CgWebsite} from 'react-icons/cg'
import {IoMdCube} from 'react-icons/io'

export default defineType({
  type: 'document',
  title: 'Page',
  name: 'page',
  icon: CgWebsite,
  groups: [
    {title: 'Main', name: 'main', default: true},
    {title: 'SEO', name: 'seo'},
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      group: 'main',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Style',
      name: 'style',
      type: 'string',
      options: {
        list: ['creative', 'detailed'],
        layout: 'radio',
      },
      initialValue: 'creative',
      group: 'main',
    }),
    defineField({
      title: 'Blocks',
      name: 'blocks',
      type: 'array',
      icon: IoMdCube,
      of: [
        {type: 'imageBlock', icon: IoMdCube},
        {type: 'videoBlock', icon: IoMdCube},
        {type: 'mediaModule', icon: IoMdCube},
        {type: 'contentModule', icon: IoMdCube},
        {type: 'navLink', icon: IoMdCube},
        {type: 'navPage', icon: IoMdCube},
        {type: 'navStatic', icon: IoMdCube},
      ],
      group: 'main',
    }),
    defineField({
      title: 'Modules',
      name: 'modules',
      type: 'array',
      of: [{type: 'projectsModule'}, {type: 'contentModule'}],
      group: 'main',
    }),
    defineField({
      name: 'seo',
      type: 'seoModule',
      title: 'SEO',
      group: 'seo',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'main',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title,
      media: CgWebsite,
    }),
  },
})
