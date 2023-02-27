import {defineType, defineField} from 'sanity'
import {TbPlugConnected} from 'react-icons/tb'

export default defineType({
  type: 'object',
  title: 'Project Card(s)',
  name: 'projectsModule',
  icon: TbPlugConnected,
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
    {
      name: 'optional',
      title: 'Extra Fields',
    },
  ],
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
      group: 'content',
    }),
    defineField({
      title: 'Headline',
      name: 'headline',
      type: 'string',
      description: 'optional',
      group: 'optional',
    }),
    defineField({
      title: 'Body',
      name: 'body',
      type: 'contentBlock',
      description: 'optional',
      group: 'optional',
    }),
    {
      title: 'Do you want to select projects manually or automatically?',
      name: 'referenceType',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Automatic', value: 'auto'},
          {title: 'Manual', value: 'manual'},
        ],
      },
      initialValue: 'auto',
      group: 'content',
    },
    {
      title: 'How many items do you want to display?',
      name: 'numberOfItems',
      type: 'number',
      initialValue: 1,
      description: 'minimum 1',
      hidden: ({parent}) => parent?.referenceType === 'manual',
      validation: (Rule) => Rule.required().min(1),
      group: 'content',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'project'}]}],
      hidden: ({parent}) => parent?.referenceType !== 'manual',
      validation: (Rule) => Rule.required().min(3) && Rule.unique(),
      group: 'content',
    },
  ],
  preview: {
    select: {
      name: 'name',
      referenceType: 'referenceType',
      numberOfItems: 'numberOfItems',
      order: 'order',
      content: 'content',
    },
    prepare({name, referenceType, numberOfItems, order, content}) {
      return {
        media: TbPlugConnected,
        title: name ? `Projects: ${name}` : 'Project card(s)',
        subtitle:
          referenceType === 'auto'
            ? `${numberOfItems >= 0 ? numberOfItems : 'All'} items, ${order}`
            : `${content?.length || 0} cards`,
      }
    },
  },
})
