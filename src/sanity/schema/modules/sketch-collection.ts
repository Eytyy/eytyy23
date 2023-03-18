import {defineType, defineField} from 'sanity'
import {MdAnimation} from 'react-icons/md'

export default defineType({
  type: 'object',
  title: 'Sketch Collection Module',
  name: 'sketchCollectionModule',
  icon: MdAnimation,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'hasInlineNavigation',
      title: 'Add inline navigation to the header?',
      description:
        'Adds a dropdown to the header section of the module, which enables switching the active displayed sketch inline (without navigating to a new page).',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sketches',
      title: 'Sketches',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'sketch'}]}],
    }),
    defineField({
      name: 'active',
      title: 'Active Sketch',
      type: 'reference',
      to: [{type: 'sketch'}],
      description: 'If empty, the latest sketch will be displayed as default.',
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
