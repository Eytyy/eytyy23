import {defineType, defineField} from 'sanity'
import {TbPlugConnected, TbTag} from 'react-icons/tb'

export default defineType({
  type: 'object',
  title: 'Tag(s)',
  name: 'tagsModule',
  icon: TbTag,
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
    {
      name: 'settings',
      title: 'Settings',
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
    defineField({
      title: 'Do you want to select tags manually or automatically?',
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
    }),
    defineField({
      title: 'How many items do you want to display?',
      name: 'numberOfItems',
      type: 'number',
      description: 'If empty, all tags will be displayed',
      hidden: ({parent}) => parent?.referenceType === 'manual',
      group: 'content',
    }),
    defineField({
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
      hidden: ({parent}) => parent?.referenceType !== 'manual',
    }),
    defineField({
      title: 'Show as dropdown?',
      name: 'isDropdown',
      type: 'boolean',
      initialValue: true,
      group: 'settings',
    }),
    defineField({
      title: 'Expand dropdown by default?',
      name: 'expand',
      type: 'boolean',
      hidden: ({parent}) => !parent.isDropdown,
      initialValue: false,
      group: 'settings',
    }),
    defineField({
      title: 'Allow toggle?',
      name: 'toggle',
      type: 'boolean',
      hidden: ({parent}) => !parent.isDropdown,
      initialValue: true,
      group: 'settings',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      referenceType: 'referenceType',
      numberOfItems: 'numberOfItems',
      content: 'content',
    },
    prepare({name, referenceType, numberOfItems, content}) {
      return {
        media: TbPlugConnected,
        title: name ? `Tags: ${name}` : 'Tag(s)',
        subtitle:
          referenceType === 'auto'
            ? `${numberOfItems >= 0 ? numberOfItems : 'All'} items`
            : `${content?.length || 0} tags`,
      }
    },
  },
})
